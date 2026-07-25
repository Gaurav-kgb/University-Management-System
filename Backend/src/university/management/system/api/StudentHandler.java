package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import university.management.system.dao.StudentDAO;
import university.management.system.model.Student;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class StudentHandler implements HttpHandler {

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        // Allow React frontend
        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Origin",
                "http://localhost:5173"
        );

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Methods",
                "POST, GET, PUT, DELETE, OPTIONS"
        );

        exchange.getResponseHeaders().add(
                "Access-Control-Allow-Headers",
                "Content-Type"
        );

        exchange.getResponseHeaders().add(
                "Content-Type",
                "application/json; charset=UTF-8"
        );

        // CORS preflight
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        // For now only POST
        if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            addStudent(exchange);
            return;
        }

        sendResponse(
                exchange,
                405,
                "{\"success\":false,\"message\":\"Method not allowed\"}"
        );
    }

    private void addStudent(HttpExchange exchange) throws IOException {

        try {

            String requestBody = new String(
                    exchange.getRequestBody().readAllBytes(),
                    StandardCharsets.UTF_8
            );

            System.out.println("Student request received");
            System.out.println(requestBody);

            String name = extractJsonValue(requestBody, "name");
            String fname = extractJsonValue(requestBody, "fname");
            String rollno = extractJsonValue(requestBody, "rollno");
            String dob = extractJsonValue(requestBody, "dob");
            String address = extractJsonValue(requestBody, "address");
            String phone = extractJsonValue(requestBody, "phone");
            String email = extractJsonValue(requestBody, "email");
            String x = extractJsonValue(requestBody, "x");
            String xii = extractJsonValue(requestBody, "xii");
            String aadhar = extractJsonValue(requestBody, "aadhar");
            String course = extractJsonValue(requestBody, "course");
            String branch = extractJsonValue(requestBody, "branch");

            // Basic validation
            if (isEmpty(name)
                    || isEmpty(fname)
                    || isEmpty(rollno)
                    || isEmpty(dob)
                    || isEmpty(email)) {

                sendResponse(
                        exchange,
                        400,
                        "{\"success\":false,\"message\":\"Required student fields are missing\"}"
                );

                return;
            }

            Student student = new Student(
                    name,
                    fname,
                    rollno,
                    dob,
                    address,
                    phone,
                    email,
                    x,
                    xii,
                    aadhar,
                    course,
                    branch
            );

            StudentDAO studentDAO = new StudentDAO();

            boolean inserted =
                    studentDAO.addStudent(student);

            if (inserted) {

                sendResponse(
                        exchange,
                        201,
                        "{\"success\":true,\"message\":\"Student added successfully\"}"
                );

            } else {

                sendResponse(
                        exchange,
                        500,
                        "{\"success\":false,\"message\":\"Failed to add student\"}"
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

    private boolean isEmpty(String value) {

        return value == null ||
                value.trim().isEmpty();
    }

    private String extractJsonValue(
            String json,
            String key
    ) {

        String searchKey =
                "\"" + key + "\"";

        int keyIndex =
                json.indexOf(searchKey);

        if (keyIndex == -1) {
            return null;
        }

        int colonIndex =
                json.indexOf(":", keyIndex);

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
}