import org.hibernate.SessionFactory;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.exception.UserAlreadyExistsException;
import ru.plutonii.model.User;
import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class UserDAOTest {

    @Autowired
    private UserDAO userDAO;
    private User user;

    @Before
    public void initUser(){
        user = new User();
        user.setUsername("login");
        user.setPassword("password");
        user.setEmail("email@mail.ru");
    }

    @After
    public void destroyUser(){
        user = null;
    }

    @Test
    public void testInsertOrUpdateUser(){
        userDAO.insertOrUpdate(user);
        assertNotEquals(user.getId(), 0);
    }

    @Test(expected = UserAlreadyExistsException.class)
    public void testInsertOrUpdateException() throws UserAlreadyExistsException{
        userDAO.insertOrUpdate(user);
        User user1 = new User();
        user1.setUsername("login");
        user1.setPassword("password");
        user1.setEmail("email@mail.ru");
        userDAO.insertOrUpdate(user1);
    }

    @Test
    public void testFindById(){
        userDAO.insertOrUpdate(user);
        assertNotNull(userDAO.findById(user.getId()));
    }

    @Test
    public void testFindByUsername(){
        userDAO.insertOrUpdate(user);
        assertNotNull(userDAO.findByUsername(user.getUsername()));
    }

    @Test
    public void testFindByEmail(){
        userDAO.insertOrUpdate(user);
        assertNotNull(userDAO.findByEmail(user.getEmail()));
    }

    @Test
    public void testFindAll(){
        userDAO.insertOrUpdate(user);
        User user1 = new User();
        user1.setEmail("ee@mail.ru");
        user1.setUsername("username");
        user1.setPassword("pass");
        userDAO.insertOrUpdate(user1);
        assertEquals(userDAO.findAll().size(), 2);
    }

    @Test
    public void testDeleteUser(){
        userDAO.insertOrUpdate(user);
        userDAO.delete(user);
        assertNull(userDAO.findById(user.getId()));
    }
}
