package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class ApiUtil {

    public static void addCors(HttpExchange exchange) {

    exchange.getResponseHeaders().set(
        "Access-Control-Allow-Origin",
        "https://university-management-system-green.vercel.app"
    );

    exchange.getResponseHeaders().set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    exchange.getResponseHeaders().set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
}

    public static String getJsonValue(String json, String key) {

    String search = "\"" + key + "\":";

    int start = json.indexOf(search);

    if (start == -1) {
        return "";
    }

    start += search.length();

    while (start < json.length() &&
           Character.isWhitespace(json.charAt(start))) {
        start++;
    }

    if (json.charAt(start) == '"') {

        start++;

        int end = json.indexOf('"', start);

        return json.substring(start, end);
    }

    return "";
}

   public static void sendJson(
        HttpExchange exchange,
        int status,
        String json) throws IOException {

    addCors(exchange);

    exchange.getResponseHeaders().set(
        "Content-Type",
        "application/json; charset=UTF-8"
    );

    byte[] response =
            json.getBytes(StandardCharsets.UTF_8);

    exchange.sendResponseHeaders(
            status,
            response.length
    );

    try (OutputStream os =
                 exchange.getResponseBody()) {

        os.write(response);
    }
}

    public static String escape(String value) {

        if (value == null)
            return "";

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"");
    }
}