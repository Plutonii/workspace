package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.TeamDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.model.*;

/**
 * Created by plutonii on 26.02.17.
 */
@Service
public class LearnNewUserServiceImpl implements LearnNewUserService {
    private ProjectService projectService;
    private TaskService taskService;
    private UserDAO userDAO;
    private TeamDAO teamDAO;
    private ContactService contactService;

    private final int ID_BOT = 3;

    @Autowired
    public LearnNewUserServiceImpl(ProjectService projectService,
                                   TaskService taskService,
                                   UserDAO userDAO,
                                   TeamDAO teamDAO, ContactService contactService) {
        this.projectService = projectService;
        this.taskService = taskService;
        this.userDAO = userDAO;
        this.teamDAO = teamDAO;
        this.contactService = contactService;
    }

    public void learn(User user){
        this.addTasksForFirstProject(this.addFirstProjectForUser(user));
        this.addContact(user);
    }

    private void addContact(User user){
        Contact contact = new Contact();
        contact.setContact(new User(ID_BOT));
        contact.setUserId(user.getId());
        this.contactService.addContact(contact);
    }

    private Project addFirstProjectForUser(User user) {
        Project project = new Project();
        project.setTitle("Первый проект");
        project.setDescription("Это ваш первый проект, в котором вы являетесь " +
                "администратором. Для открытия проекта щелкните по его названию");
        project.setUser(user);
        projectService.addNewProject(project);
        this.addUserBotToProject(project);
        return project;
    }

    private void addTasksForFirstProject(Project project) {
        Task task1 = new Task();
        task1.setTitle("Задача номер Раз");
        task1.setDescription("Чужая выполненная задача");
        task1.setCompleted(true);
        task1.setProjectId(project.getId());
        task1.setUser(userDAO.findById(ID_BOT));
        taskService.insert(task1);

        Task task2 = new Task();
        task2.setTitle("Задача номер Два");
        task2.setDescription("Это ваша задача (вы за ней закреплены)" +
                ". Сделайте задачу \"выполненной\"(с помощью меню в" +
                "правом верхнем углу текущего окна)");
        task2.setCompleted(false);
        task2.setProjectId(project.getId());
        task2.setUser(project.getUser());
        taskService.insert(task2);

        Task task3 = new Task();
        task3.setTitle("Задача номер Три");
        task3.setDescription("Это свободная задача. Закрепитесь за ней и" +
                "выполните её");
        task3.setCompleted(false);
        task3.setProjectId(project.getId());
        taskService.insert(task3);
    }

    private Team addUserBotToProject(Project project){
        Team team = new Team();
        team.setProjectId(project.getId());
        team.setUser(userDAO.findById(ID_BOT));
        teamDAO.insert(team);
        return team;
    }

}
