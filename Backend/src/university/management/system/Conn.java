package university.management.system;

import java.sql.*;

public class Conn {

    public Connection c;
    public Statement s;

    public Conn() {

        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            String dbUrl = System.getenv("DB_URL");
            String dbUser = System.getenv("DB_USER");
            String dbPassword = System.getenv("DB_PASSWORD");

            c = DriverManager.getConnection(
                    dbUrl,
                    dbUser,
                    dbPassword);

            // Local development fallback
            if (dbUrl == null || dbUrl.isBlank()) {
                dbUrl = "jdbc:mysql://localhost:3306/universitymanagementsystem";
            }

            if (dbUser == null || dbUser.isBlank()) {
                dbUser = "root";
            }

            if (dbPassword == null) {
                dbPassword = "";
            }

            c = DriverManager.getConnection(
                    dbUrl,
                    dbUser,
                    dbPassword);

            s = c.createStatement();

            System.out.println(
                    "MySQL Connected Successfully");

        } catch (Exception e) {

            System.out.println(
                    "MySQL Connection Failed");

            e.printStackTrace();
        }
    }
}