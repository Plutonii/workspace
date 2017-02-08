package ru.plutonii.exception;

import com.sun.org.apache.regexp.internal.RE;

/**
 * Created by plutonii on 08.02.17.
 */
public class TaskNotFound extends RuntimeException {
    public TaskNotFound(String msg) {
        super(msg);
    }
}
