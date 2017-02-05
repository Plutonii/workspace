package ru.plutonii;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.model.User;

/**
 * Created by plutonii on 05.02.17.
 */
public class Test {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserDAO userDAO = (UserDAO) applicationContext.getBean("userDAO");
        User user = new User();
        user.setUsername("1234");
        user.setPassword("231");
    }
}
