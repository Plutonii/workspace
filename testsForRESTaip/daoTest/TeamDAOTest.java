import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.ProjectDAO;
import ru.plutonii.dao.TeamDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.exception.UserNotFound;
import ru.plutonii.model.Project;
import ru.plutonii.model.Team;
import ru.plutonii.model.User;

import static org.junit.Assert.*;

/**
 * Created by plutonii on 17.03.17.
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(locations = "classpath:applicationContextForTest.xml")
@Transactional
public class TeamDAOTest {

    @Autowired
    private TeamDAO teamDAO;
    @Autowired
    private ProjectDAO projectDAO;
    @Autowired
    private UserDAO userDAO;

    private User user;
    private Project project;
    private Team team;

    @Before
    public void init() {
        user = new User();
        user.setEmail("email@mail.ru");
        user.setPassword("pass");
        user.setUsername("username");
        userDAO.insertOrUpdate(user);
        project = new Project();
        project.setTitle("t");
        project.setUser(user);
        projectDAO.insert(project);
        team = new Team();
        team.setProjectId(project.getId());
        team.setUser(user);
    }

    @After
    public void destroy() {
        user = null;
        team = null;
        project = null;
    }

    @Test
    public void testInsertTeam() {
        teamDAO.insert(team);
        assertNotEquals(team.getId(), 0);
    }

    @Test
    public void testFindUserByProjectId() {
        teamDAO.insert(team);
        User user1 = new User();
        user1.setPassword("ppp");
        user1.setUsername("uuu");
        user1.setEmail("e@mail.ru");
        userDAO.insertOrUpdate(user1);
        Team team1 = new Team();
        team1.setProjectId(project.getId());
        team1.setUser(user1);
        teamDAO.insert(team1);
        assertEquals(teamDAO.findUserByProjectId(project.getId()).size(), 2);
    }

    @Test()
    public void testDelete() {
        teamDAO.insert(team);
        teamDAO.delete(team);
        assertEquals(teamDAO.findUserByProjectId(team.getProjectId()).size(), 0);
    }
}