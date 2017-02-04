package ru.plutonii.service;

import ru.plutonii.model.User;

/**
 * Created by plutonii on 04.02.17.
 */
public interface UserAccess {
    void registerUser(User user);
    void removeUser(User user);
    String login(User user) throws Exception;//return token
    void logout(User user);
}
