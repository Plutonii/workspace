import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.TokenDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.model.Token;
import ru.plutonii.model.User;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class TokenDAOTest {

    @Autowired
    private TokenDAO tokenDAO;
    @Autowired
    private UserDAO userDAO;

    private User user;
    private Token token;

    @Before
    public void init() {
        user = new User();
        user.setPassword("pass");
        user.setEmail("email@mail.ru");
        user.setUsername("username");
        userDAO.insertOrUpdate(user);
        token = new Token();
        token.setToken("Uks62Ywb6W3lvhkO3grz6t6wqlDr94EaqvXwt");
        token.setUserId(user.getId());
    }

    @After
    public void destroy() {
        user = null;
        token = null;
    }

    @Test
    public void testInsertToken() {
        tokenDAO.insert(token);
        assertNotEquals(token.getId(), 0);
    }

    @Test
    public void testFindById() {
        tokenDAO.insert(token);
        assertNotNull(tokenDAO.findById(token.getId()));
    }

    @Test
    public void testFindByUserId() {
        tokenDAO.insert(token);
        assertNotNull(tokenDAO.findByUserId(user.getId()));
    }

    @Test
    public void testDeleteToken() {
        tokenDAO.insert(token);
        tokenDAO.delete(token);
        assertNull(tokenDAO.findById(token.getId()));
    }
}
