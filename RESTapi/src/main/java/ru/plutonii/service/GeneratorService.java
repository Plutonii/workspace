package ru.plutonii.service;

import java.util.Random;

/**
 * Created by plutonii on 04.02.17.
 */
public class GeneratorService {
    private static String abc = "abcdefghijklmnopqrstuvwxyz";
    private static String numbers = "0123456789";
    private static int TOKEN_LENGTH = 37;

    public static String generateStrToken() {
        Random random = new Random(System.currentTimeMillis());
        char[] abc = (GeneratorService.abc + GeneratorService.numbers + GeneratorService.abc.toUpperCase()).toCharArray();
        StringBuilder token = new StringBuilder(TOKEN_LENGTH);

        for (int i = 0; i < TOKEN_LENGTH; i++) {
            token.append(abc[random.nextInt(abc.length - 1)]);
        }
        return  token.toString();
    }
}
