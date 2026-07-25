package university.management.system.dao;

import university.management.system.Conn;
import university.management.system.model.Marks;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class MarksDAO {

    // =========================================
    // POST - ADD MARKS
    // =========================================

    public boolean addMarks(Marks marks) {

        String sql =
                "INSERT INTO marks " +
                "(rollno, semester, marks1, marks2, marks3, marks4, marks5) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, marks.getRollno());
            ps.setString(2, marks.getSemester());

            ps.setInt(3, marks.getMarks1());
            ps.setInt(4, marks.getMarks2());
            ps.setInt(5, marks.getMarks3());
            ps.setInt(6, marks.getMarks4());
            ps.setInt(7, marks.getMarks5());

            int rows = ps.executeUpdate();

            ps.close();

            return rows > 0;

        } catch (Exception e) {

            System.out.println("Error adding marks:");
            e.printStackTrace();

            return false;
        }
    }


    // =========================================
    // GET - MARKS + SUBJECT NAMES
    // =========================================

    public List<Marks> getAllMarks() {

        List<Marks> list = new ArrayList<>();

        String sql =
                "SELECT m.rollno, m.semester, " +
                "s.subject1, s.subject2, s.subject3, s.subject4, s.subject5, " +
                "m.marks1, m.marks2, m.marks3, m.marks4, m.marks5 " +
                "FROM marks m " +
                "LEFT JOIN subject s " +
                "ON m.rollno = s.rollno " +
                "AND m.semester = s.semester";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ResultSet rs =
                    ps.executeQuery();

            while (rs.next()) {

                Marks marks = new Marks();

                // Student
                marks.setRollno(
                        rs.getString("rollno")
                );

                marks.setSemester(
                        rs.getString("semester")
                );


                // Subjects
                marks.setSubject1(
                        rs.getString("subject1")
                );

                marks.setSubject2(
                        rs.getString("subject2")
                );

                marks.setSubject3(
                        rs.getString("subject3")
                );

                marks.setSubject4(
                        rs.getString("subject4")
                );

                marks.setSubject5(
                        rs.getString("subject5")
                );


                // Marks
                marks.setMarks1(
                        rs.getInt("marks1")
                );

                marks.setMarks2(
                        rs.getInt("marks2")
                );

                marks.setMarks3(
                        rs.getInt("marks3")
                );

                marks.setMarks4(
                        rs.getInt("marks4")
                );

                marks.setMarks5(
                        rs.getInt("marks5")
                );

                list.add(marks);
            }

            rs.close();
            ps.close();

        } catch (Exception e) {

            System.out.println("Error fetching marks:");

            e.printStackTrace();
        }

        return list;
    }
}