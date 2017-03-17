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
@Service("userAccessService")
@Transactional
public class UserAccessServiceImpl implements UserAccessService {

    private UserDAO userDAO;
    private TokenDAO tokenDAO;
    private LearnNewUserService learnNewService;

    @Autowired
    public UserAccessServiceImpl(UserDAO userDAO, TokenDAO tokenDAO, LearnNewUserService learnNewService) {
        this.userDAO = userDAO;
        this.tokenDAO = tokenDAO;
        this.learnNewService = learnNewService;
    }

    public String registerUser(User user) {
        userDAO.insertOrUpdate(user);
        Token token = new Token();
        token.setUserId(user.getId());
        token.setLifetime(new Timestamp(System.currentTimeMillis()));
        token.setToken(GeneratorService.generateStrToken());
        tokenDAO.insert(token);
        this.learnNewService.learn(user);
        return token.getUserId() + "|" + token.getToken();
    }

    public void removeUser(User user) {
        User realUser = userDAO.findById(user.getId());
        if (realUser != null) {
            logout(realUser);
            userDAO.delete(realUser);//create trigger (when delete user, entry moves in another table "deleteUsers")
        }
    }

    public String login(User user) {
        User realUser = userDAO.findByUsername(user.getUsername());
        if (realUser == null || !realUser.getPassword().equals(user.getPassword())) {
            throw new InvalidDataUserException("Неверные данные");
        } else {
            Token realToken = tokenDAO.findByUserId(realUser.getId());
            if (realToken != null) return realToken.getUserId() + "|" + realToken.getToken();
            else {
                Token token = new Token();
                token.setUserId(realUser.getId());
                token.setLifetime(new Timestamp(System.currentTimeMillis() + 10000));
                token.setToken(GeneratorService.generateStrToken());
                tokenDAO.insert(token);
                return token.getUserId() + "|" + token.getToken();
            }
        }
    }

    public void logout(User user) {
        Token realToken = tokenDAO.findByUserId(user.getId());
        if (realToken != null) {
            tokenDAO.delete(realToken);
        }
    }
}
