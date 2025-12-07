package server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import static java.net.HttpURLConnection.*;

class Server {
    private final Logger logger;
    private final Config config;
    private final Path rootDir;
    private HttpServer server;
    private ExecutorService executor;
    private RateLimiter rateLimiter;

    public Server(Config config, Path rootDir) {
        logger = Logger.getLogger(Server.class.getName());
        this.config = config;
        this.rootDir = rootDir;
        setupDynamicRoutes();
    }


    private void setupDynamicRoutes() {
        config.addDynamicRoute("/api/time", req -> new Response().json(
                String.format(
                        """
                                {"time": "%s"}
                                """,
                        new Date()
                )
        ));

        config.addDynamicRoute("/api/subscribe", req -> {
            if ("POST".equals(req.getMethod())) {
                    // TODO: subscribe / unsubscribe
                    return new Response().status(HTTP_NO_CONTENT);
            }
            return new Response().status(HTTP_BAD_METHOD)
                    .body("Method not allowed");
        });


    }

    public synchronized void start() {
        try {
            executor = Executors.newFixedThreadPool(config.getMaxThreads());
            rateLimiter = new RateLimiter(10, 60 * 1000); // 100 requests per minute

            server = HttpServer.create(new InetSocketAddress(config.getPort()), config.isProduction() ? 0 : 50);
            server.createContext("/", new Handler());
            server.setExecutor(executor);
            server.start();
            logger.info(String.format("server.Server started on http://localhost:%d (%s) mode",
                    config.getPort(), config.isProduction() ? "production" : "development"));
        } catch (IOException e) {
            if (!config.isProduction()) e.printStackTrace();
            logger.severe(String.format("Could not start server: (%s)", e.getMessage()));
        }
    }

    /* synchronized because shutdown hook might also call this method */
    public synchronized void stop() {
        if (server != null) {
            server.stop(2); // Wait 2 seconds for ongoing requests
            if (!executor.isShutdown()) executor.shutdown();
            try {
                boolean terminated = executor.awaitTermination(5, TimeUnit.SECONDS);
                if (!terminated) executor.shutdownNow();
            } catch (InterruptedException e) {
                if (!config.isProduction()) e.printStackTrace();
                logger.severe(String.format("Could not stop server: (%s)", e.getMessage()));
                if (!executor.isTerminated()) {
                    executor.shutdownNow();
                }
                Thread.currentThread().interrupt();
            }
            logger.info("Server has stopped");
        }
    }

    public synchronized void restart() {
        stop();
        start();
        logger.info("Server has restarted");
    }

    class Handler implements HttpHandler {

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String clientIp = exchange.getRemoteAddress().getAddress().getHostAddress();

            if (config.isProduction() && !rateLimiter.allowRequest(clientIp)) {
                sendResponse(exchange, new Response()
                        .status(429) // HTTP_TOO_MANY_REQUESTS which is missing from standard JDK
                        .body("Too many requests"));
                return;
            }


            try {
                Request request = new Request(exchange);
                Response response;

                DynamicRoute route = config.getDynamicRoute(request.getPath());
                if (route != null) {
                    response = route.handle(request);
                } else {
                    response = handleStaticFile(request);
                }

                sendResponse(exchange, response);
            } catch (Exception e) {
                if (!config.isProduction())
                    e.printStackTrace();

                try {
                    sendResponse(exchange, new Response()
                            .status(HTTP_INTERNAL_ERROR)
                            .body(config.isProduction() ? "Internal Server Error" : "Error: " + e.getMessage()));
                } catch (IOException ioException) {
                    if (!config.isProduction())
                        e.printStackTrace();
                    logger.fine("Failed to send (HTTP_INTERNAL_ERROR) error response to client.");
                }
            }
        }

        private Response handleStaticFile(Request request) throws IOException {
            String requestPath = request.getPath();

            if (requestPath.startsWith("/")) requestPath = requestPath.substring(1);

            if (requestPath.isEmpty()) requestPath = "index.html";

            Path filePath = rootDir.resolve(requestPath).normalize();
            if (!filePath.startsWith(rootDir)) {
                return new Response()
                        .status(HTTP_FORBIDDEN)
                        .body("Forbidden");
            }

            if (Files.exists(filePath) && !Files.isDirectory(filePath) && !Files.isSymbolicLink(filePath)) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) contentType = "application/octet-stream";
                byte[] fileBytes = Files.readAllBytes(filePath);
                Response response = new Response()
                        .contentType(contentType)
                        .body(fileBytes);

                if (config.isProduction()) {
                    response.header("Cache-Control", "public, max-age=31536000"); // 1 year
                }

                return response;
            }


            return new Response()
                    .status(HTTP_NOT_FOUND)
                    .body("Not Found");

        }


        private void sendResponse(HttpExchange exchange, Response response) throws IOException {
            for (var header : response.getHeaders().entrySet()) {
                exchange.getResponseHeaders().set(header.getKey(), header.getValue());
            }

            if (config.isProduction()) {
                // TODO: Add security headers
                //                exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
            }

            byte[] responseBytes = response.getBodyBytes();
            exchange.sendResponseHeaders(response.getStatusCode(), responseBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(responseBytes);
            }
        }

    }

}
