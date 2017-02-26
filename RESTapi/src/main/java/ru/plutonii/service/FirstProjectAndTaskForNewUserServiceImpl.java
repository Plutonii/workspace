package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.model.Project;
import ru.plutonii.model.Task;
import ru.plutonii.model.User;

/**
 * Created by plutonii on 26.02.17.
 */
@Service
public class FirstProjectAndTaskForNewUserServiceImpl implements FirstProjectAndTaskForNewUserService {
    private ProjectService projectService;
    private TaskService taskService;

    @Autowired
    public FirstProjectAndTaskForNewUserServiceImpl(ProjectService projectService, TaskService taskService) {
        this.projectService = projectService;
        this.taskService = taskService;
    }

    public Project addFirstProjectForUser(User user) {
        Project project = new Project();
        project.setTitle("Первый проект");
        project.setDescription("Это ваш первый проект. Он содержит одну задачу и одного пользователя (вас). В этом проекте вы администратор. Создан автоматически.");
        project.setUserId(user.getId());
        projectService.insert(project);
        return project;
    }

    public Task addFirstTaskForProject(Project project) {
        Task task = new Task();
        task.setTitle("Ваша первая задача");
        task.setDescription("Сделайте задачу \"завершенной\".");
        task.setCompleted(false);
        task.setProjectId(project.getId());
        task.setMakerId(project.getUserId());
        taskService.insert(task);
        return task;
    }
}
