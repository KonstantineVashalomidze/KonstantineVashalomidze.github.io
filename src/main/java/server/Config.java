package server;

import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

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
    public Config(
            String publicDir, int port, boolean production,
            int maxThreads, long requestTimeout, String logFile,
            long logLimit, int logCount, boolean logAppend
    ) {
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
