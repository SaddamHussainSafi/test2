package com.furandfeathers.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**", "/uploads/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/pets/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/pets/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/adoptions/**").authenticated()
                .requestMatchers("/api/auth/me").authenticated()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(ex ->
                ex.authenticationEntryPoint(
                    (req, res, e) -> res.sendError(HttpServletResponse.SC_UNAUTHORIZED)
                )
            )
            .cors(cors -> {}); // uses your WebConfig

        return http.build();
    }
}
