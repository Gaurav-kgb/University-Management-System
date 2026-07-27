package university.management.system.api;

import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class ApiServer {

        public static void main(String[] args) {

                try {

                        // Render provides PORT.
                        // Locally, fallback to 8080.
                        String portEnv = System.getenv("PORT");

                        int port = (portEnv != null)
                                        ? Integer.parseInt(portEnv)
                                        : 8080;

                        HttpServer server = HttpServer.create(
                                        new InetSocketAddress("0.0.0.0", port),
                                        0);

                        // ==============================
                        // HEALTH API
                        // ==============================

                        server.createContext(
                                        "/api/health",
                                        exchange -> {

                                                ApiUtil.addCors(exchange);

                                                if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                                                        exchange.sendResponseHeaders(204, -1);
                                                        exchange.close();
                                                        return;
                                                }

                                                String response = "University Management System Backend is running";

                                                exchange.getResponseHeaders().set(
                                                                "Content-Type",
                                                                "text/plain; charset=UTF-8");

                                                byte[] responseBytes = response.getBytes(StandardCharsets.UTF_8);

                                                exchange.sendResponseHeaders(
                                                                200,
                                                                responseBytes.length);

                                                try (OutputStream os = exchange.getResponseBody()) {
                                                        os.write(responseBytes);
                                                }
                                        });

                        // ==============================
                        // API ROUTES
                        // ==============================

                        server.createContext(
                                        "/api/login",
                                        new LoginHandler());

                        server.createContext(
                                        "/api/students",
                                        new StudentHandler());

                        server.createContext(
                                        "/api/teachers",
                                        new TeacherHandler());

                        server.createContext(
                                        "/api/teacher-leaves",
                                        new TeacherLeaveHandler());

                        server.createContext(
                                        "/api/student-leaves",
                                        new StudentLeaveHandler());

                        server.createContext(
                                        "/api/marks",
                                        new MarksHandler());

                        server.createContext(
                                        "/api/fees",
                                        new FeeHandler());

                        server.createContext(
                                        "/api/student-fees",
                                        new StudentFeeHandler());

                        server.setExecutor(null);

                        // ==============================
                        // START SERVER
                        // ==============================

                        server.start();

                        System.out.println(
                                        "----------------------------------------");

                        System.out.println(
                                        "University Management System API");

                        System.out.println(
                                        "Backend started successfully");

                        System.out.println(
                                        "Server listening on 0.0.0.0:" + port);

                        System.out.println(
                                        "Health endpoint: /api/health");

                        System.out.println(
                                        "Login endpoint: /api/login");

                        System.out.println(
                                        "Student endpoint: /api/students");

                        System.out.println(
                                        "Teacher endpoint: /api/teachers");

                        System.out.println(
                                        "Student Leave endpoint: /api/student-leaves");

                        System.out.println(
                                        "Teacher Leave endpoint: /api/teacher-leaves");

                        System.out.println(
                                        "Marks endpoint: /api/marks");

                        System.out.println(
                                        "Fees endpoint: /api/fees");

                        System.out.println(
                                        "Student Fees endpoint: /api/student-fees");

                        System.out.println(
                                        "----------------------------------------");

                } catch (IOException e) {

                        System.out.println(
                                        "Failed to start backend server");

                        e.printStackTrace();
                }
        }
}