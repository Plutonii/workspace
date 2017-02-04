package ru.plutonii.dao;

import ru.plutonii.model.Token;

/**
 * Created by plutonii on 04.02.17.
 */
public interface TokenDAO {
    Token insert(Token token);
    Token update(Token token);
    void delete(Token token);
    Token findById(int id);
    Token findByUserId(int id);
}
