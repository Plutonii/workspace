import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.dao.UserProfileDAO;
import ru.plutonii.model.User;
import ru.plutonii.model.UserProfile;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class UserProfileDAOTest {

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private UserProfileDAO userProfileDAO;

    private User user;
    private UserProfile userProfile;

    @Before
    public void init() {
        user = new User();
        user.setUsername("username");
        user.setPassword("password");
        user.setEmail("email@mail.em");
        userDAO.insertOrUpdate(user);
    }

    @After
    public void destroy() {
        user = null;
        userProfile = null;
    }

    @Test
    public void testCreatedUserProfileAfterCreatedUser() {
        assertNotNull(userProfileDAO.findById(user.getId()));
    }

    @Test
    public void testUpdateUserProfile() {
        userProfile = userProfileDAO.findById(user.getId());
        userProfile.setPathOfAvatar("/img/av1.png");
        userProfileDAO.update(userProfile);
        assertEquals(userProfileDAO.findById(user.getId()).getPathOfAvatar(),
                "/img/av1.png");
    }
}
