package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import university.management.system.dao.LoginDAO;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class LoginHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        // CORS headers for React
        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Origin",
                "http://localhost:5173"
        );

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Methods",
                "POST, OPTIONS"
        );

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );

        exchange.getResponseHeaders().add(
                "Content-Type",
                "application/json"
        );

        // Handle browser CORS preflight request
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        // Only POST is allowed
        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {

            sendResponse(
                    exchange,
                    405,
                    "{\"success\":false,\"message\":\"Method not allowed\"}"
            );

            return;
        }

        try {

            // Read JSON sent from React
            InputStream inputStream = exchange.getRequestBody();

            String requestBody = new String(
                    inputStream.readAllBytes(),
                    StandardCharsets.UTF_8
            );

            System.out.println("Login request received");

            String username = extractJsonValue(
                    requestBody,
                    "username"
            );

            String password = extractJsonValue(
                    requestBody,
                    "password"
            );

            if (username == null ||
                    password == null ||
                    username.trim().isEmpty() ||
                    password.trim().isEmpty()) {

                sendResponse(
                        exchange,
                        400,
                        "{\"success\":false,\"message\":\"Username and password are required\"}"
                );

                return;
            }

            LoginDAO loginDAO = new LoginDAO();

            boolean valid = loginDAO.validateLogin(
                    username,
                    password
            );

            if (valid) {

                sendResponse(
                        exchange,
                        200,
                        "{\"success\":true,\"message\":\"Login successful\"}"
                );

            } else {

                sendResponse(
                        exchange,
                        401,
                        "{\"success\":false,\"message\":\"Invalid username or password\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            sendResponse(
                    exchange,
                    500,
                    "{\"success\":false,\"message\":\"Internal server error\"}"
            );
        }
    }

    private void sendResponse(
            HttpExchange exchange,
            int statusCode,
            String response
    ) throws IOException {

        byte[] responseBytes =
                response.getBytes(StandardCharsets.UTF_8);

        exchange.sendResponseHeaders(
                statusCode,
                responseBytes.length
        );

        try (OutputStream os =
                     exchange.getResponseBody()) {

            os.write(responseBytes);
        }
    }

    private String extractJsonValue(
            String json,
            String key
    ) {

        String searchKey = "\"" + key + "\"";

        int keyIndex = json.indexOf(searchKey);

        if (keyIndex == -1) {
            return null;
        }

        int colonIndex = json.indexOf(":", keyIndex);

        if (colonIndex == -1) {
            return null;
        }

        int firstQuote =
                json.indexOf("\"", colonIndex);

        if (firstQuote == -1) {
            return null;
        }

        int secondQuote =
                json.indexOf("\"", firstQuote + 1);

        if (secondQuote == -1) {
            return null;
        }

        return json.substring(
                firstQuote + 1,
                secondQuote
        );
    }
}