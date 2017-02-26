package ru.plutonii.service;

import ru.plutonii.model.Project;
import ru.plutonii.model.Task;
import ru.plutonii.model.User;

/**
 * Created by plutonii on 26.02.17.
 */
public interface FirstProjectAndTaskForNewUserService {

    public Project addFirstProjectForUser(User user);

    public Task addFirstTaskForProject(Project project);
}
