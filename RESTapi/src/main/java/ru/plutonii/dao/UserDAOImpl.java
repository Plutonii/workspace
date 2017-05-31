package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.exception.UserAlreadyExistsException;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 04.02.17.
 */
@Repository("userDAO")
@Transactional
public class UserDAOImpl implements UserDAO {

    private SessionFactory sessionFactory;

    @Autowired
    UserDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }

    public User insertOrUpdate(User user) {
        try {
            getCurrentSession().saveOrUpdate(user);
        } catch (ConstraintViolationException e){
            throw new UserAlreadyExistsException(e.getConstraintName());
        }
        return user;
    }

    public void delete(User user) {
        getCurrentSession().delete(user);
    }

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return getCurrentSession().createQuery("from user u").list();
    }

    @Transactional(readOnly = true)
    public User findById(int id) {
        return (User) getCurrentSession().createQuery("from user u where u.id = :id")
                .setParameter("id", id)
                .uniqueResult();
    }

    @Transactional(readOnly = true)
    public User findByUsername(String username) {
        return (User) getCurrentSession().createQuery("from user u where u.username = :username")
                .setParameter("username", username)
                .uniqueResult();
    }

    @Transactional(readOnly = true)
    public User findByEmail(String email) {
        return (User) getCurrentSession().createQuery("from user u where u.email = :email")
                .setParameter("email", email)
                .uniqueResult();
    }

    @Override
    public List<User> findByUserNameFirstFive(String username) {
        username += '%';
        return getCurrentSession().createQuery("from user u where u.username LIKE :username")
                .setMaxResults(5)
                .setParameter("username", username).list();
    }
}
