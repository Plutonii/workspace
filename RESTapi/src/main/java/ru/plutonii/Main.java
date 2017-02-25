package ru.plutonii;

import javafx.application.Application;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import ru.plutonii.dao.TaskDAO;
import ru.plutonii.dao.TokenDAO;
import ru.plutonii.model.Project;
import ru.plutonii.model.Task;
import ru.plutonii.model.Token;
import ru.plutonii.model.User;
import ru.plutonii.service.ProjectService;
import ru.plutonii.service.UserAccessService;

/**
 * Created by plutonii on 14.02.17.
 */
public class Main {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        //delete this class before production
    }
}
