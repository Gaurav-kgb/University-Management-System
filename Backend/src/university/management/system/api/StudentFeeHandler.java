package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import university.management.system.dao.StudentFeeDAO;
import university.management.system.model.StudentFee;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class StudentFeeHandler implements HttpHandler {

    private final StudentFeeDAO dao =
            new StudentFeeDAO();

    @Override
    public void handle(HttpExchange exchange)
            throws IOException {

        // CORS
        if ("OPTIONS".equalsIgnoreCase(
                exchange.getRequestMethod())) {

            ApiUtil.addCors(exchange);

            exchange.sendResponseHeaders(
                    204, -1);

            return;
        }

        String method =
                exchange.getRequestMethod();

        if ("POST".equalsIgnoreCase(method)) {

            addPayment(exchange);
            return;
        }

        if ("GET".equalsIgnoreCase(method)) {

            getPayments(exchange);
            return;
        }

        ApiUtil.sendJson(
                exchange,
                405,
                "{\"success\":false,\"message\":\"Method not allowed\"}"
        );
    }


    // ==================================
    // POST PAYMENT
    // ==================================

    private void addPayment(
            HttpExchange exchange)
            throws IOException {

        String body = new String(
                exchange.getRequestBody()
                        .readAllBytes(),
                StandardCharsets.UTF_8
        );

        try {

            StudentFee fee =
                    new StudentFee();

            fee.setRollno(
                    ApiUtil.getJsonValue(
                            body, "rollno"));

            fee.setStudentName(
                    ApiUtil.getJsonValue(
                            body, "studentName"));

            fee.setCourse(
                    ApiUtil.getJsonValue(
                            body, "course"));

            fee.setSemester(
                    ApiUtil.getJsonValue(
                            body, "semester"));

            String amount =
                    ApiUtil.getJsonValue(
                            body, "amount");

            fee.setAmount(
                    Double.parseDouble(amount));

            fee.setPaymentMode(
                    ApiUtil.getJsonValue(
                            body, "paymentMode"));

            fee.setPaymentDate(
                    ApiUtil.getJsonValue(
                            body, "paymentDate"));

            fee.setTransactionId(
                    ApiUtil.getJsonValue(
                            body, "transactionId"));

            fee.setStatus("Paid");


            if (fee.getRollno().isEmpty() ||
                    fee.getStudentName().isEmpty() ||
                    fee.getCourse().isEmpty() ||
                    fee.getSemester().isEmpty()) {

                ApiUtil.sendJson(
                        exchange,
                        400,
                        "{\"success\":false,\"message\":\"Required fields are missing\"}"
                );

                return;
            }


            if (fee.getAmount() <= 0) {

                ApiUtil.sendJson(
                        exchange,
                        400,
                        "{\"success\":false,\"message\":\"Invalid payment amount\"}"
                );

                return;
            }


            boolean success =
                    dao.addPayment(fee);

            if (success) {

                ApiUtil.sendJson(
                        exchange,
                        201,
                        "{\"success\":true,\"message\":\"Fee payment recorded successfully\"}"
                );

            } else {

                ApiUtil.sendJson(
                        exchange,
                        500,
                        "{\"success\":false,\"message\":\"Unable to record payment\"}"
                );
            }

        } catch (NumberFormatException e) {

            ApiUtil.sendJson(
                    exchange,
                    400,
                    "{\"success\":false,\"message\":\"Invalid fee amount\"}"
            );
        }
    }


    // ==================================
    // GET PAYMENTS
    // ==================================

    private void getPayments(
            HttpExchange exchange)
            throws IOException {

        List<StudentFee> payments =
                dao.getAllPayments();

        StringBuilder json =
                new StringBuilder("[");

        for (int i = 0;
             i < payments.size();
             i++) {

            StudentFee f =
                    payments.get(i);

            json.append("{")

                    .append("\"paymentId\":")
                    .append(f.getPaymentId())
                    .append(",")

                    .append("\"rollno\":\"")
                    .append(ApiUtil.escape(
                            f.getRollno()))
                    .append("\",")

                    .append("\"studentName\":\"")
                    .append(ApiUtil.escape(
                            f.getStudentName()))
                    .append("\",")

                    .append("\"course\":\"")
                    .append(ApiUtil.escape(
                            f.getCourse()))
                    .append("\",")

                    .append("\"semester\":\"")
                    .append(ApiUtil.escape(
                            f.getSemester()))
                    .append("\",")

                    .append("\"amount\":")
                    .append(f.getAmount())
                    .append(",")

                    .append("\"paymentMode\":\"")
                    .append(ApiUtil.escape(
                            f.getPaymentMode()))
                    .append("\",")

                    .append("\"paymentDate\":\"")
                    .append(ApiUtil.escape(
                            f.getPaymentDate()))
                    .append("\",")

                    .append("\"transactionId\":\"")
                    .append(ApiUtil.escape(
                            f.getTransactionId()))
                    .append("\",")

                    .append("\"status\":\"")
                    .append(ApiUtil.escape(
                            f.getStatus()))
                    .append("\"")

                    .append("}");

            if (i < payments.size() - 1) {
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