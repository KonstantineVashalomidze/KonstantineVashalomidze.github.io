package server;

import java.io.IOException;
import java.nio.file.*;
import java.util.concurrent.*;
import java.util.logging.*;

public class Main {
    public static void main(String[] args) throws IOException {
        Config config = Config.fromEnvironment();


        Logger logger = Logger.getLogger(Main.class.getName());
        setupLogging(config);

        Path publicPath = Path.of(config.getPublicDir());
        System.out.println(publicPath.toAbsolutePath());
        if (!Files.exists(publicPath)) {
            Files.createDirectory(publicPath);
            logger.info(String.format("Created directory: %s", publicPath));

        }

        Server server = new Server(config, publicPath);
        server.start();

        if (!config.isProduction()) {
            enableHotReload(server, config, publicPath, logger);
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


    public static void enableHotReload(Server server, Config config, Path publicPath, Logger logger) {
        // Register file change listener
        CustomFileWatcher.FileChangeListener fileChangeListener =
                new CustomFileWatcher.FileChangeListener() {
                    private final CustomDaemonTaskScheduler scheduler = new CustomDaemonTaskScheduler(1);
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
                    new CustomFileWatcher(fileChangeListener, publicPath, config)
            );
            watcherThread.start();
        } catch (IOException e) {
            if (!config.isProduction()) e.printStackTrace();
            logger.severe(String.format("Could not start file watcher: %s", e.getMessage()));
        }
    }


}


