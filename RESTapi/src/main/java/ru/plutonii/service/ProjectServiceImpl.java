package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.ProjectDAO;
import ru.plutonii.dao.TeamDAO;
import ru.plutonii.model.Project;
import ru.plutonii.model.Team;

import java.util.List;

/**
 * Created by plutonii on 05.02.17.
 */
@Service("projectService")
public class ProjectServiceImpl implements ProjectService{

    private ProjectDAO projectDAO;
    private TeamDAO teamDAO;

    @Autowired
    public ProjectServiceImpl(ProjectDAO projectDAO, TeamDAO teamDAO){
        this.projectDAO = projectDAO;
        this.teamDAO = teamDAO;
    }


    public Project insert(Project project) {
        Project project1 = projectDAO.insert(project);
        System.out.println(project1);
        Team team = new Team();
        team.setProjectId(project1.getId());
        team.setUserId(project1.getUserId());
        System.out.println(team.getId()+"  "+team.getUserId()+ "  " + team.getProjectId());
        teamDAO.insert(team);
        return project1;
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
