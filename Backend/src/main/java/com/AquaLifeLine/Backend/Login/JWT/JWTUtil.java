package com.AquaLifeLine.Backend.Login.JWT;


import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
    
    private final String secretKey = "mySecretKey12345mySecretKey12345";  // Geheimer Schlüssel eingeben

    private final SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Token löuft in 1 Stunde ab
                .signWith(key)
                .compact();
        
    } public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
