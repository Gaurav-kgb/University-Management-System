package university.management.system.api;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import university.management.system.dao.FeeDAO;
import university.management.system.model.Fee;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class FeeHandler implements HttpHandler {

    private final FeeDAO dao = new FeeDAO();

    @Override
    public void handle(HttpExchange exchange)
            throws IOException {

        // ============================
        // CORS
        // ============================

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

        if ("GET".equalsIgnoreCase(method)) {

            getAllFees(exchange);
            return;
        }

        if ("POST".equalsIgnoreCase(method)) {

            addFee(exchange);
            return;
        }

        ApiUtil.sendJson(
                exchange,
                405,
                "{\"success\":false,\"message\":\"Method not allowed\"}"
        );
    }


    // =========================================
    // GET
    // =========================================

    private void getAllFees(
            HttpExchange exchange)
            throws IOException {

        List<Fee> fees =
                dao.getAllFees();

        StringBuilder json =
                new StringBuilder("[");

        for (int i = 0; i < fees.size(); i++) {

            Fee f = fees.get(i);

            json.append("{")

                    .append("\"course\":\"")
                    .append(ApiUtil.escape(f.getCourse()))
                    .append("\",")

                    .append("\"semester1\":\"")
                    .append(ApiUtil.escape(f.getSemester1()))
                    .append("\",")

                    .append("\"semester2\":\"")
                    .append(ApiUtil.escape(f.getSemester2()))
                    .append("\",")

                    .append("\"semester3\":\"")
                    .append(ApiUtil.escape(f.getSemester3()))
                    .append("\",")

                    .append("\"semester4\":\"")
                    .append(ApiUtil.escape(f.getSemester4()))
                    .append("\",")

                    .append("\"semester5\":\"")
                    .append(ApiUtil.escape(f.getSemester5()))
                    .append("\",")

                    .append("\"semester6\":\"")
                    .append(ApiUtil.escape(f.getSemester6()))
                    .append("\",")

                    .append("\"semester7\":\"")
                    .append(ApiUtil.escape(f.getSemester7()))
                    .append("\",")

                    .append("\"semester8\":\"")
                    .append(ApiUtil.escape(f.getSemester8()))
                    .append("\"")

                    .append("}");

            if (i < fees.size() - 1) {
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
    // POST
    // =========================================

    private void addFee(
            HttpExchange exchange)
            throws IOException {

        String body = new String(
                exchange
                        .getRequestBody()
                        .readAllBytes(),
                StandardCharsets.UTF_8
        );

        try {

            Fee fee = new Fee();

            fee.setCourse(
                    ApiUtil.getJsonValue(
                            body,
                            "course"
                    )
            );

            fee.setSemester1(
                    ApiUtil.getJsonValue(
                            body,
                            "semester1"
                    )
            );

            fee.setSemester2(
                    ApiUtil.getJsonValue(
                            body,
                            "semester2"
                    )
            );

            fee.setSemester3(
                    ApiUtil.getJsonValue(
                            body,
                            "semester3"
                    )
            );

            fee.setSemester4(
                    ApiUtil.getJsonValue(
                            body,
                            "semester4"
                    )
            );

            fee.setSemester5(
                    ApiUtil.getJsonValue(
                            body,
                            "semester5"
                    )
            );

            fee.setSemester6(
                    ApiUtil.getJsonValue(
                            body,
                            "semester6"
                    )
            );

            fee.setSemester7(
                    ApiUtil.getJsonValue(
                            body,
                            "semester7"
                    )
            );

            fee.setSemester8(
                    ApiUtil.getJsonValue(
                            body,
                            "semester8"
                    )
            );


            if (fee.getCourse() == null ||
                    fee.getCourse().trim().isEmpty()) {

                ApiUtil.sendJson(
                        exchange,
                        400,
                        "{\"success\":false,\"message\":\"Course is required\"}"
                );

                return;
            }


            boolean success =
                    dao.addFee(fee);

            if (success) {

                ApiUtil.sendJson(
                        exchange,
                        201,
                        "{\"success\":true,\"message\":\"Fee structure added successfully\"}"
                );

            } else {

                ApiUtil.sendJson(
                        exchange,
                        500,
                        "{\"success\":false,\"message\":\"Unable to add fee structure\"}"
                );
            }

        } catch (Exception e) {

            e.printStackTrace();

            ApiUtil.sendJson(
                    exchange,
                    500,
                    "{\"success\":false,\"message\":\"Server error\"}"
            );
        }
    }
}