import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.ProjectDAO;
import ru.plutonii.dao.TaskDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.model.Project;
import ru.plutonii.model.Task;
import ru.plutonii.model.User;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class TaskDAOTest {

    @Autowired
    private TaskDAO taskDAO;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private ProjectDAO projectDAO;

    private Project project;
    private Task task;
    private User user;

    @Before
    public void init() {
        user = new User();
        user.setEmail("email@mail.ru");
        user.setUsername("loin");
        user.setPassword("pass");
        userDAO.insertOrUpdate(user);
        project = new Project();
        project.setTitle("ttt");
        project.setUser(user);
        projectDAO.insert(project);
        task = new Task();
        task.setTitle("task");
        task.setProjectId(project.getId());
    }

    @After
    public void destroy() {
        user = null;
        project = null;
        task = null;
    }

    @Test
    public void testInsertTask() {
        taskDAO.insert(task);
        assertNotEquals(task.getId(), 0);
    }

    @Test
    public void testFindById() {
        taskDAO.insert(task);
        assertNotNull(taskDAO.findById(task.getId()));
    }

    @Test
    public void testFindByUserId() {
        task.setUser(user);
        taskDAO.insert(task);
        Task task1 = new Task();
        task1.setTitle("tt");
        task1.setProjectId(project.getId());
        task1.setUser(user);
        taskDAO.insert(task1);
        assertEquals(taskDAO.findByMakerId(user.getId()).size(), 2);
    }

    @Test
    public void testFindByProjectId() {
        taskDAO.insert(task);
        Task task1 = new Task();
        task1.setTitle("tt");
        task1.setProjectId(project.getId());
        taskDAO.insert(task1);
        assertEquals(taskDAO.findByProjectId(project.getId()).size(), 2);
    }

    @Test
    public void testDelete() {
        taskDAO.insert(task);
        taskDAO.delete(task);
        assertNull(taskDAO.findById(task.getId()));
    }
}
