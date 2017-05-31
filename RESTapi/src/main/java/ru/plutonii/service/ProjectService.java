package ru.plutonii.service;

import ru.plutonii.model.Project;

import java.util.List;

/**
 * Created by plutonii on 05.02.17.
 */
public interface ProjectService {
    Project addNewProject(Project project);
    Project update(Project project);
    void delete(int id);
    Project findById(int id);
    List<Project> findByUserId(int id);
    List<Project> findAllProjectsByUserId(int id);
}
