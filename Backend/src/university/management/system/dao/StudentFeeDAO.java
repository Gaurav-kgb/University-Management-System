package university.management.system.dao;

import university.management.system.Conn;
import university.management.system.model.StudentFee;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class StudentFeeDAO {

    // =====================================
    // RECORD PAYMENT
    // =====================================

    public boolean addPayment(StudentFee fee) {

        String sql =
                "INSERT INTO studentfee " +
                "(rollno, studentName, course, semester, amount, " +
                "paymentMode, paymentDate, transactionId, status) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, fee.getRollno());
            ps.setString(2, fee.getStudentName());
            ps.setString(3, fee.getCourse());
            ps.setString(4, fee.getSemester());
            ps.setDouble(5, fee.getAmount());
            ps.setString(6, fee.getPaymentMode());
            ps.setString(7, fee.getPaymentDate());
            ps.setString(8, fee.getTransactionId());
            ps.setString(9, fee.getStatus());

            int rows = ps.executeUpdate();

            ps.close();

            return rows > 0;

        } catch (Exception e) {

            System.out.println("Error recording payment:");
            e.printStackTrace();

            return false;
        }
    }


    // =====================================
    // GET ALL PAYMENTS
    // =====================================

    public List<StudentFee> getAllPayments() {

        List<StudentFee> list =
                new ArrayList<>();

        String sql =
                "SELECT * FROM studentfee " +
                "ORDER BY paymentId DESC";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ResultSet rs =
                    ps.executeQuery();

            while (rs.next()) {

                StudentFee fee =
                        new StudentFee();

                fee.setPaymentId(
                        rs.getInt("paymentId"));

                fee.setRollno(
                        rs.getString("rollno"));

                fee.setStudentName(
                        rs.getString("studentName"));

                fee.setCourse(
                        rs.getString("course"));

                fee.setSemester(
                        rs.getString("semester"));

                fee.setAmount(
                        rs.getDouble("amount"));

                fee.setPaymentMode(
                        rs.getString("paymentMode"));

                fee.setPaymentDate(
                        rs.getString("paymentDate"));

                fee.setTransactionId(
                        rs.getString("transactionId"));

                fee.setStatus(
                        rs.getString("status"));

                list.add(fee);
            }

            rs.close();
            ps.close();

        } catch (Exception e) {

            e.printStackTrace();
        }

        return list;
    }
}