package university.management.system.dao;

import university.management.system.Conn;
import university.management.system.model.Student;

import java.sql.PreparedStatement;

public class StudentDAO {

    public boolean addStudent(Student student) {

        String sql =
                "INSERT INTO student " +
                "(name, fname, rollno, dob, address, phone, email, class_x, class_xii, aadhar, course, branch) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, student.getName());
            ps.setString(2, student.getFname());
            ps.setString(3, student.getRollno());
            ps.setString(4, student.getDob());
            ps.setString(5, student.getAddress());
            ps.setString(6, student.getPhone());
            ps.setString(7, student.getEmail());

            // MySQL class_x
            ps.setString(8, student.getX());

            // MySQL class_xii
            ps.setString(9, student.getXii());

            ps.setString(10, student.getAadhar());
            ps.setString(11, student.getCourse());
            ps.setString(12, student.getBranch());

            int rows = ps.executeUpdate();

            ps.close();
            conn.c.close();

            return rows > 0;

        } catch (Exception e) {

            System.out.println("Failed to insert student:");
            e.printStackTrace();

            return false;
        }
    }
}