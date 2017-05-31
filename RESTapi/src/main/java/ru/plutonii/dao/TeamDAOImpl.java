package ru.plutonii.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.exception.UserNotFound;
import ru.plutonii.model.Team;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 25.02.17.
 */
@Repository("teamDAO")
@Transactional
public class TeamDAOImpl implements TeamDAO {
    private SessionFactory sessionFactory;

    @Autowired
    TeamDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession() {
        return this.sessionFactory.getCurrentSession();
    }


    public Team insert(Team team) {
        getCurrentSession().saveOrUpdate(team);
        return team;
    }

    public void delete(Team team) {
        getCurrentSession().delete(team);
    }

    @Override
    public void removeByProjectAndUserId(int projectId, int userId) {
        getCurrentSession().createQuery("delete from team t where t.projectId = :projectId and t.user = :user")
                .setParameter("projectId", projectId)
                .setParameter("user", new User(userId))
                .executeUpdate();
    }

    public List<Team> findUserByProjectId(int id) {
        List<Team> userList = getCurrentSession().createQuery("from team t where t.projectId = :id")
                .setParameter("id", id).list();
        return userList;
    }

    @Override
    public List<Team> findByUserId(int id) {
        List<Team> teams = getCurrentSession().createQuery("from team t where t.user = :user")
                .setParameter("user", new User(id)).list();
        return teams;
    }
}
