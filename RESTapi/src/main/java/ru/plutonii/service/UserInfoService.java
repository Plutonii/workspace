package ru.plutonii.service;

import ru.plutonii.model.User;
import ru.plutonii.model.UserProfile;
import ru.plutonii.model.UserWithProfile;

import java.util.List;

/**
 * Created by plutonii on 12.03.17.
 */
public interface UserInfoService {
    UserProfile insert(UserProfile userProfile);
    UserWithProfile findById(int id);
    List<User> findUsersByUsername(String username);
}
