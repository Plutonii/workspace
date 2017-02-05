package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.plutonii.dao.TokenDAO;
import ru.plutonii.dao.UserDAO;
import ru.plutonii.exception.InvalidDataUserException;
import ru.plutonii.model.Token;
import ru.plutonii.model.User;

import java.sql.Timestamp;

/**
 * Created by plutonii on 04.02.17.
 */
@Service
@Transactional
public class UserAccessServiceImpl implements UserAccessService {

    private UserDAO userDAO;
    private TokenDAO tokenDAO;

    @Autowired
    public UserAccessServiceImpl(UserDAO userDAO, TokenDAO tokenDAO) {
        this.userDAO = userDAO;
        this.tokenDAO = tokenDAO;
    }

    public void registerUser(User user) {//change (return token if user registered)
        userDAO.insertOrUpdate(user);
    }

    public void removeUser(User user) {
        User realUser = userDAO.findById(user.getId());
        userDAO.delete(realUser);//create trigger (when delete user, entry moves in another table "deleteUsers")
    }

    public String login(User user) {
        User realUser = userDAO.findByUsername(user.getUsername());
        if (realUser == null || !realUser.getPassword().equals(user.getPassword())) {
            throw new InvalidDataUserException("Неверные данные");
        } else {
            Token token = new Token();
            token.setUserId(realUser.getId());
            token.setLifetime(new Timestamp(1000));
            token.setToken(token.getUserId() + "|" + GeneratorService.generateStrToken());
            tokenDAO.insert(token);
            return token.getToken();
        }
    }

    public void logout(User user) {
        Token realToken = tokenDAO.findByUserId(user.getId());
        tokenDAO.delete(realToken);
    }
}
