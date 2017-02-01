package ru.plutonii.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by plutonii on 31.01.17.
 */
@RequestMapping("/api")
@Controller
public class MainController {
    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Test get() {
        System.out.println(123);
        Test test = new Test();
        test.setId(11);
        test.setName("Roma");
        return test;
    }

    @RequestMapping(path = "/t", method = RequestMethod.GET)
    public String getT() {
        System.out.println("t");
        return "ttt";
    }
}
