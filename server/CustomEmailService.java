package server;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.logging.Logger;

import static java.net.HttpURLConnection.HTTP_BAD_REQUEST;

class CustomEmailService {
    private static final String BASE_URL = "https://api.brevo.com/v3";
    private final Logger logger;
    private final String apiKey;
    private final HttpClient httpClient;

    public CustomEmailService(Config config) {
        logger = Logger.getLogger(CustomEmailService.class.getName());
        this.apiKey = config.getEmailApiKey();
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();
    }

    public void subscribeUser(String email, long listId) {
        try {
            String jsonPayload = String.format("""
                    {
                        "email": "%s",
                        "listIds": [%d],
                        "updateEnabled": true
                    }
                    """, escapeJson(email), listId);

            sendRequest("POST", "/contacts", jsonPayload);
            logger.info(String.format("Subscribed user: %s", email));
        } catch (Exception e) {
            logger.severe(String.format("Failed to subscribe user %s: %s", email, e.getMessage()));
        }
    }

    public void unsubscribeUser(String email, long listId) {
        try {
            String jsonPayload = String.format("""
                    {
                        "emails": ["%s"]
                    }
                    """, escapeJson(email));

            String endpoint = String.format("/contacts/lists/%d/contacts/remove", listId);
            sendRequest("POST", endpoint, jsonPayload);
            logger.info(String.format("Unsubscribed user: %s", email));
        } catch (Exception e) {
            logger.severe(String.format("Failed to unsubscribe user %s: %s", email, e.getMessage()));
        }
    }

    public String getSubscriptionStatus(String email) {
        try {
            String endpoint = String.format("/contacts/%s", email);
            String response = sendRequest("GET", endpoint, null);
            return response;
        } catch (Exception e) {
            logger.severe(String.format("Failed to get subscription status for %s: %s", email, e.getMessage()));
            return "";
        }
    }

    public void sendHtmlMessage(String subject, String htmlContent, String senderName, String senderEmail, long listId) {
        try {
            String campaignJson = String.format("""
                            {
                                "name": "Campaign %d",
                                "sender": {
                                    "name": "%s",
                                    "email": "%s"
                                },
                                "subject": "%s",
                                "htmlContent": "%s",
                                "recipients": {
                                    "listIds": [%d]
                                }
                            }
                            """, System.currentTimeMillis(),
                    escapeJson(senderName),
                    escapeJson(senderEmail),
                    escapeJson(subject),
                    escapeJson(htmlContent),
                    listId);

            String responseBody = sendRequest("POST", "/emailCampaigns", campaignJson);
            long campaignId = extractIdFromResponse(responseBody);

            if (campaignId != -1) {
                String sendEndpoint = String.format("/emailCampaigns/%d/sendNow", campaignId);
                sendRequest("POST", sendEndpoint, null);
                logger.info(String.format("Sent campaign ID: %d", campaignId));
            }
        } catch (Exception e) {
            logger.severe(String.format("Failed to send HTML message: %s", e.getMessage()));
        }
    }

    private String sendRequest(String method, String endpoint, String jsonBody) throws IOException, InterruptedException {
        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + endpoint))
                .header("api-key", apiKey)
                .header("Content-Type", "application/json")
                .header("Accept", "application/json");

        if (jsonBody != null) {
            builder.method(method, HttpRequest.BodyPublishers.ofString(jsonBody));
        } else {
            builder.method(method, HttpRequest.BodyPublishers.noBody());
        }

        HttpResponse<String> response = httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() >= HTTP_BAD_REQUEST) {
            logger.warning(String.format("API request failed [%d]: %s", response.statusCode(), response.body()));
            return "";
        }

        return response.body();
    }

    private long extractIdFromResponse(String json) {
        int idIndex = json.indexOf("\"id\"");
        if (idIndex == -1) {
            logger.warning(String.format("server.Response did not contain an ID: %s", json));
            return -1;
        }

        int colonIndex = json.indexOf(":", idIndex);
        int startIndex = colonIndex + 1;

        while (startIndex < json.length() && !Character.isDigit(json.charAt(startIndex))) {
            startIndex++;
        }

        int endIndex = startIndex;
        while (endIndex < json.length() && Character.isDigit(json.charAt(endIndex))) {
            endIndex++;
        }

        String idStr = json.substring(startIndex, endIndex);
        return Long.parseLong(idStr);
    }

    private String escapeJson(String input) {
        if (input == null) return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            switch (c) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\b' -> sb.append("\\b");
                case '\f' -> sb.append("\\f");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (c < ' ') {
                        String t = "000" + Integer.toHexString(c);
                        sb.append("\\u").append(t.substring(t.length() - 4));
                    } else {
                        sb.append(c);
                    }
                }
            }
        }
        return sb.toString();
    }
}
