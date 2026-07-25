package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import university.management.system.dao.TeacherLeaveDAO;
import university.management.system.model.TeacherLeave;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class TeacherLeaveHandler implements HttpHandler {

    private final TeacherLeaveDAO dao =
            new TeacherLeaveDAO();

    @Override
    public void handle(HttpExchange exchange)
            throws IOException {

        // CORS
        if ("OPTIONS".equalsIgnoreCase(
                exchange.getRequestMethod())) {

            ApiUtil.addCors(exchange);
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        String method =
                exchange.getRequestMethod();

        if ("GET".equalsIgnoreCase(method)) {
            getAllLeaves(exchange);
            return;
        }

        if ("POST".equalsIgnoreCase(method)) {
            addLeave(exchange);
            return;
        }

        ApiUtil.sendJson(
                exchange,
                405,
                "{\"success\":false,\"message\":\"Method not allowed\"}"
        );
    }

    // =========================================
    // POST - ADD LEAVE
    // =========================================

    private void addLeave(HttpExchange exchange)
            throws IOException {

        String body = new String(
                exchange.getRequestBody().readAllBytes(),
                StandardCharsets.UTF_8
        );

        System.out.println("Teacher Leave Request:");
        System.out.println(body);

        TeacherLeave leave =
                new TeacherLeave();

        leave.setEmployeeId(
                ApiUtil.getJsonValue(
                        body,
                        "employeeId"
                )
        );

        leave.setTeacherName(
                ApiUtil.getJsonValue(
                        body,
                        "teacherName"
                )
        );

        leave.setDepartment(
                ApiUtil.getJsonValue(
                        body,
                        "department"
                )
        );

        leave.setLeaveType(
                ApiUtil.getJsonValue(
                        body,
                        "leaveType"
                )
        );

        leave.setFromDate(
                ApiUtil.getJsonValue(
                        body,
                        "fromDate"
                )
        );

        leave.setToDate(
                ApiUtil.getJsonValue(
                        body,
                        "toDate"
                )
        );

        leave.setReason(
                ApiUtil.getJsonValue(
                        body,
                        "reason"
                )
        );

        // Validation
        if (leave.getEmployeeId().isEmpty() ||
                leave.getTeacherName().isEmpty() ||
                leave.getDepartment().isEmpty() ||
                leave.getLeaveType().isEmpty() ||
                leave.getFromDate().isEmpty() ||
                leave.getToDate().isEmpty() ||
                leave.getReason().isEmpty()) {

            ApiUtil.sendJson(
                    exchange,
                    400,
                    "{\"success\":false,\"message\":\"All fields are required\"}"
            );

            return;
        }

        boolean success =
                dao.addLeave(leave);

        if (success) {

            ApiUtil.sendJson(
                    exchange,
                    201,
                    "{\"success\":true,\"message\":\"Teacher leave submitted successfully\"}"
            );

        } else {

            ApiUtil.sendJson(
                    exchange,
                    500,
                    "{\"success\":false,\"message\":\"Unable to submit teacher leave\"}"
            );
        }
    }

    // =========================================
    // GET - ALL LEAVES
    // =========================================

    private void getAllLeaves(HttpExchange exchange)
            throws IOException {

        List<TeacherLeave> leaves =
                dao.getAllLeaves();

        StringBuilder json =
                new StringBuilder("[");

        for (int i = 0; i < leaves.size(); i++) {

            TeacherLeave leave =
                    leaves.get(i);

            json.append("{")

                    .append("\"employeeId\":\"")
                    .append(ApiUtil.escape(
                            leave.getEmployeeId()))
                    .append("\",")

                    .append("\"teacherName\":\"")
                    .append(ApiUtil.escape(
                            leave.getTeacherName()))
                    .append("\",")

                    .append("\"department\":\"")
                    .append(ApiUtil.escape(
                            leave.getDepartment()))
                    .append("\",")

                    .append("\"leaveType\":\"")
                    .append(ApiUtil.escape(
                            leave.getLeaveType()))
                    .append("\",")

                    .append("\"fromDate\":\"")
                    .append(ApiUtil.escape(
                            leave.getFromDate()))
                    .append("\",")

                    .append("\"toDate\":\"")
                    .append(ApiUtil.escape(
                            leave.getToDate()))
                    .append("\",")

                    .append("\"reason\":\"")
                    .append(ApiUtil.escape(
                            leave.getReason()))
                    .append("\"")

                    .append("}");

            if (i < leaves.size() - 1) {
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
}