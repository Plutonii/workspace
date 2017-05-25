import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.ContactDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.model.Contact;
import ru.plutonii.model.User;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
//@RunWith(SpringRunner.class)
//@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
//@Transactional
public class ContactDAOTest {

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private ContactDAO contactDAO;

    private Contact contact;
    private User user, user1;

    @Before
    public void init() {
        user = new User();
        user.setEmail("email@mt.tr");
        user.setPassword("pass");
        user.setUsername("username");
        user1 = new User();
        user1.setEmail("email@ela.rt");
        user1.setPassword("pp");
        user1.setUsername("name");
        userDAO.insertOrUpdate(user);
        userDAO.insertOrUpdate(user1);
        contact = new Contact();
        contact.setUserId(user.getId());
        contact.setContact(user1);
    }

    @After
    public void destroy() {
        user = null;
        user1 = null;
        contact = null;
    }

    @Test
    public void testInsertContact() {
        contactDAO.insert(contact);
        assertNotEquals(contact.getId(), 0);
    }

    @Test
    public void testFindById() {
        contactDAO.insert(contact);
        assertNotNull(contactDAO.findById(contact.getId()));
    }

    @Test
    public void testFindUsersByUserId(){
        contactDAO.insert(contact);
        assertEquals(contactDAO.findByUserId(user.getId()).size(), 1);
    }

    @Test
    public void testDeleteContact() {
        contactDAO.insert(contact);
        contactDAO.delete(contact);
        assertNull(contactDAO.findById(contact.getId()));
    }
}
