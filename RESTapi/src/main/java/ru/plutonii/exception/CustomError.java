package ru.plutonii.exception;

/**
 * Created by plutonii on 28.02.17.
 */
public class CustomError {
    private String errorName;
    private String message;

    public CustomError(String errorName, String message) {
        this.errorName = errorName;
        this.message = message;
    }
}
