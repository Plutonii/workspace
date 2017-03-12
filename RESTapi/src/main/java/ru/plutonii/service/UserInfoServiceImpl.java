package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.dao.UserProfileDAO;
import ru.plutonii.model.UserProfile;
import ru.plutonii.model.UserWithProfile;

/**
 * Created by plutonii on 12.03.17.
 */
@Service("userInfoService")
public class UserInfoServiceImpl implements UserInfoService {

    private UserProfileDAO userProfileDAO;
    private UserDAO userDAO;

    @Autowired
    public UserInfoServiceImpl(UserProfileDAO userProfileDAO, UserDAO userDAO) {
        this.userProfileDAO = userProfileDAO;
        this.userDAO = userDAO;
    }

    public UserProfile insert(UserProfile userProfile) {
        userProfileDAO.insert(userProfile);
        return userProfile;
    }

    public UserWithProfile findById(int id) {
        UserWithProfile userWithProfile = new UserWithProfile();
        userWithProfile.setUser(userDAO.findById(id));
        userWithProfile.setUserProfile(userProfileDAO.findById(id));
        return userWithProfile;
    }
}
