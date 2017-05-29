package ru.plutonii.dao;

import ru.plutonii.model.Contact;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 12.03.17.
 */
public interface ContactDAO {
    User insert(Contact contact);
    void delete(Contact contact);
    void deleteByIdandContactId(int myId, int contactId);
    List<Contact> findByUserId(int id);
    Contact findById(int id);
}
