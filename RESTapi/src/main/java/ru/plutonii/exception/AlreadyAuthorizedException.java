package ru.plutonii.exception;

/**
 * Created by plutonii on 07.02.17.
 */
public class AlreadyAuthorizedException extends RuntimeException {
    private String oldToken;

    public String getOldToken() {
        return oldToken;
    }

    public void setOldToken(String oldToken) {
        this.oldToken = oldToken;
    }

    public AlreadyAuthorizedException(String msg, String token){
        super(msg);
        this.oldToken = token;
    }
}
