package server;

@FunctionalInterface
interface DynamicRoute {
    Response handle(Request request) throws Exception;
}
