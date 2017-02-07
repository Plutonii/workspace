package ru.plutonii.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import ru.plutonii.service.AuthenticationService;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by plutonii on 01.02.17.
 */
@Component
public class AccessChecksInterceptor extends HandlerInterceptorAdapter {

    private AuthenticationService authenticationService;

    @Autowired
    public AccessChecksInterceptor(AuthenticationService authenticationService){
        this.authenticationService = authenticationService;
    }

    @Override
    public boolean preHandle(javax.servlet.http.HttpServletRequest request,
                             HttpServletResponse response, Object handler) {
        String token = request.getHeader("token");
        if (token == null) {
            set403Status(response);
            return false;
        }
         if (!authenticationService.authentication(token)) {
            set403Status(response);
            return false;
         } else return true;
    }

    private void set403Status(HttpServletResponse httpServletResponse){
        httpServletResponse.setStatus(403);
    }
}
