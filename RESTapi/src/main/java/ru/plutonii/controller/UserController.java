package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.model.User;
import ru.plutonii.model.UserWithProfile;
import ru.plutonii.service.UserInfoService;

import java.util.List;

/**
 * Created by plutonii on 12.03.17.
 */
@RestController
@RequestMapping("/api")
public class UserController {

    private UserInfoService userInfoService;

    @Autowired
    public UserController(UserInfoService userInfoService) {
        this.userInfoService = userInfoService;
    }

    @GetMapping(path = "/user/{id}", produces = "application/json")
    @ResponseBody
    UserWithProfile getUserWithProfile(@PathVariable(name = "id") int id){
        return userInfoService.findById(id);
    }

    @GetMapping(path = "/user/find/{username}", produces = "application/json")
    @ResponseBody
    List<User> findUsersByUsername(@PathVariable(name = "username") String username){
        return userInfoService.findUsersByUsername(username);
    }

}