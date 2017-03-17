import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.ProjectDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.exception.ProjectNotFound;
import ru.plutonii.model.Project;
import ru.plutonii.model.User;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class ProjectDAOTest {
    @Autowired
    private ProjectDAO projectDAO;
    @Autowired
    private UserDAO userDAO;

    private User user;
    private Project project;

    @Before
    public void init() {
        user = new User();
        user.setEmail("Email1@mail.ru");
        user.setUsername("userName1");
        user.setPassword("pass1");
        userDAO.insertOrUpdate(user);
        project = new Project();
        project.setTitle("Project");
        project.setUser(user);
    }

    @After
    public void destroyProject() {
        project = null;
        user = null;
    }

    @Test
    public void testInsertProject() {
        projectDAO.insert(project);
        assertNotEquals(project.getId(), 0);
    }

    @Test
    public void testFindById() {
        projectDAO.insert(project);
        assertNotNull(projectDAO.findById(project.getId()));
    }

    @Test
    public void testFindByUserId() {
        projectDAO.insert(project);
        Project project1 = new Project();
        project1.setTitle("TTT");
        project1.setUser(user);
        projectDAO.insert(project1);
        assertEquals(projectDAO.findByUserId(project.getUser().getId()).size(), 2);
    }

    @Test(expected = ProjectNotFound.class)
    public void testDelete() throws ProjectNotFound {
        projectDAO.insert(project);
        projectDAO.delete(project);
        projectDAO.findById(project.getId());
    }
}
