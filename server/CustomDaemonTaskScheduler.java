package server;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

class CustomDaemonTaskScheduler {

    private final ScheduledExecutorService scheduler;

    public CustomDaemonTaskScheduler() {
        this(1);
    }

    public CustomDaemonTaskScheduler(int corePoolSize) {
        this.scheduler = Executors.newScheduledThreadPool(corePoolSize, new DaemonThreadFactory());
    }

    public static void runOnceAndForget(Runnable task, long delay, TimeUnit unit) {
        CustomDaemonTaskScheduler tempScheduler = new CustomDaemonTaskScheduler(1);
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
