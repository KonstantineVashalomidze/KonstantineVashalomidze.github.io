package server;

import java.util.HashMap;
import java.util.Map;

import static java.net.HttpURLConnection.HTTP_OK;

class Response {
    private final Map<String, String> headers = new HashMap<>();
    private int statusCode = HTTP_OK;
    private byte[] body = new byte[0];


    public Response() {
    }

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
