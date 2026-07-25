package university.management.system;

public class DatabaseTest {

    public static void main(String[] args) {

        Conn conn = new Conn();

        if (conn.c != null) {
            System.out.println("------------------------------");
            System.out.println("DATABASE CONNECTION SUCCESSFUL");
            System.out.println("------------------------------");
        } else {
            System.out.println("------------------------------");
            System.out.println("DATABASE CONNECTION FAILED");
            System.out.println("------------------------------");
        }
    }
}