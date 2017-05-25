import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.TokenDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.exception.InvalidDataUserException;
import ru.plutonii.model.User;
import ru.plutonii.service.UserAccessService;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 16.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class UserAccessServiceTest {
    @Autowired
    private UserAccessService userAccessService;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private TokenDAO tokenDAO;

    private User user;

    @Before
    public void init() {
        user = new User();
        user.setEmail("email@mail.ru");
        user.setPassword("pass");
        user.setUsername("uname");
    }

    @Test
    public void testRegisterUser() {
        assertTrue(userAccessService.registerUser(user).length() > 37);
    }

    @Test(expected = InvalidDataUserException.class)
    public void testLoginWhenUserNotExist() throws InvalidDataUserException {
        userAccessService.login(user);
    }

    @Test(expected = InvalidDataUserException.class)
    public void testLoginWhenPasswordInvalid() throws InvalidDataUserException {
        userDAO.insertOrUpdate(user);
        user = new User();
        user.setUsername("uname");
        user.setPassword("invalid");
        System.out.println(userAccessService.login(user));
    }

    @Test
    public void testLogin() {
        userDAO.insertOrUpdate(user);
        assertTrue(userAccessService.login(user).length() > 37);
    }

    @Test
    public void testLogout() {
        userAccessService.registerUser(user);
        userAccessService.logout(user);
        assertNull(tokenDAO.findByUserId(user.getId()));
    }

    @Test
    public void testRemoveUser() {
        userAccessService.registerUser(user);
        userAccessService.removeUser(user);
        assertNull(userDAO.findById(user.getId()));
    }

}
