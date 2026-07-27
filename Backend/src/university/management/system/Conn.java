package university.management.system;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class Conn {

    public Connection c;
    public Statement s;

    public Conn() {

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            // Get Render environment variables
            String dbUrl = System.getenv("DB_URL");
            String dbUser = System.getenv("DB_USER");
            String dbPassword = System.getenv("DB_PASSWORD");

            // Local development fallback
            if (dbUrl == null || dbUrl.isBlank()) {

                dbUrl =
                    "jdbc:mysql://localhost:3306/universitymanagementsystem"
                    + "?useSSL=false"
                    + "&allowPublicKeyRetrieval=true"
                    + "&serverTimezone=UTC";

                System.out.println(
                    "DB_URL not found. Using local MySQL."
                );
            }

            if (dbUser == null || dbUser.isBlank()) {
                dbUser = "root";
            }

            if (dbPassword == null) {
                dbPassword = "";
            }

            // Connect ONLY ONCE
            c = DriverManager.getConnection(
                    dbUrl,
                    dbUser,
                    dbPassword
            );

            s = c.createStatement();

            System.out.println(
                    "MySQL Connected Successfully"
            );

            System.out.println(
                    "Database: " + c.getCatalog()
            );

        } catch (Exception e) {

            System.out.println(
                    "MySQL Connection Failed"
            );

            e.printStackTrace();

            c = null;
            s = null;
        }
    }
}