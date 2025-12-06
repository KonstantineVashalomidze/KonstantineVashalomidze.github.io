package server;

import java.io.IOException;
import java.nio.file.*;
import java.util.logging.Logger;
import java.util.stream.Stream;

import static java.nio.file.StandardWatchEventKinds.*;

class CustomFileWatcher implements Runnable {
    private final WatchService watchService;
    private final Logger logger;
    private final FileChangeListener fileChangeListener;
    private final Config config;

    protected CustomFileWatcher(FileChangeListener listener, Path path, Config config) throws IOException {
        this.fileChangeListener = listener;
        watchService = FileSystems.getDefault().newWatchService();
        logger = Logger.getLogger(CustomFileWatcher.class.getName());
        this.config = config;
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
            if (!config.isProduction()) e.printStackTrace();
            logger.warning(String.format("Could not register directory: %s", e.getMessage()));
        }


    }

    private void registerPathWithWatchService(Path path) {
        try {
            path.register(watchService, ENTRY_CREATE, ENTRY_MODIFY, ENTRY_DELETE, OVERFLOW);
            logger.info(String.format("Registered path: %s", path));
        } catch (IOException e) {
            if (!config.isProduction()) e.printStackTrace();
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
            if (!config.isProduction()) e.printStackTrace();
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

    protected interface FileChangeListener {
        void onCreated(Path path);

        void onModified(Path path);

        void onDeleted(Path path);
    }


}
