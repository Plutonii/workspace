package ru.plutonii.exception;

/**
 * Created by plutonii on 05.02.17.
 */
public class ProjectNotFound extends RuntimeException{
    public ProjectNotFound(String msg){
        super(msg);
    }
}
