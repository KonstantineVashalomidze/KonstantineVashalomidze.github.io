package server;

import com.sun.net.httpserver.HttpExchange;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

class Request {
    private final HttpExchange exchange;
    private final Map<String, String> queryParams;
    private final Map<String, String> pathParams;
    private JSONObject body;

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


    public JSONObject getBody() throws IOException {
        if (body == null) {
            try (InputStream is = exchange.getRequestBody()) {
                body = new JSONObject(new String(is.readAllBytes()));
            }
        }
        return body;
    }


    public HttpExchange getExchange() {
        return exchange;
    }

}
