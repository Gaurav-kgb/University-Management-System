package university.management.system.dao;

import university.management.system.Conn;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class LoginDAO {

    public boolean validateLogin(String username, String password) {

        String sql =
                "SELECT * FROM login WHERE username = ? AND password = ?";

        try {

            Conn conn = new Conn();

            if (conn.c == null) {
                System.out.println("Database connection failed.");
                return false;
            }

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, username);
            ps.setString(2, password);

            ResultSet rs = ps.executeQuery();

            boolean valid = rs.next();

            rs.close();
            ps.close();
            conn.c.close();

            return valid;

        } catch (Exception e) {

            System.out.println("Login validation failed:");
            e.printStackTrace();

            return false;
        }
    }
}