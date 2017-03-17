import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.model.Contact;
import ru.plutonii.model.User;
import ru.plutonii.service.ContactService;

import java.util.List;

import static org.junit.Assert.*;
/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class ContactServiceTest {

    @Autowired
    private ContactService contactService;
    @Autowired
    private UserDAO userDAO;

    @Test
    public void testGetContactsByUserId(){
        User user1 = new User();
        User user2 = new User();
        User user3 = new User();
        user1.setPassword("1");
        user1.setEmail("1");
        user1.setUsername("1");
        user2.setPassword("2");
        user2.setUsername("2");
        user2.setEmail("2");
        user3.setEmail("3");
        user3.setPassword("3");
        user3.setUsername("3");
        userDAO.insertOrUpdate(user1);
        userDAO.insertOrUpdate(user2);
        userDAO.insertOrUpdate(user3);
        Contact contact = new Contact();
        contact.setUserId(user1.getId());
        contact.setContact(user2);
        contactService.addContact(contact);
        Contact contact1 = new Contact();
        contact1.setUserId(user1.getId());
        contact1.setContact(user3);
        contactService.addContact(contact1);

        List<User> userList = contactService.getContactsByUserId(user1.getId());
        assertEquals(userList.size(), 2);
    }

}
