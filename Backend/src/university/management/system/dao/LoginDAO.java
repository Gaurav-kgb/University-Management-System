package university.management.system.dao;

import university.management.system.Conn;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class LoginDAO {

   public boolean validateLogin(String username, String password) {

    String sql =
            "SELECT * FROM login WHERE username = ? AND password = ?";

    try {

        System.out.println("Checking login for username: [" + username + "]");
        System.out.println("Password length: " + password.length());

        Conn conn = new Conn();

        if (conn.c == null) {
            System.out.println("DATABASE CONNECTION IS NULL");
            return false;
        }

        System.out.println("Database connection successful");

        PreparedStatement ps =
                conn.c.prepareStatement(sql);

        ps.setString(1, username.trim());
        ps.setString(2, password);

        ResultSet rs = ps.executeQuery();

        boolean valid = rs.next();

        System.out.println("Login result: " + valid);

        rs.close();
        ps.close();
        conn.c.close();

        return valid;

    } catch (Exception e) {

        System.out.println("LOGIN DATABASE ERROR:");
        e.printStackTrace();

        return false;
    }
}
}