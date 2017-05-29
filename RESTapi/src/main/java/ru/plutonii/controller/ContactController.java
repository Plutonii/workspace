package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.model.Contact;
import ru.plutonii.model.User;
import ru.plutonii.service.ContactService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    private ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }


    @GetMapping(path = "/contact/{id}")
    @ResponseBody
    Contact getContactById(@PathVariable(name = "id") int id) {
        return contactService.getContactByBindId(id);
    }

    @GetMapping(path = "/contact/userid/{id}")
    @ResponseBody
    List<User> getContactsByUserId(@PathVariable(name = "id") int id){
        return contactService.getContactsByUserId(id);
    }

    @PostMapping("/contact")
    User addContact(@RequestBody Contact contact) {
        return contactService.addContact(contact);
    }

    @DeleteMapping("/contact/{id}/{contactId}")
    void deleteContact(@PathVariable(name = "id") int id, @PathVariable(name = "contactId") int contactId){
        contactService.deleteContact(id, contactId);
    }
}
