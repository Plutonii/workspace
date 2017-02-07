package ru.plutonii.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import ru.plutonii.exception.AlreadyAuthorizedException;
import ru.plutonii.exception.InvalidDataUserException;
import ru.plutonii.exception.ProjectNotFound;
import ru.plutonii.exception.UserAlreadyExistsException;

/**
 * Created by plutonii on 05.02.17.
 */
@ControllerAdvice
public class GlobalExceptionHandlerController {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Такой пользователь уже существует")
    @ExceptionHandler(UserAlreadyExistsException.class)
    void handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        System.err.println(e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.FORBIDDEN, reason = "Неверные данные")
    @ExceptionHandler(InvalidDataUserException.class)
    void handleInvalidLoginException(InvalidDataUserException e) {
        System.err.println(e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Проект не найден")
    @ExceptionHandler(ProjectNotFound.class)
    void handleProjectNotFoundException(ProjectNotFound e) {
        System.err.println(e.getMessage());
    }

    @ResponseStatus(value = HttpStatus.BAD_GATEWAY, reason = "You")
    @ExceptionHandler(AlreadyAuthorizedException.class)
    void handleAlreadyAuthorizedException(AlreadyAuthorizedException e) {
        System.err.println(e.getMessage());
    }
}
