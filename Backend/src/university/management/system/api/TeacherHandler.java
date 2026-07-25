package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import university.management.system.dao.TeacherDAO;
import university.management.system.model.Teacher;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class TeacherHandler implements HttpHandler {

    private final TeacherDAO dao =
            new TeacherDAO();

    @Override
    public void handle(HttpExchange exchange)
            throws IOException {

        // =====================================
        // CORS
        // =====================================

        if ("OPTIONS".equalsIgnoreCase(
                exchange.getRequestMethod())) {

            ApiUtil.addCors(exchange);

            exchange.sendResponseHeaders(
                    204,
                    -1
            );

            return;
        }

        String method =
                exchange.getRequestMethod();


        // =====================================
        // GET
        // =====================================

        if ("GET".equalsIgnoreCase(method)) {

            getTeachers(exchange);
            return;
        }


        // =====================================
        // POST
        // =====================================

        if ("POST".equalsIgnoreCase(method)) {

            addTeacher(exchange);
            return;
        }


        // =====================================
        // DELETE
        // =====================================

        if ("DELETE".equalsIgnoreCase(method)) {

            deleteTeacher(exchange);
            return;
        }


        ApiUtil.sendJson(
                exchange,
                405,
                "{\"success\":false,\"message\":\"Method not allowed\"}"
        );
    }


    // =========================================
    // POST TEACHER
    // =========================================

    private void addTeacher(
            HttpExchange exchange)
            throws IOException {

        String body = new String(
                exchange.getRequestBody()
                        .readAllBytes(),
                StandardCharsets.UTF_8
        );

        System.out.println(
                "Teacher Request:"
        );

        System.out.println(body);

        Teacher teacher =
                new Teacher();


        teacher.setName(
                ApiUtil.getJsonValue(
                        body,
                        "name"
                )
        );


        teacher.setFname(
                ApiUtil.getJsonValue(
                        body,
                        "fname"
                )
        );


        teacher.setEmpId(
                ApiUtil.getJsonValue(
                        body,
                        "empId"
                )
        );


        teacher.setDob(
                ApiUtil.getJsonValue(
                        body,
                        "dob"
                )
        );


        teacher.setAddress(
                ApiUtil.getJsonValue(
                        body,
                        "address"
                )
        );


        teacher.setPhone(
                ApiUtil.getJsonValue(
                        body,
                        "phone"
                )
        );


        teacher.setEmail(
                ApiUtil.getJsonValue(
                        body,
                        "email"
                )
        );


        teacher.setClass_x(
                ApiUtil.getJsonValue(
                        body,
                        "class_x"
                )
        );


        teacher.setClass_xii(
                ApiUtil.getJsonValue(
                        body,
                        "class_xii"
                )
        );


        teacher.setAadhar(
                ApiUtil.getJsonValue(
                        body,
                        "aadhar"
                )
        );


        teacher.setEducation(
                ApiUtil.getJsonValue(
                        body,
                        "education"
                )
        );


        teacher.setDepartment(
                ApiUtil.getJsonValue(
                        body,
                        "department"
                )
        );


        // =====================================
        // BASIC VALIDATION
        // =====================================

        if (teacher.getName().isEmpty() ||
                teacher.getEmpId().isEmpty()) {

            ApiUtil.sendJson(
                    exchange,
                    400,
                    "{\"success\":false,\"message\":\"Teacher name and employee ID are required\"}"
            );

            return;
        }


        boolean success =
                dao.addTeacher(teacher);


        if (success) {

            ApiUtil.sendJson(
                    exchange,
                    201,
                    "{\"success\":true,\"message\":\"Teacher added successfully\"}"
            );

        } else {

            ApiUtil.sendJson(
                    exchange,
                    500,
                    "{\"success\":false,\"message\":\"Unable to add teacher\"}"
            );
        }
    }


    // =========================================
    // GET TEACHERS
    // =========================================

    private void getTeachers(
            HttpExchange exchange)
            throws IOException {

        List<Teacher> teachers =
                dao.getAllTeachers();

        StringBuilder json =
                new StringBuilder("[");


        for (int i = 0;
             i < teachers.size();
             i++) {

            Teacher t =
                    teachers.get(i);


            json.append("{")

                    .append("\"name\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getName()
                            )
                    )
                    .append("\",")

                    .append("\"fname\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getFname()
                            )
                    )
                    .append("\",")

                    .append("\"empId\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getEmpId()
                            )
                    )
                    .append("\",")

                    .append("\"dob\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getDob()
                            )
                    )
                    .append("\",")

                    .append("\"address\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getAddress()
                            )
                    )
                    .append("\",")

                    .append("\"phone\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getPhone()
                            )
                    )
                    .append("\",")

                    .append("\"email\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getEmail()
                            )
                    )
                    .append("\",")

                    .append("\"class_x\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getClass_x()
                            )
                    )
                    .append("\",")

                    .append("\"class_xii\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getClass_xii()
                            )
                    )
                    .append("\",")

                    .append("\"aadhar\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getAadhar()
                            )
                    )
                    .append("\",")

                    .append("\"education\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getEducation()
                            )
                    )
                    .append("\",")

                    .append("\"department\":\"")
                    .append(
                            ApiUtil.escape(
                                    t.getDepartment()
                            )
                    )
                    .append("\"")

                    .append("}");


            if (i < teachers.size() - 1) {

                json.append(",");
            }
        }


        json.append("]");


        ApiUtil.sendJson(
                exchange,
                200,
                json.toString()
        );
    }


    // =========================================
    // DELETE TEACHER
    // =========================================

    private void deleteTeacher(
            HttpExchange exchange)
            throws IOException {

        String path =
                exchange.getRequestURI()
                        .getPath();

        String prefix =
                "/api/teachers/";

        if (!path.startsWith(prefix) ||
                path.length() <= prefix.length()) {

            ApiUtil.sendJson(
                    exchange,
                    400,
                    "{\"success\":false,\"message\":\"Employee ID is required\"}"
            );

            return;
        }


        String empId =
                path.substring(
                        prefix.length()
                );


        boolean success =
                dao.deleteTeacher(empId);


        if (success) {

            ApiUtil.sendJson(
                    exchange,
                    200,
                    "{\"success\":true,\"message\":\"Teacher deleted successfully\"}"
            );

        } else {

            ApiUtil.sendJson(
                    exchange,
                    404,
                    "{\"success\":false,\"message\":\"Teacher not found\"}"
            );
        }
    }
}