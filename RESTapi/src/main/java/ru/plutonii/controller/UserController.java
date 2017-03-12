package ru.plutonii.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.plutonii.model.UserWithProfile;
import ru.plutonii.service.UserInfoService;

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

}
