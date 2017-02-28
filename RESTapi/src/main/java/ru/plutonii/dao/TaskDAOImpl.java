package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.model.Task;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 08.02.17.
 */
@Repository("taskDAO")
@Transactional
public class TaskDAOImpl implements TaskDAO {

    private SessionFactory sessionFactory;

    @Autowired
    public TaskDAOImpl(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession(){
        return this.sessionFactory.getCurrentSession();
    }

    public Task insert(Task task){
        getCurrentSession().saveOrUpdate(task);
        return task;
    }

    public void delete(Task task) {
        getCurrentSession().delete(task);
    }

    @Transactional(readOnly = true)
    public Task findById(int id) {
        return (Task) getCurrentSession().createQuery("from task t where t.id = :id")
                .setParameter("id", id).uniqueResult();
    }

    @Transactional(readOnly = true)
    public List<Task> findByMakerId(int id) {
        return getCurrentSession().createQuery("from task t where t.user = :user")
                .setParameter("user", new User(id)).list();
    }

    @Transactional(readOnly = true)
    public List<Task> findByProjectId(int id) {
        return getCurrentSession().createQuery("from task t where t.projectId = :id")
                .setParameter("id", id).list();
    }
}
