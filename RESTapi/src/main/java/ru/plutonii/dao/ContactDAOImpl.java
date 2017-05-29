package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.model.Contact;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 12.03.17.
 */
@Repository("contactDAO")
@Transactional
public class ContactDAOImpl implements ContactDAO {

    private SessionFactory sessionFactory;
    private UserDAO userDAO;

    @Autowired
    public ContactDAOImpl(SessionFactory sessionFactory, UserDAO userDAO){
        this.sessionFactory = sessionFactory;
        this.userDAO = userDAO;
    }

    private Session getCurrentSession(){
        return this.sessionFactory.getCurrentSession();
    }

    public User insert(Contact contact) {
        getCurrentSession().saveOrUpdate(contact);
        return userDAO.findById(contact.getContact().getId());
    }

    public void delete(Contact contact) {
        getCurrentSession().delete(contact);
    }

    @Override
    public void deleteByIdandContactId(int myId, int contactId) {
        getCurrentSession().createQuery("delete contact c where c.userId = :userId and c.contact = :contactI")
                .setParameter("userId", myId)
                .setParameter("contactI", new User(contactId))
                .executeUpdate();
    }

    @Transactional(readOnly = true)
    public List<Contact> findByUserId(int id) {
        List<Contact> contactList = getCurrentSession().createQuery("from contact c where c.userId = :userId")
                .setParameter("userId", id).list();
        return contactList;
    }

    @Transactional(readOnly = true)
    public Contact findById(int id) {
        return (Contact) getCurrentSession().createQuery("from contact c where c.id = :id")
                .setParameter("id", id).uniqueResult();
    }
}
