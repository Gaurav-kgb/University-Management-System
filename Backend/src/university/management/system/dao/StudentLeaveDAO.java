package university.management.system.dao;

import university.management.system.Conn;
import university.management.system.model.StudentLeave;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentLeaveDAO {

    // ==========================
    // INSERT
    // ==========================

    public boolean addLeave(StudentLeave leave) {

        String sql = """
            INSERT INTO studentleave
            (rollno, name, course, branch,
             leaveType, fromDate, toDate, reason)
            VALUES (?,?,?,?,?,?,?,?)
            """;

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, leave.getRollno());
            ps.setString(2, leave.getName());
            ps.setString(3, leave.getCourse());
            ps.setString(4, leave.getBranch());
            ps.setString(5, leave.getLeaveType());
            ps.setString(6, leave.getFromDate());
            ps.setString(7, leave.getToDate());
            ps.setString(8, leave.getReason());

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }

    // ==========================
    // SELECT
    // ==========================

    public List<StudentLeave> getAllLeaves() {

        List<StudentLeave> list = new ArrayList<>();

        String sql = "SELECT * FROM studentleave ORDER BY id DESC";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                StudentLeave leave =
                        new StudentLeave();

                leave.setId(rs.getInt("id"));
                leave.setRollno(rs.getString("rollno"));
                leave.setName(rs.getString("name"));
                leave.setCourse(rs.getString("course"));
                leave.setBranch(rs.getString("branch"));
                leave.setLeaveType(rs.getString("leaveType"));
                leave.setFromDate(rs.getString("fromDate"));
                leave.setToDate(rs.getString("toDate"));
                leave.setReason(rs.getString("reason"));

                list.add(leave);
            }

        } catch (Exception e) {

            e.printStackTrace();
        }

        return list;
    }

    // ==========================
    // DELETE
    // ==========================

    public boolean deleteLeave(int id) {

        String sql =
                "DELETE FROM studentleave WHERE id=?";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setInt(1, id);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {

            e.printStackTrace();
            return false;
        }
    }
}