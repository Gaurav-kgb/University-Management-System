package university.management.system.model;

public class TeacherLeave {

    private String employeeId;
    private String teacherName;
    private String department;
    private String leaveType;
    private String fromDate;
    private String toDate;
    private String reason;

    public TeacherLeave() {
    }

    public TeacherLeave(
            String employeeId,
            String teacherName,
            String department,
            String leaveType,
            String fromDate,
            String toDate,
            String reason) {

        this.employeeId = employeeId;
        this.teacherName = teacherName;
        this.department = department;
        this.leaveType = leaveType;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.reason = reason;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}