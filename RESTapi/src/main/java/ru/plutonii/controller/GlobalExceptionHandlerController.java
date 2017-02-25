package ru.plutonii.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.plutonii.exception.*;

/**
 * Created by plutonii on 05.02.17.
 */
@ControllerAdvice
public class GlobalExceptionHandlerController {

    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public UserAlreadyExistsException.ErrorReg handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        System.err.println(e.getMessage());
        return e.getError();
    }

    @ExceptionHandler(InvalidDataUserException.class)
    @ResponseStatus(value = HttpStatus.FORBIDDEN)
    @ResponseBody
    public InvalidDataUserException.ErrorLogin handleInvalidLoginException(InvalidDataUserException e) {
        System.err.println(e.getMessage());
        return e.getError();
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
