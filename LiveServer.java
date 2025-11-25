import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.*;
import java.util.*;
import java.util.concurrent.*;

public class LiveServer {
    private static final int PORT = 6969;
    private static final String ROOT_DIR = "./";
    private static final Set<HttpExchange> sseClients = ConcurrentHashMap.newKeySet();

    private static final Map<String, String> MIME_TYPES = new HashMap<>();
    static {
        MIME_TYPES.put("html", "text/html");
        MIME_TYPES.put("css", "text/css");
        MIME_TYPES.put("js", "application/javascript");
        MIME_TYPES.put("json", "application/json");
        MIME_TYPES.put("png", "image/png");
        MIME_TYPES.put("jpg", "image/jpeg");
        MIME_TYPES.put("jpeg", "image/jpeg");
        MIME_TYPES.put("gif", "image/gif");
        MIME_TYPES.put("svg", "image/svg+xml");
        MIME_TYPES.put("ico", "image/x-icon");
        MIME_TYPES.put("txt", "text/plain");
    }

    // JavaScript snippet to inject for live reload
    private static final String RELOAD_SCRIPT =
            "<script>\n" +
                    "(function() {\n" +
                    "  const es = new EventSource('/live-reload-stream');\n" +
                    "  es.onmessage = () => location.reload();\n" +
                    "  es.onerror = () => setTimeout(() => location.reload(), 1000);\n" +
                    "})();\n" +
                    "</script>";

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        // SSE endpoint for live reload notifications
        server.createContext("/live-reload-stream", (HttpExchange ex) -> {
            ex.getResponseHeaders().set("Content-Type", "text/event-stream");
            ex.getResponseHeaders().set("Cache-Control", "no-cache");
            ex.getResponseHeaders().set("Connection", "keep-alive");
            ex.sendResponseHeaders(200, 0);

            sseClients.add(ex);
            System.out.println("→ Client connected for live reload");

            // Keep connection alive (client will close it)
        });

        // Main file serving context
        server.createContext("/", (HttpExchange exchange) -> {
            String path = exchange.getRequestURI().getPath();

            if (path.equals("/")) {
                path = "/index.html";
            }

            String filePath = ROOT_DIR + path.substring(1);
            File file = new File(filePath);

            try {
                if (file.exists() && file.isFile()) {
                    byte[] fileContent = Files.readAllBytes(file.toPath());
                    String extension = getFileExtension(file.getName());
                    String contentType = MIME_TYPES.getOrDefault(extension, "application/octet-stream");

                    // Inject reload script into HTML files
                    if (extension.equals("html")) {
                        String html = new String(fileContent);
                        if (html.contains("</body>")) {
                            html = html.replace("</body>", RELOAD_SCRIPT + "</body>");
                            fileContent = html.getBytes();
                        }
                    }

                    exchange.getResponseHeaders().set("Content-Type", contentType);
                    exchange.sendResponseHeaders(200, fileContent.length);

                    OutputStream os = exchange.getResponseBody();
                    os.write(fileContent);
                    os.close();

                    System.out.println("✓ Served: " + path + " (" + contentType + ")");
                } else {
                    String response = "404 - File Not Found: " + path;
                    exchange.sendResponseHeaders(404, response.length());
                    OutputStream os = exchange.getResponseBody();
                    os.write(response.getBytes());
                    os.close();

                    System.out.println("✗ Not found: " + path);
                }
            } catch (IOException e) {
                String response = "500 - Internal Server Error";
                exchange.sendResponseHeaders(500, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();

                System.err.println("Error serving " + path + ": " + e.getMessage());
            }
        });

        server.setExecutor(null);
        server.start();

        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║  Live Server Started Successfully!     ║");
        System.out.println("╚════════════════════════════════════════╝");
        System.out.println("\n→ Server running at: http://localhost:" + PORT);
        System.out.println("→ Serving files from: " + new File(ROOT_DIR).getAbsolutePath());
        System.out.println("→ Live reload: ENABLED");
        System.out.println("\nPress Ctrl+C to stop the server\n");

        // Start file watcher in separate thread
        startFileWatcher();
    }

    private static void startFileWatcher() {
        new Thread(() -> {
            try {
                WatchService watchService = FileSystems.getDefault().newWatchService();
                Path path = Paths.get(ROOT_DIR);

                // Register directory for all events
                path.register(watchService,
                        StandardWatchEventKinds.ENTRY_CREATE,
                        StandardWatchEventKinds.ENTRY_MODIFY,
                        StandardWatchEventKinds.ENTRY_DELETE);

                System.out.println("→ File watcher started\n");

                while (true) {
                    WatchKey key = watchService.take();

                    for (WatchEvent<?> event : key.pollEvents()) {
                        String filename = event.context().toString();
                        System.out.println("⟳ File changed: " + filename + " - reloading clients...");
                        notifyClients();
                    }

                    key.reset();
                }
            } catch (Exception e) {
                System.err.println("File watcher error: " + e.getMessage());
            }
        }).start();
    }

    private static void notifyClients() {
        Iterator<HttpExchange> it = sseClients.iterator();
        while (it.hasNext()) {
            HttpExchange ex = it.next();
            try {
                OutputStream os = ex.getResponseBody();
                os.write("data: reload\n\n".getBytes());
                os.flush();
            } catch (IOException e) {
                // Client disconnected, remove from set
                it.remove();
            }
        }
    }

    private static String getFileExtension(String filename) {
        int lastDot = filename.lastIndexOf('.');
        if (lastDot > 0 && lastDot < filename.length() - 1) {
            return filename.substring(lastDot + 1).toLowerCase();
        }
        return "";
    }
}