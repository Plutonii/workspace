package ru.plutonii.service;

import javax.persistence.GeneratedValue;
import java.util.Random;

/**
 * Created by plutonii on 04.02.17.
 */
public class Generator {
    private static String abc = "abcdefghijklmnopqrstuvwxyz";
    private static String numbers = "0123456789";
    private static int TOKEN_LENGTH = 37;

    public static String generateStrToken() {
        Random random = new Random(System.currentTimeMillis());
        char[] abc = (Generator.abc + Generator.numbers + Generator.abc.toUpperCase()).toCharArray();
        StringBuilder token = new StringBuilder(TOKEN_LENGTH);

        for (int i = 0; i < TOKEN_LENGTH; i++) {
            token.append(abc[random.nextInt(abc.length - 1)]);
        }
        return  token.toString();
    }
}
