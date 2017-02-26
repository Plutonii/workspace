package ru.plutonii.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import ru.plutonii.service.AuthenticationService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by plutonii on 01.02.17.
 */
@Component
public class AccessChecksInterceptor extends HandlerInterceptorAdapter {

    private AuthenticationService authenticationService;
    private String token;

    @Autowired
    public AccessChecksInterceptor(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    public boolean preHandle(javax.servlet.http.HttpServletRequest request,
                             HttpServletResponse response, Object handler) {
        if (!request.getMethod().equals("OPTIONS")) {//Костыль (CROS + Interceptor)
            token = request.getHeader("token");
            if (token == null) {
                set401Status(response);
                return false;
            }
            if (!authenticationService.authentication(token)) {
                set401Status(response);
                return false;
            } else return true;
        } else return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (!request.getMethod().equals("OPTIONS")) {
            response.setHeader("token", token);
            token = "";
        }
    }

    private void set401Status(HttpServletResponse httpServletResponse) {
        httpServletResponse.setStatus(401);
    }
}
