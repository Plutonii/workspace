package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.model.Label;

import java.util.List;

/**
 * Created by rakr on 5/26/2017.
 */
@Repository("labelDAO")
@Transactional
public class LabelDAOImpl implements LabelDAO {

    private SessionFactory sessionFactory;

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }

    @Autowired
    public LabelDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public Label insert(Label label) {
        getCurrentSession().saveOrUpdate(label);
        return label;
    }

    @Override
    public void delete(Label label) {
        getCurrentSession().delete(label);
    }

    @Override
    public List<Label> findByProjectId(int id) {
        List<Label> labelList = getCurrentSession().createQuery("from label l where l.projectId = :id")
                .setParameter("id", id).list();
        return labelList;
    }

    @Override
    public Label findById(int id) {
        return (Label) getCurrentSession().createQuery("from label l where l.id = :id")
                .setParameter("id", id).uniqueResult();
    }
}
