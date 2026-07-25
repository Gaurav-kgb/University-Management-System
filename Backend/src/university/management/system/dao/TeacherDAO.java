package university.management.system.dao;

import university.management.system.Conn;
import university.management.system.model.Teacher;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class TeacherDAO {

    // =========================================
    // ADD TEACHER
    // =========================================

    public boolean addTeacher(Teacher teacher) {

        String sql =
                "INSERT INTO teacher " +
                "(name, fname, empId, dob, address, phone, email, " +
                "class_x, class_xii, aadhar, education, department) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, teacher.getName());
            ps.setString(2, teacher.getFname());
            ps.setString(3, teacher.getEmpId());
            ps.setString(4, teacher.getDob());
            ps.setString(5, teacher.getAddress());
            ps.setString(6, teacher.getPhone());
            ps.setString(7, teacher.getEmail());
            ps.setString(8, teacher.getClass_x());
            ps.setString(9, teacher.getClass_xii());
            ps.setString(10, teacher.getAadhar());
            ps.setString(11, teacher.getEducation());
            ps.setString(12, teacher.getDepartment());

            int rows = ps.executeUpdate();

            ps.close();

            return rows > 0;

        } catch (Exception e) {

            System.out.println("Error adding teacher:");
            e.printStackTrace();

            return false;
        }
    }


    // =========================================
    // GET ALL TEACHERS
    // =========================================

    public List<Teacher> getAllTeachers() {

        List<Teacher> teachers =
                new ArrayList<>();

        String sql =
                "SELECT * FROM teacher ORDER BY name";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ResultSet rs =
                    ps.executeQuery();

            while (rs.next()) {

                Teacher teacher =
                        new Teacher();

                teacher.setName(
                        rs.getString("name"));

                teacher.setFname(
                        rs.getString("fname"));

                teacher.setEmpId(
                        rs.getString("empId"));

                teacher.setDob(
                        rs.getString("dob"));

                teacher.setAddress(
                        rs.getString("address"));

                teacher.setPhone(
                        rs.getString("phone"));

                teacher.setEmail(
                        rs.getString("email"));

                teacher.setClass_x(
                        rs.getString("class_x"));

                teacher.setClass_xii(
                        rs.getString("class_xii"));

                teacher.setAadhar(
                        rs.getString("aadhar"));

                teacher.setEducation(
                        rs.getString("education"));

                teacher.setDepartment(
                        rs.getString("department"));

                teachers.add(teacher);
            }

            rs.close();
            ps.close();

        } catch (Exception e) {

            System.out.println(
                    "Error fetching teachers:"
            );

            e.printStackTrace();
        }

        return teachers;
    }


    // =========================================
    // GET TEACHER BY EMPLOYEE ID
    // =========================================

    public Teacher getTeacherByEmpId(
            String empId) {

        String sql =
                "SELECT * FROM teacher WHERE empId = ?";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, empId);

            ResultSet rs =
                    ps.executeQuery();

            if (rs.next()) {

                Teacher teacher =
                        new Teacher();

                teacher.setName(
                        rs.getString("name"));

                teacher.setFname(
                        rs.getString("fname"));

                teacher.setEmpId(
                        rs.getString("empId"));

                teacher.setDob(
                        rs.getString("dob"));

                teacher.setAddress(
                        rs.getString("address"));

                teacher.setPhone(
                        rs.getString("phone"));

                teacher.setEmail(
                        rs.getString("email"));

                teacher.setClass_x(
                        rs.getString("class_x"));

                teacher.setClass_xii(
                        rs.getString("class_xii"));

                teacher.setAadhar(
                        rs.getString("aadhar"));

                teacher.setEducation(
                        rs.getString("education"));

                teacher.setDepartment(
                        rs.getString("department"));

                rs.close();
                ps.close();

                return teacher;
            }

            rs.close();
            ps.close();

        } catch (Exception e) {

            e.printStackTrace();
        }

        return null;
    }


    // =========================================
    // DELETE TEACHER
    // =========================================

    public boolean deleteTeacher(
            String empId) {

        String sql =
                "DELETE FROM teacher WHERE empId = ?";

        try {

            Conn conn = new Conn();

            PreparedStatement ps =
                    conn.c.prepareStatement(sql);

            ps.setString(1, empId);

            int rows =
                    ps.executeUpdate();

            ps.close();

            return rows > 0;

        } catch (Exception e) {

            System.out.println(
                    "Error deleting teacher:"
            );

            e.printStackTrace();

            return false;
        }
    }
}