package ru.plutonii.dao;

import ru.plutonii.model.User;

import java.util.List;

/**
 * Created by plutonii on 04.02.17.
 */
public interface UserDAO {
    User insertOrUpdate(User user);
    void delete(User user);
    List<User> findAll();
    List<User> findByUserNameFirstFive(String username);
    User findById(int id);
    User findByUsername(String username);
    User findByEmail(String email);
}
