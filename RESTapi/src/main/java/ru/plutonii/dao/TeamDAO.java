package ru.plutonii.dao;

import ru.plutonii.model.Team;
import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 25.02.17.
 */
public interface TeamDAO {
    Team insert(Team team);
    void delete(Team team);
    List<User> findUserByProjectId(int id);
}
