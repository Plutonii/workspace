package ru.plutonii.service;


import javax.servlet.http.HttpServletRequest;

/**
 * Created by plutonii on 04.02.17.
 */
public interface AuthentificationService {
    boolean authentification(HttpServletRequest request);
}
