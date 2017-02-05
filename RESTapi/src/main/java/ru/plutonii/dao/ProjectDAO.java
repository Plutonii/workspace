package ru.plutonii.dao;

import ru.plutonii.model.Project;

import java.util.List;

/**
 * Created by plutonii on 05.02.17.
 */
public interface ProjectDAO {
    Project insert(Project project);
    void delete(Project project);
    Project findById(int id);
    List<Project> findByUserId(int id);
}
