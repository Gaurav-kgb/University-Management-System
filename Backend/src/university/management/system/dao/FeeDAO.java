package university.management.system.dao;

import university.management.system.Conn;
import university.management.system.model.Fee;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class FeeDAO {

    // =========================================
    // GET ALL FEE STRUCTURES
    // =========================================

    public List<Fee> getAllFees() {

        List<Fee> list = new ArrayList<>();

        String sql = "SELECT * FROM fee ORDER BY course";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ResultSet rs = ps.executeQuery();

            while (rs.next()) {

                Fee fee = new Fee();

                fee.setCourse(
                        rs.getString("course")
                );

                fee.setSemester1(
                        rs.getString("semester1")
                );

                fee.setSemester2(
                        rs.getString("semester2")
                );

                fee.setSemester3(
                        rs.getString("semester3")
                );

                fee.setSemester4(
                        rs.getString("semester4")
                );

                fee.setSemester5(
                        rs.getString("semester5")
                );

                fee.setSemester6(
                        rs.getString("semester6")
                );

                fee.setSemester7(
                        rs.getString("semester7")
                );

                fee.setSemester8(
                        rs.getString("semester8")
                );

                list.add(fee);
            }

            rs.close();
            ps.close();

        } catch (Exception e) {

            System.out.println(
                    "Error while fetching fee structure:"
            );

            e.printStackTrace();
        }

        return list;
    }


    // =========================================
    // ADD FEE STRUCTURE
    // =========================================

    public boolean addFee(Fee fee) {

        String sql =
                "INSERT INTO fee " +
                "(course, semester1, semester2, semester3, " +
                "semester4, semester5, semester6, semester7, semester8) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, fee.getCourse());
            ps.setString(2, fee.getSemester1());
            ps.setString(3, fee.getSemester2());
            ps.setString(4, fee.getSemester3());
            ps.setString(5, fee.getSemester4());
            ps.setString(6, fee.getSemester5());
            ps.setString(7, fee.getSemester6());
            ps.setString(8, fee.getSemester7());
            ps.setString(9, fee.getSemester8());

            int rows = ps.executeUpdate();

            ps.close();

            return rows > 0;

        } catch (Exception e) {

            System.out.println(
                    "Error while adding fee structure:"
            );

            e.printStackTrace();

            return false;
        }
    }


    // =========================================
    // FIND FEE BY COURSE
    // =========================================

    public Fee getFeeByCourse(String course) {

        String sql =
                "SELECT * FROM fee WHERE course = ?";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, course);

            ResultSet rs = ps.executeQuery();

            if (rs.next()) {

                Fee fee = new Fee();

                fee.setCourse(rs.getString("course"));
                fee.setSemester1(rs.getString("semester1"));
                fee.setSemester2(rs.getString("semester2"));
                fee.setSemester3(rs.getString("semester3"));
                fee.setSemester4(rs.getString("semester4"));
                fee.setSemester5(rs.getString("semester5"));
                fee.setSemester6(rs.getString("semester6"));
                fee.setSemester7(rs.getString("semester7"));
                fee.setSemester8(rs.getString("semester8"));

                rs.close();
                ps.close();

                return fee;
            }

            rs.close();
            ps.close();

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }
}