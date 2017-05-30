package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.TeamDAO;
import ru.plutonii.model.Team;
import ru.plutonii.model.User;


import java.util.ArrayList;
import java.util.List;

/**
 * Created by rakr on 5/30/2017.
 */
@Service
public class TeamServiceImpl implements TeamService {

    private TeamDAO teamDAO;

    @Autowired
    public TeamServiceImpl(TeamDAO teamDAO) {
        this.teamDAO = teamDAO;
    }

    @Override
    public Team addTeam(Team team) {
        teamDAO.insert(team);
        return team;
    }

    @Override
    public void removeTeam(Team team) {
        teamDAO.delete(team);
    }

    @Override
    public void removeTeamByProjectAndUserId(int projectId, int userId) {
        teamDAO.removeByProjectAndUserId(projectId, userId);
    }

    @Override
    public List<User> findUsersByProjectId(int projectId) {
        ArrayList<User> users = new ArrayList<>();
        teamDAO.findUserByProjectId(projectId).forEach((value) -> users.add(value.getUser()));
        return users;
    }
}
