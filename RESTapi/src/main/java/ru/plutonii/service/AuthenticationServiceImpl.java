package ru.plutonii.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.plutonii.dao.TokenDAO;
import ru.plutonii.model.Token;


/**
 * Created by plutonii on 05.02.17.
 */
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private TokenDAO tokenDAO;

    @Autowired
    AuthenticationServiceImpl(TokenDAO tokenDAO) {
        this.tokenDAO = tokenDAO;
    }

    public boolean authentication(String token) {
        int indexSeparator = token.indexOf('|');
        if (indexSeparator == -1) return false;
        try {
            int id = Integer.parseInt(token.substring(0, indexSeparator));
            token = token.substring(indexSeparator + 1);
            Token realToken = tokenDAO.findByUserId(id);
            if (realToken == null) return false;
            if (!realToken.getToken().equals(token)) return false;
        } catch (NumberFormatException NFE) {
            return false;
        }
        return true;
    }
}
