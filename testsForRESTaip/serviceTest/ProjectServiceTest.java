import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.TeamDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.exception.ProjectNotFound;
import ru.plutonii.model.Project;
import ru.plutonii.model.User;
import ru.plutonii.service.ProjectService;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class ProjectServiceTest {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private TeamDAO teamDAO;

    private User user;
    private Project project;

    @Before
    public void init() {
        user = new User();
        user.setEmail("email@mail.ru");
        user.setUsername("username");
        user.setPassword("pass");
        userDAO.insertOrUpdate(user);
        project = new Project();
        project.setTitle("t");
        project.setUser(user);
    }

    @After
    public void destroy() {
        user = null;
        project = null;
    }

    @Test
    public void testFindById() {
        projectService.addNewProject(project);
        assertNotEquals(projectService.findById(project.getId()), 0);
    }

    @Test
    public void testInsertNewProject() {
        projectService.addNewProject(project);
        assertNotEquals(project.getId(), 0);
        assertEquals(teamDAO.findUserByProjectId(project.getId()).size(), 1);
    }

    @Test
    public void testUpdateProject() {
        projectService.addNewProject(project);
        project.setTitle("y");
        projectService.update(project);
        Project project1 = projectService.findById(project.getId());
        assertEquals(project1.getTitle(), "y");
    }

    @Test(expected = ProjectNotFound.class)
    public void testDelete() throws ProjectNotFound {
        projectService.addNewProject(project);
        projectService.delete(project.getId());
        assertNull(projectService.findById(project.getId()));
    }

    @Test
    public void testFindProjectsByUserId() {
        projectService.addNewProject(project);
        assertEquals(projectService.findByUserId(user.getId()).size(), 1);
    }

}
