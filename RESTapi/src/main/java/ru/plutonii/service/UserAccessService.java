package ru.plutonii.service;

import ru.plutonii.model.User;

/**
 * Created by plutonii on 04.02.17.
 */
public interface UserAccessService {
    void registerUser(User user);
    void removeUser(User user);
    String login(User user);//return token
    void logout(User user);
}
