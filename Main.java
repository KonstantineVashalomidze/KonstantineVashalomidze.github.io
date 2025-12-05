import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.*;
import java.util.stream.Stream;

import static java.net.HttpURLConnection.*;
import static java.nio.file.StandardWatchEventKinds.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // Load configuration from environment or config file
        Config config = Config.fromEnvironment();


        Logger logger = Logger.getLogger(Main.class.getName());
        setupLogging(config);

        Path publicPath = Path.of(config.getPublicDir());
        System.out.println(publicPath.toAbsolutePath());
        if (!Files.exists(publicPath)) {
            Files.createDirectory(publicPath);
            logger.info(String.format("Created directory: %s", publicPath));

            if (!config.isProduction()) {
                Files.writeString(publicPath.resolve("index.html"),
                        "<h1>Hello, World!, Change me to restart</h1>");
            }
        }

        Server server = new Server(config, publicPath);
        server.start();

        // Only enable hot reload in development
        if (!config.isProduction()) {
            enableHotReload(server, publicPath, logger);
        }

        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            logger.info("Shutting down gracefully...");
            server.stop();
        }));
    }

    private static void setupLogging(Config config) throws IOException {
        Logger rootLogger = Logger.getLogger("");
        rootLogger.setLevel(config.isProduction() ? Level.INFO : Level.FINE);

        for (Handler handler : rootLogger.getHandlers()) {
            rootLogger.removeHandler(handler);
        }

        Path logPath = Path.of(config.getLogFile()).getParent();
        if (logPath != null && !Files.exists(logPath)) {
            Files.createDirectory(logPath);
        }

        FileHandler fileHandler = new FileHandler(
                config.getLogFile(),
                config.getLogLimit(),
                config.getLogCount(),
                config.isLogAppend()
        );
        fileHandler.setFormatter(new SimpleFormatter());
        fileHandler.setLevel(config.isProduction() ? Level.INFO : Level.FINE);

        rootLogger.addHandler(fileHandler);

        if (!config.isProduction()) {
            ConsoleHandler consoleHandler = new ConsoleHandler();
            consoleHandler.setFormatter(new SimpleFormatter());
            consoleHandler.setLevel(config.isProduction() ? Level.INFO : Level.FINE);
            rootLogger.addHandler(consoleHandler);
        }

    }


    public static void enableHotReload(Server server, Path publicPath, Logger logger) {
        // Register file change listener
        CustomFileWatcher.FileChangeListener fileChangeListener =
                new CustomFileWatcher.FileChangeListener() {
                    private final DaemonTaskScheduler scheduler = new DaemonTaskScheduler(1);
                    private ScheduledFuture<?> pendingRestart;
                    @Override
                    public void onCreated(Path path) {
                        reload(path);
                    }

                    @Override
                    public void onModified(Path path) {
                        reload(path);
                    }

                    @Override
                    public void onDeleted(Path path) {
                        reload(path);
                    }

                    private synchronized void reload(Path path) {
                        if (pendingRestart != null && !pendingRestart.isDone()) {
                            pendingRestart.cancel(false);
                        }
                        pendingRestart = scheduler.scheduleOnce(() -> {
                            logger.info(String.format("File %s change detected. Restarting server...", path));
                            server.restart();
                        }, 500, TimeUnit.MILLISECONDS);
                    }


                };

        // Start file watcher
        try {
            Thread watcherThread = new Thread(
                    new CustomFileWatcher(fileChangeListener, publicPath)
            );
            watcherThread.start();
        } catch (IOException e) {
            logger.severe(String.format("Could not start file watcher: %s", e.getMessage()));
        }
    }


}



class Config {
    private final String publicDir;
    private final int port;
    private final boolean production;
    private final int maxThreads;
    private final long requestTimeout;
    private final Map<String, DynamicRoute> dynamicRoutes;
    private final String logFile;
    private final long logLimit;
    private final int logCount;
    private final boolean logAppend;

    public Config(String publicDir, int port, boolean production, int maxThreads, long requestTimeout, String logFile, long logLimit, int logCount, boolean logAppend) {
        this.publicDir = publicDir;
        this.port = port;
        this.production = production;
        this.maxThreads = maxThreads;
        this.requestTimeout = requestTimeout;
        this.dynamicRoutes = new ConcurrentHashMap<>();
        this.logFile = logFile;
        this.logLimit = logLimit;
        this.logCount = logCount;
        this.logAppend = logAppend;
    }

    public static Config fromEnvironment() {
        Properties properties = System.getProperties();
        return new Config(
                properties.getProperty("public.dir", "public"),
                Integer.parseInt(properties.getProperty("port", "6969")),
                "production".equals(properties.getProperty("env", "development")),
                Integer.parseInt(properties.getProperty("max.threads", "50")),
                Long.parseLong(properties.getProperty("request.timeout", "30000")), // 30 seconds
                properties.getProperty("log.file", "logs/server.log"),
                Long.parseLong(properties.getProperty("log.limit", "100000000")),
                Integer.parseInt(properties.getProperty("log.count", "1")),
                Boolean.parseBoolean(properties.getProperty("log.append", "false"))
        );
    }


    public void addDynamicRoute(String path, DynamicRoute route) {
        dynamicRoutes.put(path, route);
    }

    public DynamicRoute getDynamicRoute(String path) {
        return dynamicRoutes.get(path);
    }

    public String getPublicDir() {
        return publicDir;
    }

    public int getPort() {
        return port;
    }

    public boolean isProduction() {
        return production;
    }

    public int getMaxThreads() {
        return maxThreads;
    }

    public long getRequestTimeout() {
        return requestTimeout;
    }

    public String getLogFile() {
        return logFile;
    }

    public long getLogLimit() {
        return logLimit;
    }

    public int getLogCount() {
        return logCount;
    }

    public boolean isLogAppend() {
        return logAppend;
    }
}



@FunctionalInterface
interface DynamicRoute {
    Response handle(Request request) throws Exception;
}


class Request {
    private final HttpExchange exchange;
    private final Map<String, String> queryParams;
    private final Map<String, String> pathParams;
    private String body;

    public Request(HttpExchange exchange) {
        this.exchange = exchange;
        queryParams = parseQueryParams(exchange.getRequestURI().getQuery());
        pathParams = new HashMap<>();
    }


    public Map<String, String> parseQueryParams(String query) {
        /* NOTE: This method only parses simple query params with only key value pairs and as strings */
        Map<String, String> params = new HashMap<>();
        if (query != null) {
            for (String param : query.split("&")) {
                String[] pair = param.split("=", 2);
                if (pair.length == 2) {
                    params.put(pair[0], pair[1]);
                }
            }
        }
        return params;
    }

    public String getMethod() {
        return exchange.getRequestMethod();
    }

    public String getPath() {
        return exchange.getRequestURI().getPath();
    }


    public String getQuery(String key) {
        return queryParams.get(key);
    }

    public void setQueryParam(String key, String value) {
        queryParams.put(key, value);
    }


    public String getPathParam(String key) {
        return pathParams.get(key);
    }

    public void setPathParam(String key, String value) {
        pathParams.put(key, value);
    }

    public String getHeader(String key) {
        return exchange.getRequestHeaders().getFirst(key);
    }


    public String getBody() throws IOException {
        if (body == null) {
            try (InputStream is = exchange.getRequestBody()) {
                body = new String(is.readAllBytes());
            }
        }
        return body;
    }


    public HttpExchange getExchange() {
        return exchange;
    }

}


class Response {
    private int statusCode = HTTP_OK;
    private byte[] body = new byte[0];
    private final Map<String, String> headers = new HashMap<>();


    public Response() {}

    public Response(byte[] body) {
        this.body = body;
    }

    public Response status(int code) {
        this.statusCode = code;
        return this;
    }

    public Response body(String body) {
        this.body = body.getBytes();
        return this;
    }

    public Response body(byte[] body) {
        this.body = body;
        return this;
    }

    public Response contentType(String type) {
        headers.put("Content-Type", type);
        return this;
    }

    public Response json(String json) {
        body(json);
        headers.put("Content-Type", "application/json");
        return this;
    }

    public Response header(String key, String value) {
        this.headers.put(key, value);
        return this;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public byte[] getBodyBytes() {
        return body;
    }

    public String getContentType() {
        return headers.get("Content-Type");
    }

    public Map<String, String> getHeaders() {
        return headers;
    }
}



class Server {
    private HttpServer server;
    private final Logger logger;
    private final Config config;
    private final Path rootDir;
    private ExecutorService executor;
    private RateLimiter rateLimiter;


    public Server(Config config, Path rootDir) {
        logger = Logger.getLogger(Server.class.getName());
        this.config = config;
        this.rootDir = rootDir;

        setupDynamicRoutes();
    }


    private void setupDynamicRoutes() {
        // For example
        config.addDynamicRoute("/api/hello", req -> new Response().json(
                """
                {"message": "Hello from API!"}
                """
        ));

        config.addDynamicRoute("/api/time", req -> new Response().json(
                String.format(
                        """
                        {"time": "%s"}
                        """,
                        new Date()
                )
        ));


        config.addDynamicRoute("/api/echo", req -> {
            if ("POST".equals(req.getMethod())) {
                String body = req.getBody();
                return new Response().json(
                        String.format(
                        """
                        {"echo": "%s"}
                        """,
                        body
                ));
            }
            return new Response().status(HTTP_BAD_METHOD)
                    .body("Method not allowed");
        });

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
                if (!config.isProduction()) {
                    e.printStackTrace();
                }
                try {
                    sendResponse(exchange, new Response()
                            .status(HTTP_INTERNAL_ERROR)
                            .body(config.isProduction() ? "Internal Server Error" : "Error: " + e.getMessage()));
                } catch (IOException ioException) {
                    logger.fine("Failed to send 500 error response to client.");
                }
            }
        }

        private Response handleStaticFile(Request request) throws IOException {
            String requestPath = request.getPath();
            // Remove leading slash to match directory structure
            if (requestPath.startsWith("/")) requestPath = requestPath.substring(1);

            // If no name presented client means 'index.html' by convention
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

    public synchronized void start() {
        try {
            executor = Executors.newFixedThreadPool(config.getMaxThreads());
            rateLimiter = new RateLimiter(10, 60 * 1000); // 100 requests per minute

            server = HttpServer.create(new InetSocketAddress(config.getPort()), config.isProduction() ? 0 : 50);
            server.createContext("/", new Handler());
            server.setExecutor(executor);
            server.start();
            logger.info(String.format("Server started on http://localhost:%d [%s mode]",
                    config.getPort(), config.isProduction() ? "production" : "development"));
        } catch (IOException e) {
            logger.severe(String.format("Could not start server: %s", e.getMessage()));
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
                logger.severe(String.format("Could not stop server: %s", e.getMessage()));
                if (!executor.isTerminated()) {
                    logger.info("Calling 'shutdownNow' on 'executor'");
                    executor.shutdownNow();
                    if (executor.isTerminated()) {
                        logger.info("'executor' terminated");
                    } else {
                        logger.warning("'executor' still not terminating");
                    }
                }
                Thread.currentThread().interrupt();
            }
            logger.info("Server stopped");
        }
    }


    public synchronized void restart() {
        stop();
        start();
        logger.info("Server restarted");
    }

}


class RateLimiter {
    private final Map<String, RequestCounter> counters;
    private final Logger logger;
    private final int maxRequests;
    private final long windowMs;

    public RateLimiter(int maxRequests, long windowMs) {
        counters = new ConcurrentHashMap<>();
        logger = Logger.getLogger(RateLimiter.class.getName());
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;

        DaemonTaskScheduler scheduler = new DaemonTaskScheduler(1);
        scheduler.scheduleAtFixedRate(() -> {
            long now = System.currentTimeMillis();
            for (var entry : counters.entrySet()) {
                counters.compute(entry.getKey(), (k, counter) -> {
                    if (counter == null)
                        return null;

                    if (now - counter.lastRequest > windowMs) {
                        logger.info(String.format("Removing entry %s", k));
                        return null;
                    }

                    return counter;
                });
            }
        }, 20, 20, TimeUnit.SECONDS);


    }

    public boolean allowRequest(String clientId) {
        long now = System.currentTimeMillis();
        RequestCounter counter = counters.computeIfAbsent(clientId,
                k -> new RequestCounter());

        synchronized (counter) {
            counter.cleanup(now, windowMs);

            if (counter.count < maxRequests) {
                counter.count++;
                counter.lastRequest = now;
                return true;
            }
        }

        return false;
    }

    private class RequestCounter {
        int count = 0;
        long lastRequest = System.currentTimeMillis();

        void cleanup(long now, long windowMs) {
            if (now - lastRequest > windowMs) {
                count = 0;
                lastRequest = now;
            }
        }

    }

}



class CustomFileWatcher implements Runnable {
    private final WatchService watchService;
    private final Logger logger;
    private final FileChangeListener fileChangeListener;


    protected interface FileChangeListener {
        void onCreated(Path path);
        void onModified(Path path);
        void onDeleted(Path path);
    }

    protected CustomFileWatcher(FileChangeListener listener, Path path) throws IOException {
        this.fileChangeListener = listener;
        watchService = FileSystems.getDefault().newWatchService();
        logger = Logger.getLogger(CustomFileWatcher.class.getName());
        register(path);

    }


    private void register(Path path) {
        if (!Files.exists(path)) {
            logger.warning(String.format("Path %s does not exist", path));
            return;
        }

        registerPathWithWatchService(path);
        logger.info(String.format("Registered directory: %s", path));

        try (Stream<Path> stream = Files.list(path)) {
            stream.filter(Files::isDirectory)
                    .filter(p -> !Files.isSymbolicLink(p))
                    .forEach(this::register);
        } catch (IOException e) {
            logger.warning(String.format("Could not register directory: %s", e.getMessage()));
        }


    }

    private void registerPathWithWatchService(Path path) {
        try {
            path.register(watchService, ENTRY_CREATE, ENTRY_MODIFY, ENTRY_DELETE, OVERFLOW);
            logger.info(String.format("Registered path: %s", path));
        } catch (IOException e) {
            logger.warning(String.format("Could not register path: %s", e.getMessage()));
        }
    }

    @Override
    public void run() {
        try {
            WatchKey key = watchService.take();
            while (key != null) {
                Path watchedPath = (Path) key.watchable();

                key.pollEvents().forEach(event -> {
                    Path createdPath = watchedPath.resolve((Path) event.context());
                    WatchEvent.Kind<?> kind = event.kind();
                    handleEvent(kind, createdPath);
                });
                key.reset();
                key = watchService.take();
            }
        } catch (InterruptedException e) {
            logger.warning(String.format("Could not take watch key: %s", e.getMessage()));
            Thread.currentThread().interrupt();
        }
    }

    private void handleEvent(WatchEvent.Kind<?> kind, Path path) {
        if (kind == ENTRY_CREATE) {
            if (Files.isDirectory(path)) register(path);
            fileChangeListener.onCreated(path);
        } else if (kind == ENTRY_DELETE) {
            fileChangeListener.onDeleted(path);
        } else if (kind == ENTRY_MODIFY) {
            fileChangeListener.onModified(path);
        } else if (kind == OVERFLOW) {
            logger.warning("Event overflow occurred");
        }
    }


}


class DaemonTaskScheduler {

    private final ScheduledExecutorService scheduler;

    public DaemonTaskScheduler() {
        this(1);
    }

    public DaemonTaskScheduler(int corePoolSize) {
        this.scheduler = Executors.newScheduledThreadPool(corePoolSize, new DaemonThreadFactory());
    }

    public static void runOnceAndForget(Runnable task, long delay, TimeUnit unit) {
        DaemonTaskScheduler tempScheduler = new DaemonTaskScheduler(1);
        tempScheduler.scheduleOnce(task, delay, unit);
        tempScheduler.shutdown();
    }

    public ScheduledFuture<?> scheduleOnce(Runnable task, long delay, TimeUnit unit) {
        return scheduler.schedule(task, delay, unit);
    }

    public ScheduledFuture<?> scheduleAtFixedRate(Runnable task, long initialDelay, long period, TimeUnit unit) {
        return scheduler.scheduleAtFixedRate(task, initialDelay, period, unit);
    }

    public ScheduledFuture<?> scheduleWithFixedDelay(Runnable task, long initialDelay, long delay, TimeUnit unit) {
        return scheduler.scheduleWithFixedDelay(task, initialDelay, delay, unit);
    }

    public void shutdown() {
        scheduler.shutdown();
    }

    private static class DaemonThreadFactory implements ThreadFactory {
        private final AtomicInteger threadNumber = new AtomicInteger(1);

        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r);
            t.setDaemon(true);
            t.setName("Daemon-Scheduler-Thread-" + threadNumber.getAndIncrement());
            return t;
        }
    }
}




















