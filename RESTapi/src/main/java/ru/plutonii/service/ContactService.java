package ru.plutonii.service;

import ru.plutonii.model.Contact;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 12.03.17.
 */
public interface ContactService {
    User addContact(Contact contact);
    List<User> getContactsByUserId(int id);
    Contact getContactByBindId(int id);
    void deleteContact(int id);
    void deleteContact(int myId, int contactId);

}
