package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.model.UserProfile;

/**
 * Created by plutonii on 12.03.17.
 */
@Repository("userProfileDAO")
@Transactional
public class UserProfileDAOImpl implements UserProfileDAO {

    private SessionFactory sessionFactory;

    @Autowired
    UserProfileDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }


    public UserProfile update(UserProfile userProfile) {
        getCurrentSession().saveOrUpdate(userProfile);
        return userProfile;
    }

    @Transactional(readOnly = true)
    public UserProfile findById(int id) {
        return (UserProfile) getCurrentSession().createQuery("from user_profile u where u.id = :id")
                .setParameter("id", id)
                .uniqueResult();
    }
}
