package ru.plutonii.service;

import ru.plutonii.model.Team;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by rakr on 5/30/2017.
 */
public interface TeamService {
    Team addTeam(Team team);
    void removeTeam(Team team);
    void removeTeamByProjectAndUserId(int projectId, int userId);
    List<User> findUsersByProjectId(int projectId);
}
