package ru.plutonii.access;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * Created by plutonii on 01.02.17.
 */
public class AccessInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response, Object handler) throws Exception {
        System.out.println("inHandler");
        Integer id = 2;
        String token = request.getHeader("token");
        if (token != null && token.equals("123")){
            request.setAttribute("abcdf", id);
            return true;
        } else {
            response.setStatus(403);
            return false;
        }
    }
}
