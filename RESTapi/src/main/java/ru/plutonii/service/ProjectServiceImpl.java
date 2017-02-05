package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.ProjectDAO;
import ru.plutonii.model.Project;

import java.util.List;

/**
 * Created by plutonii on 05.02.17.
 */
@Service
public class ProjectServiceImpl implements ProjectService{

    private ProjectDAO projectDAO;

    @Autowired
    public ProjectServiceImpl(ProjectDAO projectDAO){
        this.projectDAO = projectDAO;
    }


    public Project insert(Project project) {
        return projectDAO.insert(project);
    }

    public Project update(Project project) {
        //можно добавить проверку id, существует ли в базе проект
        return projectDAO.insert(project);
    }

    public void delete(int id) {
        projectDAO.delete(findById(id));
    }

    public Project findById(int id) {
        return projectDAO.findById(id);
    }

    public List<Project> findByUserId(int id) {
        return projectDAO.findByUserId(id);
    }
}
