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
            try {
                String email = jwtService.extractEmail(token);
                System.out.println("Extracted email: " + email);
                if (email != null) {
                    UserDetails userDetails = User.withUsername(email).password("").authorities(Collections.emptyList()).build();
                    UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("Authentication set for: " + email);
                } else {
                    System.out.println("Email is null");
                }
            } catch (Exception e) {
                System.out.println("Token invalid: " + e.getMessage());
                // Invalid token, continue without authentication
            }
        } else {
            System.out.println("No Authorization header");
        }

        filterChain.doFilter(request, response);
    }
}