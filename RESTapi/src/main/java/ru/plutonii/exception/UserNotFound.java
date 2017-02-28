package ru.plutonii.exception;

/**
 * Created by plutonii on 05.02.17.
 */
public class UserNotFound extends RuntimeException{
    public UserNotFound(String msg){
        super(msg);
    }
}
