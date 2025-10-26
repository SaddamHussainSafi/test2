package com.furandfeathers.controller;

import com.furandfeathers.entity.User;
import com.furandfeathers.repository.UserRepository;
import com.furandfeathers.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/shelter")
public class ShelterController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard(Authentication auth) {
        User shelter = userRepository.findByEmail(auth.getName()).orElseThrow();
        long totalPets = petRepository.findByShelter(shelter).size();
        // Mock data for now
        Map<String, Object> data = new HashMap<>();
        data.put("shelterName", shelter.getName());
        data.put("totalPets", totalPets);
        data.put("adoptedPets", 5); // from view later
        data.put("pendingRequests", 3);
        data.put("views", 120);
        data.put("analytics", new Object[0]); // chart data
        return data;
    }

    @GetMapping
    public List<User> getShelters(@RequestParam(required = false) Boolean verified) {  
        return userRepository.findAll();
    }
}
