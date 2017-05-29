package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.model.LabelTasks;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
@Repository("labeltasksDAO")
@Transactional
public class LabelTasksDAOImpl implements LabelTasksDAO {

    private SessionFactory sessionFactory;

    @Autowired
    public LabelTasksDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }


    @Override
    public LabelTasks insert(LabelTasks labelTasks) {
        getCurrentSession().saveOrUpdate(labelTasks);
        return labelTasks;
    }

    @Override
    public void remove(LabelTasks labelTasks) {
        getCurrentSession().delete(labelTasks);
    }

    @Override
    public void removeByLabelIdAndTaskId(int labelId, int taskId) {
        getCurrentSession().createQuery("delete labeltasks lt where lt.taskId = :taskId and lt.labelId = :labelId")
                .setParameter("labelId", labelId)
                .setParameter("taskId", taskId)
                .executeUpdate();
    }

    @Override
    public List<LabelTasks> getLabelTasksByTaskId(int id) {
        List<LabelTasks> labelTasks = getCurrentSession().createQuery("from labeltasks lt where lt.taskId = :id")
                .setParameter("id", id).list();
        return labelTasks;
    }

    @Override
    public LabelTasks findById(int id) {
        return (LabelTasks) getCurrentSession().createQuery("from labeltasks l where l.id = :id")
                .setParameter("id", id).uniqueResult();
    }

}
