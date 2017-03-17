package ru.plutonii.dao;

import ru.plutonii.model.UserProfile;

/**
 * Created by plutonii on 12.03.17.
 */
public interface UserProfileDAO {
    UserProfile update(UserProfile userProfile);

    UserProfile findById(int id);
}
