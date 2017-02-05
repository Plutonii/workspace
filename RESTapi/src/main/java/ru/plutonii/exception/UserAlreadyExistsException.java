package ru.plutonii.exception;

/**
 * Created by plutonii on 05.02.17.
 */
public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String msg){
        super(msg);
    }
}
