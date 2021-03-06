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
    TeamDAOImpl(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    private Session getCurrentSession(){
        return this.sessionFactory.getCurrentSession();
    }


    public Team insert(Team team) {
        getCurrentSession().saveOrUpdate(team);
        return team;
    }

    public void delete(Team team) {
        getCurrentSession().delete(team);
    }

    public List<User> findUserByProjectId(int id) {
        List<User> userList = getCurrentSession().createQuery("from team t where t.projectId = :id")
                .setParameter("id", id).list();
        return userList;
    }
}
