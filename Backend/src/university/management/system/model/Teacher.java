package university.management.system.model;

public class Teacher {

    private String name;
    private String fname;
    private String empId;
    private String dob;
    private String address;
    private String phone;
    private String email;
    private String class_x;
    private String class_xii;
    private String aadhar;
    private String education;
    private String department;

    public Teacher() {
    }

    public Teacher(
            String name,
            String fname,
            String empId,
            String dob,
            String address,
            String phone,
            String email,
            String class_x,
            String class_xii,
            String aadhar,
            String education,
            String department) {

        this.name = name;
        this.fname = fname;
        this.empId = empId;
        this.dob = dob;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.class_x = class_x;
        this.class_xii = class_xii;
        this.aadhar = aadhar;
        this.education = education;
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getClass_x() {
        return class_x;
    }

    public void setClass_x(String class_x) {
        this.class_x = class_x;
    }

    public String getClass_xii() {
        return class_xii;
    }

    public void setClass_xii(String class_xii) {
        this.class_xii = class_xii;
    }

    public String getAadhar() {
        return aadhar;
    }

    public void setAadhar(String aadhar) {
        this.aadhar = aadhar;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}