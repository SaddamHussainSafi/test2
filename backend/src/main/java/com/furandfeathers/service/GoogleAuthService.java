package com.furandfeathers.service;

import com.furandfeathers.entity.User;
import com.furandfeathers.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

@Service
public class GoogleAuthService {

    private final UserRepository userRepository;

    @Value("${google.client.id}")
    private String googleClientId;

    public GoogleAuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> verifyGoogleToken(String token) {
        try {
            System.out.println("Verifying token for: " + googleClientId);
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance())
                .setAudience(Arrays.asList(
                    "1047749868973-5k7qq63t5o34f4usvtj74rfo05t3adlm.apps.googleusercontent.com", // frontend ID
                    googleClientId // backend ID if any
                ))
                .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken == null) {
                System.out.println("⚠️ Google token verification failed (null idToken)");
                return Optional.empty();
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");

            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setPicture(picture);
                newUser.setProvider("google");
                newUser.setVerified(true);
                // Set a dummy password for Google users since password is NOT NULL in DB
                newUser.setPassword("GOOGLE_AUTH_NO_PASSWORD");
                return userRepository.save(newUser);
            });

            return Optional.of(user);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
