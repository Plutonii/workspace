package ru.plutonii.exception;

/**
 * Created by plutonii on 05.02.17.
 */
public class InvalidDataUserException extends RuntimeException {
    public class ErrorLogin {
        private String msg;

        ErrorLogin(String msg) {
            this.msg = msg;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }
    }

    public InvalidDataUserException(String msg) {
        super(msg);
    }

    public ErrorLogin getError(){
        return new ErrorLogin("Логин или пароль неверный.");
    }
}
