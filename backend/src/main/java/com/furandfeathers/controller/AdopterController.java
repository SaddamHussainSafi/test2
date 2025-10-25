package com.furandfeathers.controller;

import com.furandfeathers.entity.User;
import com.furandfeathers.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/adopter")
public class AdopterController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard(Authentication auth) {
        User adopter = userRepository.findByEmail(auth.getName()).orElseThrow();
        Map<String, Object> data = new HashMap<>();
        data.put("adopterName", adopter.getName());
        data.put("applications", new Object[0]); // list of applications
        data.put("favorites", new Object[0]); // list of favorite pets
        return data;
    }
}