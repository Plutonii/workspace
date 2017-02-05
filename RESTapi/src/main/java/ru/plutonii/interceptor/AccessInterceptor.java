package ru.plutonii.interceptor;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * Created by plutonii on 01.02.17.
 */
public class AccessInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(javax.servlet.http.HttpServletRequest request,
                             javax.servlet.http.HttpServletResponse response, Object handler) {
        String token = request.getHeader("token");
        if (token != null && token.equals("123"))

        {
            request.setAttribute("abcdf", id);
            return true;
        } else

        {
            System.out.println(false);
            response.setStatus(403);
            return false;
        }
    }
}
