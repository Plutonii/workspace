package ru.plutonii.service;

import ru.plutonii.model.Project;

import java.util.List;

/**
 * Created by plutonii on 05.02.17.
 */
public interface ProjectService {
    Project insert(Project project);
    Project update(Project project);
    void delete(int id);
    Project findById(int id);
    List<Project> findByUserId(int id);
}
