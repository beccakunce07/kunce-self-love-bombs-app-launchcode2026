package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private CheckInRepository checkInRepository;

    @GetMapping("home")
    public String home() {
        return "Hello World";
    }

    @GetMapping("find-all")
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    public Optional<User> findById(@PathVariable Long id) {
        return userRepository.findById(id);

    }

    @GetMapping("find-by-email")
    public ResponseEntity<User> getUserByEmail (@RequestParam String email){
        return ResponseEntity.of(userRepository.findByEmail(email));
    }
    }


