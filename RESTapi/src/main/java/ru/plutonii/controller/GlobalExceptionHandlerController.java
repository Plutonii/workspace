package ru.plutonii.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.plutonii.exception.*;

/**
 * Created by plutonii on 05.02.17.
 */
@ControllerAdvice
public class GlobalExceptionHandlerController {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "This user already exists")
    @ExceptionHandler(UserAlreadyExistsException.class)
    void handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        System.err.println(e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "Incorrect data")
    @ExceptionHandler(InvalidDataUserException.class)
    void handleInvalidLoginException(InvalidDataUserException e) {
        System.err.println(e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT, reason = "project not found")
    @ExceptionHandler(ProjectNotFound.class)
    void handleProjectNotFoundException(ProjectNotFound e) {
        System.err.println(e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT, reason = "Task not found")
    @ExceptionHandler(TaskNotFound.class)
    void handleTaskNotFoundException(TaskNotFound e) {
        System.err.println(e.getMessage());
    }
}
