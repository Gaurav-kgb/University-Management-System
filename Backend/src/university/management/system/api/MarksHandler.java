package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import university.management.system.dao.MarksDAO;
import university.management.system.model.Marks;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class MarksHandler implements HttpHandler {

        private final MarksDAO dao = new MarksDAO();

        @Override
        public void handle(HttpExchange exchange)
                        throws IOException {

                // ==================================
                // CORS
                // ==================================

                if ("OPTIONS".equalsIgnoreCase(
                                exchange.getRequestMethod())) {

                        ApiUtil.addCors(exchange);

                        exchange.sendResponseHeaders(
                                        204,
                                        -1);

                        return;
                }

                String method = exchange.getRequestMethod();

                // ==================================
                // GET
                // ==================================

                if ("GET".equalsIgnoreCase(method)) {

                        getAllMarks(exchange);
                        return;
                }

                // ==================================
                // POST
                // ==================================

                if ("POST".equalsIgnoreCase(method)) {

                        addMarks(exchange);
                        return;
                }

                // ==================================
                // METHOD NOT ALLOWED
                // ==================================

                ApiUtil.sendJson(
                                exchange,
                                405,
                                "{\"success\":false,\"message\":\"Method not allowed\"}");
        }

        // =====================================
        // POST - ADD MARKS
        // =====================================

        private void addMarks(HttpExchange exchange)
                        throws IOException {

                String body = new String(
                                exchange
                                                .getRequestBody()
                                                .readAllBytes(),
                                StandardCharsets.UTF_8);

                System.out.println(
                                "Marks Request:");

                System.out.println(body);

                try {

                        Marks marks = new Marks();

                        marks.setRollno(
                                        ApiUtil.getJsonValue(
                                                        body,
                                                        "rollno"));

                        marks.setSemester(
                                        ApiUtil.getJsonValue(
                                                        body,
                                                        "semester"));

                        marks.setMarks1(
                                        Integer.parseInt(
                                                        ApiUtil.getJsonValue(
                                                                        body,
                                                                        "marks1")));

                        marks.setMarks2(
                                        Integer.parseInt(
                                                        ApiUtil.getJsonValue(
                                                                        body,
                                                                        "marks2")));

                        marks.setMarks3(
                                        Integer.parseInt(
                                                        ApiUtil.getJsonValue(
                                                                        body,
                                                                        "marks3")));

                        marks.setMarks4(
                                        Integer.parseInt(
                                                        ApiUtil.getJsonValue(
                                                                        body,
                                                                        "marks4")));

                        marks.setMarks5(
                                        Integer.parseInt(
                                                        ApiUtil.getJsonValue(
                                                                        body,
                                                                        "marks5")));

                        // =================================
                        // VALIDATION
                        // =================================

                        if (marks.getRollno().isEmpty() ||
                                        marks.getSemester().isEmpty()) {

                                ApiUtil.sendJson(
                                                exchange,
                                                400,
                                                "{\"success\":false,\"message\":\"Roll number and semester are required\"}");

                                return;
                        }

                        if (!validMarks(marks)) {

                                ApiUtil.sendJson(
                                                exchange,
                                                400,
                                                "{\"success\":false,\"message\":\"Marks must be between 0 and 100\"}");

                                return;
                        }

                        // =================================
                        // SAVE TO DATABASE
                        // =================================

                        boolean success = dao.addMarks(marks);

                        if (success) {

                                ApiUtil.sendJson(
                                                exchange,
                                                201,
                                                "{\"success\":true,\"message\":\"Student marks added successfully\"}");

                        } else {

                                ApiUtil.sendJson(
                                                exchange,
                                                500,
                                                "{\"success\":false,\"message\":\"Unable to save student marks\"}");
                        }

                } catch (NumberFormatException e) {

                        ApiUtil.sendJson(
                                        exchange,
                                        400,
                                        "{\"success\":false,\"message\":\"Please enter valid numeric marks\"}");
                }
        }

        // =====================================
        // GET - ALL MARKS
        // =====================================

        private void getAllMarks(
                        HttpExchange exchange)
                        throws IOException {

                List<Marks> marksList = dao.getAllMarks();

                StringBuilder json = new StringBuilder("[");

                for (int i = 0; i < marksList.size(); i++) {

                        Marks m = marksList.get(i);

                        // Calculate total

                        int total = m.getMarks1() +
                                        m.getMarks2() +
                                        m.getMarks3() +
                                        m.getMarks4() +
                                        m.getMarks5();

                        // Calculate percentage

                        double percentage = total / 5.0;

                        // Calculate result

                        String result = "Pass";

                        if (m.getMarks1() < 40 ||
                                        m.getMarks2() < 40 ||
                                        m.getMarks3() < 40 ||
                                        m.getMarks4() < 40 ||
                                        m.getMarks5() < 40) {

                                result = "Fail";
                        }

                        json.append("{")

                                        .append("\"rollno\":\"")
                                        .append(ApiUtil.escape(m.getRollno()))
                                        .append("\",")

                                        .append("\"semester\":\"")
                                        .append(ApiUtil.escape(m.getSemester()))
                                        .append("\",")

                                        .append("\"subject1\":\"")
                                        .append(ApiUtil.escape(m.getSubject1()))
                                        .append("\",")

                                        .append("\"marks1\":")
                                        .append(m.getMarks1())
                                        .append(",")

                                        .append("\"subject2\":\"")
                                        .append(ApiUtil.escape(m.getSubject2()))
                                        .append("\",")

                                        .append("\"marks2\":")
                                        .append(m.getMarks2())
                                        .append(",")

                                        .append("\"subject3\":\"")
                                        .append(ApiUtil.escape(m.getSubject3()))
                                        .append("\",")

                                        .append("\"marks3\":")
                                        .append(m.getMarks3())
                                        .append(",")

                                        .append("\"subject4\":\"")
                                        .append(ApiUtil.escape(m.getSubject4()))
                                        .append("\",")

                                        .append("\"marks4\":")
                                        .append(m.getMarks4())
                                        .append(",")

                                        .append("\"subject5\":\"")
                                        .append(ApiUtil.escape(m.getSubject5()))
                                        .append("\",")

                                        .append("\"marks5\":")
                                        .append(m.getMarks5())
                                        .append(",")

                                        .append("\"total\":")
                                        .append(total)
                                        .append(",")

                                        .append("\"percentage\":")
                                        .append(percentage)
                                        .append(",")

                                        .append("\"result\":\"")
                                        .append(result)
                                        .append("\"")

                                        .append("}");

                        if (i < marksList.size() - 1) {

                                json.append(",");
                        }
                }

                json.append("]");

                ApiUtil.sendJson(
                                exchange,
                                200,
                                json.toString());

        }

        // =====================================
        // VALIDATE MARKS
        // =====================================

        private boolean validMarks(Marks m) {

                return m.getMarks1() >= 0 &&
                                m.getMarks1() <= 100 &&

                                m.getMarks2() >= 0 &&
                                m.getMarks2() <= 100 &&

                                m.getMarks3() >= 0 &&
                                m.getMarks3() <= 100 &&

                                m.getMarks4() >= 0 &&
                                m.getMarks4() <= 100 &&

                                m.getMarks5() >= 0 &&
                                m.getMarks5() <= 100;
        }
}