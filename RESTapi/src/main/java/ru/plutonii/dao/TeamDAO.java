package ru.plutonii.dao;

import ru.plutonii.model.Team;

/**
 * Created by plutonii on 25.02.17.
 */
public interface TeamDAO {
    Team insert(Team team);
    void delete(Team team);
}
