package ru.plutonii.dao;

import javassist.NotFoundException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.exception.ProjectNotFound;
import ru.plutonii.model.Project;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 05.02.17.
 */
@Repository("projectDAO")
@Transactional
public class ProjectDAOImpl implements ProjectDAO{

    private SessionFactory sessionFactory;

    @Autowired
    public ProjectDAOImpl(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession(){
         return this.sessionFactory.getCurrentSession();
    }

    public Project insert(Project project) {
        getCurrentSession().saveOrUpdate(project);
        return project;
    }

    public void delete(Project project) {
        getCurrentSession().delete(project);
    }

    @Transactional(readOnly = true)
    public Project findById(int id) {
        Project realProject = (Project) getCurrentSession().createQuery("from project p where p.id = :id")
                .setParameter("id", id).uniqueResult();
        if (realProject == null) {
            throw new ProjectNotFound("Project not found");
        }
        return realProject;
    }

    @Transactional(readOnly = true)
    public List<Project> findByUserId(int id) {
        List<Project> projectList = getCurrentSession().createQuery("from project p where p.user = :user")
                .setParameter("user", new User(id)).list();
        if (projectList == null){
            throw new ProjectNotFound("User does not have a projects");
        }
        return projectList;
    }
}
