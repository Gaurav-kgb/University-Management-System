package university.management.system.model;

public class Student {

    private String name;
    private String fname;
    private String rollno;
    private String dob;
    private String address;
    private String phone;
    private String email;
    private String x;
    private String xii;
    private String aadhar;
    private String course;
    private String branch;

    public Student() {
    }

    public Student(
            String name,
            String fname,
            String rollno,
            String dob,
            String address,
            String phone,
            String email,
            String x,
            String xii,
            String aadhar,
            String course,
            String branch) {

        this.name = name;
        this.fname = fname;
        this.rollno = rollno;
        this.dob = dob;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.x = x;
        this.xii = xii;
        this.aadhar = aadhar;
        this.course = course;
        this.branch = branch;
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

    public String getRollno() {
        return rollno;
    }

    public void setRollno(String rollno) {
        this.rollno = rollno;
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

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getXii() {
        return xii;
    }

    public void setXii(String xii) {
        this.xii = xii;
    }

    public String getAadhar() {
        return aadhar;
    }

    public void setAadhar(String aadhar) {
        this.aadhar = aadhar;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
}