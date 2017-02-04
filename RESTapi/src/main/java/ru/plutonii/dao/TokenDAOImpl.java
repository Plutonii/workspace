package ru.plutonii.dao;

import org.springframework.stereotype.Repository;
import ru.plutonii.model.Token;

/**
 * Created by plutonii on 04.02.17.
 */
@Repository("tokenDAO")
public class TokenDAOImpl implements TokenDAO{
    public Token insert(Token token) {
        return null;
    }

    public Token update(Token token) {
        return null;
    }

    public void delete(Token token) {

    }

    public Token findById(int id) {
        return null;
    }

    public Token findByUserId(int id) {
        return null;
    }
}
