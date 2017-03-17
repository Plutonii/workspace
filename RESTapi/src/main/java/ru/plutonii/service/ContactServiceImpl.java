package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.ContactDAO;
import ru.plutonii.model.Contact;
import ru.plutonii.model.User;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by plutonii on 12.03.17.
 */
@Service("contactService")
public class ContactServiceImpl implements ContactService {

    private ContactDAO contactDAO;

    @Autowired
    public ContactServiceImpl(ContactDAO contactDAO) {
        this.contactDAO = contactDAO;
    }

    public Contact addContact(Contact contact) {
        return contactDAO.insert(contact);
    }

    public List<User> getContactsByUserId(int id) {
        return contactDAO.findByUserId(id).stream().map(Contact::getContact).collect(Collectors.toList());
    }

    public Contact getContactByBindId(int id) {
        return contactDAO.findById(id);
    }

    public void deleteContact(int id) {
        contactDAO.delete(contactDAO.findById(id));
    }
}
