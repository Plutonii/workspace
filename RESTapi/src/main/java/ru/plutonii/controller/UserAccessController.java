package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.exception.AlreadyAuthorizedException;
import ru.plutonii.model.User;
import ru.plutonii.service.UserAccessService;

import javax.servlet.http.HttpServletResponse;

@RequestMapping("/access")
@RestController
public class UserAccessController {

    private UserAccessService userAccess;

    @Autowired
    UserAccessController(UserAccessService userAccess) {
        this.userAccess = userAccess;
    }

    @PostMapping(path = "/new", consumes = "application/json")
    void register(@RequestBody User user) {
        userAccess.registerUser(user);
    }

    @PostMapping(path = "/remove", consumes = "application/json")
    void removeUser(@RequestBody User user) {
        userAccess.removeUser(user);
    }

    @PostMapping(path = "/login", consumes = "application/json")
    void login(@RequestBody User user, HttpServletResponse response) {
        try {
            String token = userAccess.login(user);
            response.setHeader("token", token);
        } catch (AlreadyAuthorizedException e) {
            response.setHeader("token", e.getOldToken());
        }
    }

    @PostMapping(path = "/logout", consumes = "application/json")
    void logout(@RequestBody User user) {
        userAccess.logout(user);
    }
}
