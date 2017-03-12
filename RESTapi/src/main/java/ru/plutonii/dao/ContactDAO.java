package ru.plutonii.dao;

import ru.plutonii.model.Contact;

import java.util.List;

/**
 * Created by plutonii on 12.03.17.
 */
public interface ContactDAO {
    Contact insert(Contact contact);
    void delete(Contact contact);
    List<Contact> findByUserId(int id);
    Contact findById(int id);
}
