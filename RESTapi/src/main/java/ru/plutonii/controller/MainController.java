package ru.plutonii.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by plutonii on 31.01.17.
 */
@RequestMapping("/r")
@RestController
public class MainController {

    String token = "123";

    @GetMapping(produces = "application/json")
    @ResponseBody
    public String get(String token, HttpServletRequest request) {
        String str = request.getHeader("abc");
        /*System.out.println(token);
        System.out.println(this.token);
        if (token.equals(this.token)) {
            System.out.println("Yes");
        } else System.out.println("No");*/

        return "рома " + str;
    }


    @RequestMapping(path = "/t", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String getT(HttpServletRequest request) {
        System.out.println("inController");
        System.out.println(request.getAttribute("abcdf").toString());
        return "ttt";
    }

    @RequestMapping(path = "/123/{a}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String getS(@PathVariable(name = "a") String a) throws AccessException {
        //this.controllAccess(2);
        if (a.equals("1")) {
            return "1";
        }
        throw new AccessException(2);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(AccessException.class)
    public void example(AccessException ae) {

    }
}

class AccessException extends RuntimeException {
    public AccessException(int id) {
        super("NO ACCEESS FOR " + id);
        System.out.println("in ex");
    }
}