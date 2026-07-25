package university.management.system.model;

public class Fee {

    private String course;
    private String semester1;
    private String semester2;
    private String semester3;
    private String semester4;
    private String semester5;
    private String semester6;
    private String semester7;
    private String semester8;

    public Fee() {
    }

    public Fee(
            String course,
            String semester1,
            String semester2,
            String semester3,
            String semester4,
            String semester5,
            String semester6,
            String semester7,
            String semester8) {

        this.course = course;
        this.semester1 = semester1;
        this.semester2 = semester2;
        this.semester3 = semester3;
        this.semester4 = semester4;
        this.semester5 = semester5;
        this.semester6 = semester6;
        this.semester7 = semester7;
        this.semester8 = semester8;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getSemester1() {
        return semester1;
    }

    public void setSemester1(String semester1) {
        this.semester1 = semester1;
    }

    public String getSemester2() {
        return semester2;
    }

    public void setSemester2(String semester2) {
        this.semester2 = semester2;
    }

    public String getSemester3() {
        return semester3;
    }

    public void setSemester3(String semester3) {
        this.semester3 = semester3;
    }

    public String getSemester4() {
        return semester4;
    }

    public void setSemester4(String semester4) {
        this.semester4 = semester4;
    }

    public String getSemester5() {
        return semester5;
    }

    public void setSemester5(String semester5) {
        this.semester5 = semester5;
    }

    public String getSemester6() {
        return semester6;
    }

    public void setSemester6(String semester6) {
        this.semester6 = semester6;
    }

    public String getSemester7() {
        return semester7;
    }

    public void setSemester7(String semester7) {
        this.semester7 = semester7;
    }

    public String getSemester8() {
        return semester8;
    }

    public void setSemester8(String semester8) {
        this.semester8 = semester8;
    }
}