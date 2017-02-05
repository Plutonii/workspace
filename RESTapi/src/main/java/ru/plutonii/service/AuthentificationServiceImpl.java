package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.TokenDAO;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by plutonii on 05.02.17.
 */
@Service
public class AuthentificationServiceImpl implements AuthentificationService{

    private TokenDAO tokenDAO;

    @Autowired
    AuthentificationServiceImpl(TokenDAO tokenDAO){
        this.tokenDAO = tokenDAO;
    }

    public boolean authentification(HttpServletRequest request) {
        String token = request.getHeader("token");
        int indexSeparator = token.indexOf('|');
        int id = Integer.parseInt(token.substring(0, indexSeparator));
        token = token.substring(indexSeparator);

    }
}
