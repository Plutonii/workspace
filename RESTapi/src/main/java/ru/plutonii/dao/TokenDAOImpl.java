package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.model.Token;

/**
 * Created by plutonii on 04.02.17.
 */
@Repository("tokenDAO")
@Transactional
public class TokenDAOImpl implements TokenDAO {

    private SessionFactory sessionFactory;

    @Autowired
    TokenDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }

    public Token insert(Token token) {
        getCurrentSession().saveOrUpdate(token);
        return token;
    }

    public Token update(Token token) {
        getCurrentSession().saveOrUpdate(token);
        return token;
    }

    public void delete(Token token) {
        System.out.println(token);
        getCurrentSession().delete(token);
    }

    @Transactional(readOnly = true)
    public Token findById(int id) {
        return (Token) getCurrentSession().createQuery("from token t where t.id = :id")
                .setParameter("id", id).uniqueResult();
    }

    @Transactional(readOnly = true)
    public Token findByUserId(int id) {
        return (Token) getCurrentSession().createQuery("from token t where t.userId = :userId")
                .setParameter("userId", id).uniqueResult();
    }
}
