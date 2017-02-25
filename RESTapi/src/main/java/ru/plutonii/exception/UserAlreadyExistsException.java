package ru.plutonii.exception;

/**
 * Created by plutonii on 05.02.17.
 */
public class UserAlreadyExistsException extends RuntimeException {
    private String constraintName;
    public class ErrorReg {
        private String msg;

        ErrorReg(String str) {
            this.msg = str;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }
    }

    public UserAlreadyExistsException(String msg){
        super(msg);
        this.constraintName = msg;
    }

    public ErrorReg getError(){
        if (this.constraintName.equals("username_UNIQUE")){
            return new ErrorReg("Имя пользователя занято.");
        } else if(this.constraintName.equals("email_UNIQUE")){
            return new ErrorReg("На данный email уже зарегистрирован аккаунт");
        } else {
            return new ErrorReg("Регистрация не удалась.");
        }
    }
}
