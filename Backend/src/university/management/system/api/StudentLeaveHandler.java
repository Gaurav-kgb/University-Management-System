package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import university.management.system.dao.StudentLeaveDAO;
import university.management.system.model.StudentLeave;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class StudentLeaveHandler implements HttpHandler {

    private final StudentLeaveDAO dao = new StudentLeaveDAO();

    @Override
    public void handle(HttpExchange exchange) throws IOException {

        // CORS
        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            ApiUtil.addCors(exchange);
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        String method = exchange.getRequestMethod();

        switch (method) {

            case "GET":
                getAllLeaves(exchange);
                break;

            case "POST":
                addLeave(exchange);
                break;

            case "DELETE":
                deleteLeave(exchange);
                break;

            default:
                ApiUtil.sendJson(
                        exchange,
                        405,
                        "{\"success\":false,\"message\":\"Method Not Allowed\"}"
                );
        }
    }

    // ===========================
    // GET ALL LEAVES
    // ===========================

    private void getAllLeaves(HttpExchange exchange) throws IOException {

        List<StudentLeave> leaves = dao.getAllLeaves();

        StringBuilder json = new StringBuilder("[");

        for (int i = 0; i < leaves.size(); i++) {

            StudentLeave l = leaves.get(i);

            json.append("{")
                    .append("\"id\":").append(l.getId()).append(",")
                    .append("\"rollno\":\"").append(ApiUtil.escape(l.getRollno())).append("\",")
                    .append("\"name\":\"").append(ApiUtil.escape(l.getName())).append("\",")
                    .append("\"course\":\"").append(ApiUtil.escape(l.getCourse())).append("\",")
                    .append("\"branch\":\"").append(ApiUtil.escape(l.getBranch())).append("\",")
                    .append("\"leaveType\":\"").append(ApiUtil.escape(l.getLeaveType())).append("\",")
                    .append("\"fromDate\":\"").append(ApiUtil.escape(l.getFromDate())).append("\",")
                    .append("\"toDate\":\"").append(ApiUtil.escape(l.getToDate())).append("\",")
                    .append("\"reason\":\"").append(ApiUtil.escape(l.getReason())).append("\"")
                    .append("}");

            if (i < leaves.size() - 1) {
                json.append(",");
            }
        }

        json.append("]");

        ApiUtil.sendJson(exchange, 200, json.toString());
    }

    // ===========================
    // ADD LEAVE
    // ===========================

    private void addLeave(HttpExchange exchange) throws IOException {

        String body = new String(
                exchange.getRequestBody().readAllBytes(),
                StandardCharsets.UTF_8
        );

        StudentLeave leave = new StudentLeave();

        leave.setRollno(ApiUtil.getJsonValue(body, "rollno"));
        leave.setName(ApiUtil.getJsonValue(body, "name"));
        leave.setCourse(ApiUtil.getJsonValue(body, "course"));
        leave.setBranch(ApiUtil.getJsonValue(body, "branch"));
        leave.setLeaveType(ApiUtil.getJsonValue(body, "leaveType"));
        leave.setFromDate(ApiUtil.getJsonValue(body, "fromDate"));
        leave.setToDate(ApiUtil.getJsonValue(body, "toDate"));
        leave.setReason(ApiUtil.getJsonValue(body, "reason"));

        boolean success = dao.addLeave(leave);

        if (success) {

            ApiUtil.sendJson(
                    exchange,
                    200,
                    "{\"success\":true,\"message\":\"Leave submitted successfully\"}"
            );

        } else {

            ApiUtil.sendJson(
                    exchange,
                    500,
                    "{\"success\":false,\"message\":\"Unable to submit leave\"}"
            );
        }
    }

    // ===========================
    // DELETE LEAVE
    // ===========================

    private void deleteLeave(HttpExchange exchange) throws IOException {

        String query = exchange.getRequestURI().getQuery();

        if (query == null || !query.startsWith("id=")) {

            ApiUtil.sendJson(
                    exchange,
                    400,
                    "{\"success\":false,\"message\":\"Missing id\"}"
            );
            return;
        }

        int id = Integer.parseInt(query.substring(3));

        boolean success = dao.deleteLeave(id);

        if (success) {

            ApiUtil.sendJson(
                    exchange,
                    200,
                    "{\"success\":true,\"message\":\"Leave deleted successfully\"}"
            );

        } else {

            ApiUtil.sendJson(
                    exchange,
                    404,
                    "{\"success\":false,\"message\":\"Leave not found\"}"
            );
        }
    }
}