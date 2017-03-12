package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.plutonii.model.Contact;

import java.util.List;

/**
 * Created by plutonii on 12.03.17.
 */
@Repository("contactDAO")
@Transactional
public class ContactDAOImpl implements ContactDAO {

    private SessionFactory sessionFactory;

    @Autowired
    public ContactDAOImpl(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession(){
        return this.sessionFactory.getCurrentSession();
    }

    public Contact insert(Contact contact) {
        getCurrentSession().saveOrUpdate(contact);
        return contact;
    }

    public void delete(Contact contact) {
        getCurrentSession().delete(contact);
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
