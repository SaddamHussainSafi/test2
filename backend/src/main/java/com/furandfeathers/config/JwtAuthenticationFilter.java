package com.furandfeathers.config;

import com.furandfeathers.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("Received token: " + token.substring(0, Math.min(20, token.length())) + "...");
            System.out.println("Token length: " + token.length());
            try {
                String email = jwtService.extractEmail(token);
                System.out.println("Extracted email: " + email);
                if (email != null && !email.isEmpty()) {
                    UserDetails userDetails = User.withUsername(email)
                            .password("")
                            .authorities(Collections.emptyList())
                            .build();
                    UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("✓ Authentication successfully set for: " + email);
                } else {
                    System.out.println("✗ Email extracted is null or empty");
                }
            } catch (io.jsonwebtoken.security.SignatureException e) {
                System.out.println("✗ Token signature validation failed: " + e.getMessage());
            } catch (io.jsonwebtoken.ExpiredJwtException e) {
                System.out.println("✗ Token has expired: " + e.getMessage());
            } catch (io.jsonwebtoken.MalformedJwtException e) {
                System.out.println("✗ Token is malformed: " + e.getMessage());
            } catch (Exception e) {
                System.out.println("✗ Token validation failed (" + e.getClass().getSimpleName() + "): " + e.getMessage());
                e.printStackTrace();
            }
        } else {
            System.out.println("No Authorization header found");
        }

        filterChain.doFilter(request, response);
    }
}
