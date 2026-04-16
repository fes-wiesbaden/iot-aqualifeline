package com.AquaLifeLine.Backend;

import java.time.Year;
import java.util.Random;

public class SerialNumberGenerator {
    private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final Random random = new Random();

    public static String generateSerialNumber() {
        return randomBlock(4) + "-" + 
        randomBlock(4) + "-" +
        Year.now().getValue() + "-" + 
        randomBlock(4);
    }

    private static String randomBlock(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(CHARS.charAt(random.nextInt(CHARS.length())));
        }
        return sb.toString();
    }
}
