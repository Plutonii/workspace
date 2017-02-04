package ru.plutonii.service;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.TokenDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.model.Token;
import ru.plutonii.model.User;

import java.sql.Timestamp;

/**
 * Created by plutonii on 04.02.17.
 */
@Service
public class UserAccessImpl implements UserAccess {

    private UserDAO userDAO;
    private TokenDAO tokenDAO;

    @Autowired
    UserAccessImpl(UserDAO userDAO, TokenDAO tokenDAO) {
        this.userDAO = userDAO;
        this.tokenDAO = tokenDAO;
    }

    public void registerUser(User user) {//change (return token if user registered)
        userDAO.insert(user);
    }

    public void removeUser(User user) {
        userDAO.delete(user);//create trigger (when delete user, entry moves in another table "deleteUsers")
    }

    public String login(User user) throws Exception {
        User realUser = userDAO.findByUsername(user.getUsername());
        if (!realUser.getPassword().equals(user.getPassword())) {
            //generate trows
        } else {
            Token token = new Token();
            token.setUserId(realUser.getId());
            token.setLifetime(new Timestamp(1000));
            token.setToken(token.getUserId() + "|" + Generator.generateStrToken());
            tokenDAO.insert(token);
            return token.getToken();
        }
        return null;
    }

    public void logout(User user) {

    }
}
