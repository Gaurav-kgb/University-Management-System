package university.management.system.dao;

public class LoginDAOTest {

    public static void main(String[] args) {

        LoginDAO loginDAO = new LoginDAO();

        boolean result = loginDAO.validateLogin(
                "YOUR_TEST_USERNAME",
                "YOUR_TEST_PASSWORD"
        );

        if (result) {
            System.out.println("------------------------");
            System.out.println("LOGIN SUCCESSFUL");
            System.out.println("------------------------");
        } else {
            System.out.println("------------------------");
            System.out.println("INVALID USERNAME/PASSWORD");
            System.out.println("------------------------");
        }
    }
}