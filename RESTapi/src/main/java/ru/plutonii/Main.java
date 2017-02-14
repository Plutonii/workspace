package ru.plutonii;

import javafx.application.Application;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import ru.plutonii.dao.TokenDAO;
import ru.plutonii.model.Token;
import ru.plutonii.model.User;
import ru.plutonii.service.UserAccessService;

/**
 * Created by plutonii on 14.02.17.
 */
public class Main {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        TokenDAO tokenDAO = (TokenDAO) applicationContext.getBean("tokenDAO");
        UserAccessService userAccessService = (UserAccessService) applicationContext.getBean("userAccessService");
        User user = new User();
        user.setId(22);
        Token token = tokenDAO.findByUserId(user.getId());
        System.out.println(token);
        tokenDAO.delete(token);

    }
}
