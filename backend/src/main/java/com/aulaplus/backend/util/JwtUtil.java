package com.aulaplus.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    
    // Clave secreta para firmar tokens (en producción usar variable de entorno)
    private static final String SECRET = "aulaplus_secret_key_2025_muy_segura_y_larga_para_jwt_tokens";
    private static final Key KEY = Keys.hmacShaKeyFor(SECRET.getBytes());
    
    // Token válido por 24 horas
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    /**
     * Genera un token JWT con información del usuario
     */
    public String generateToken(String userId, String email, String nombre, String rol) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("email", email);
        claims.put("nombre", nombre);
        claims.put("rol", rol);
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extrae todos los claims del token
     */
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extrae el email (subject) del token
     */
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * Extrae el rol del token
     */
    public String extractRol(String token) {
        return (String) extractClaims(token).get("rol");
    }

    /**
     * Extrae el userId del token
     */
    public String extractUserId(String token) {
        return (String) extractClaims(token).get("userId");
    }

    /**
     * Verifica si el token ha expirado
     */
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    /**
     * Valida el token
     */
    public boolean validateToken(String token, String email) {
        try {
            String tokenEmail = extractEmail(token);
            return (tokenEmail.equals(email) && !isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }
}
