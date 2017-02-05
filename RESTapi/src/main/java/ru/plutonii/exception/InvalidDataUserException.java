package ru.plutonii.exception;

/**
 * Created by plutonii on 05.02.17.
 */
public class InvalidDataUserException extends RuntimeException {
    public InvalidDataUserException(String msg){
        super(msg);
    }
}
