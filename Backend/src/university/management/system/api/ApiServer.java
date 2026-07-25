package university.management.system.api;

import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class ApiServer {

        public static void main(String[] args) {

                try {

                        HttpServer server = HttpServer.create(
                                        new InetSocketAddress(8080),
                                        0);

                        // Health API
                        server.createContext(
                                        "/api/health",
                                        exchange -> {

                                                String response = "University Management System Backend is running";

                                                exchange
                                                                .getResponseHeaders()
                                                                .add(
                                                                                "Access-Control-Allow-Origin",
                                                                                "http://localhost:5173");

                                                exchange
                                                                .getResponseHeaders()
                                                                .add(
                                                                                "Content-Type",
                                                                                "text/plain; charset=UTF-8");

                                                byte[] responseBytes = response.getBytes(
                                                                StandardCharsets.UTF_8);

                                                exchange.sendResponseHeaders(
                                                                200,
                                                                responseBytes.length);

                                                try (OutputStream os = exchange.getResponseBody()) {

                                                        os.write(responseBytes);
                                                }
                                        });

                        // Login API
                        server.createContext(
                                        "/api/login",
                                        new LoginHandler());
                        // Student Handler
                        server.createContext(
                                        "/api/students",
                                        new StudentHandler());

                        // Teacher Handler
                        server.createContext("/api/teachers", new TeacherHandler());

                        // Teacher Leave Handler
                        server.createContext(
                                        "/api/teacher-leaves",
                                        new TeacherLeaveHandler());

                        // StudentLeave Handler
                        server.createContext(
                                        "/api/student-leaves",
                                        new StudentLeaveHandler());
                        // Marks Handler
                        server.createContext(
                                        "/api/marks",
                                        new MarksHandler());
                        // Fee Handler
                        server.createContext(
                                        "/api/fees",
                                        new FeeHandler());
                        server.setExecutor(null);

                        // Student Fee Handler
                        server.createContext(
                                        "/api/student-fees",
                                        new StudentFeeHandler());

                        server.start();

                        System.out.println(
                                        "Student API: POST http://localhost:8080/api/students");

                        System.out.println(
                                        "------------------------------------");

                        System.out.println(
                                        "University Management System API");

                        System.out.println(
                                        "Backend started successfully");

                        System.out.println(
                                        "Health API:");

                        System.out.println(
                                        "http://localhost:8080/api/health");

                        System.out.println(
                                        "Login API:");

                        System.out.println(
                                        "POST http://localhost:8080/api/login");

                        System.out.println(
                                        "------------------------------------");

                } catch (IOException e) {

                        System.out.println(
                                        "Failed to start backend server");

                        e.printStackTrace();
                }
        }
}