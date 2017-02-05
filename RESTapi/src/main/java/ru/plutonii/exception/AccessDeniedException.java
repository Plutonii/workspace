package ru.plutonii.exception;

/**
 * Created by plutonii on 05.02.17.
 */
public class AccessDeniedException extends RuntimeException {
    public AccessDeniedException(String str){
        super(str);
    }
}
