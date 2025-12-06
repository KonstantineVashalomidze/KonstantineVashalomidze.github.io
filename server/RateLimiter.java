package server;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

public class RateLimiter {
    private final Map<String, RequestCounter> counters;
    private final Logger logger;
    private final int maxRequests;
    private final long windowMs;

    public RateLimiter(int maxRequests, long windowMs) {
        counters = new ConcurrentHashMap<>();
        logger = Logger.getLogger(RateLimiter.class.getName());
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;

        CustomDaemonTaskScheduler scheduler = new CustomDaemonTaskScheduler(1);
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
