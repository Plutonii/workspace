import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.TeamDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.model.Project;
import ru.plutonii.model.User;
import ru.plutonii.service.LearnNewUserService;
import ru.plutonii.service.ProjectService;
import ru.plutonii.service.TaskService;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class LearnNewUserServiceTest {

    @Autowired
    private LearnNewUserService learnNewUserService;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private TeamDAO teamDAO;
    @Autowired
    private TaskService taskService;

    private User user;

    @Test
    public void testLearn(){
        user = new User();
        user.setPassword("p");
        user.setUsername("u");
        user.setEmail("e");
        userDAO.insertOrUpdate(user);
        learnNewUserService.learn(user);
        List<Project> projectList = projectService.findByUserId(user.getId());
        assertEquals(projectList.size(), 1);
        assertEquals(teamDAO.findUserByProjectId(projectList.get(0).getId()).size(), 2);
        assertEquals(taskService.findByProjectId(projectList.get(0).getId()).size(), 3);
    }
}
