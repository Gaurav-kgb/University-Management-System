package university.management.system.dao;

import university.management.system.Conn;
import university.management.system.model.TeacherLeave;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TeacherLeaveDAO {

    public boolean addLeave(TeacherLeave leave) {

        String sql =
                "INSERT INTO teacherleave " +
                "(employeeId, teacherName, department, leaveType, " +
                "fromDate, toDate, reason) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, leave.getEmployeeId());
            ps.setString(2, leave.getTeacherName());
            ps.setString(3, leave.getDepartment());
            ps.setString(4, leave.getLeaveType());
            ps.setString(5, leave.getFromDate());
            ps.setString(6, leave.getToDate());
            ps.setString(7, leave.getReason());

            int rows = ps.executeUpdate();

            ps.close();

            return rows > 0;

        } catch (Exception e) {

            System.out.println(
                    "Error adding teacher leave:"
            );

            e.printStackTrace();

            return false;
        }
    }

    public List<TeacherLeave> getAllLeaves() {

        List<TeacherLeave> leaves =
                new ArrayList<>();

        String sql =
                "SELECT * FROM teacherleave " +
                "ORDER BY fromDate DESC";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ResultSet rs =
                    ps.executeQuery();

            while (rs.next()) {

                TeacherLeave leave =
                        new TeacherLeave();

                leave.setEmployeeId(
                        rs.getString("employeeId"));

                leave.setTeacherName(
                        rs.getString("teacherName"));

                leave.setDepartment(
                        rs.getString("department"));

                leave.setLeaveType(
                        rs.getString("leaveType"));

                leave.setFromDate(
                        rs.getString("fromDate"));

                leave.setToDate(
                        rs.getString("toDate"));

                leave.setReason(
                        rs.getString("reason"));

                leaves.add(leave);
            }

            rs.close();
            ps.close();

        } catch (Exception e) {

            System.out.println(
                    "Error loading teacher leaves:"
            );

            e.printStackTrace();
        }

        return leaves;
    }
}