package ru.plutonii.service;

import ru.plutonii.model.UserProfile;
import ru.plutonii.model.UserWithProfile;

/**
 * Created by plutonii on 12.03.17.
 */
public interface UserInfoService {
    UserProfile insert(UserProfile userProfile);
    UserWithProfile findById(int id);
}
