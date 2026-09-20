package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private CheckInRepository checkInRepository;

    @GetMapping
    public String user(){
        return "Welcome to the user home page";
    }

    @GetMapping("/home")
    public String home() {
        return "Hello World";
    }

    @GetMapping ("/test")
    public Optional<User> findByUsernameIgnoreCase() {
        return userRepository.findByUsernameIgnoreCase("beccakunce03");
        }

    //this one is getting a 500 error
    @GetMapping("/find-all")
    public List<User> findAll() {
        return userRepository.findAll();
    } //500 internal server error

    //this one i dont even know how to search it - i'm searching by just the data so like becca or 3 for id or first name?
    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable int id) {
        return userRepository.findById(id);
    }

    @GetMapping("/{firstName}")
    public Optional<User> findByFirstName(@PathVariable String firstName) {
        return userRepository.findByFirstNameIgnoreCase(firstName);
    }

    @GetMapping("{lastName}")
    public Optional<User> findByLastName(@PathVariable String lastName) {
        return userRepository.findByLastNameIgnoreCase(lastName);
    }

    @PostMapping("create-form")
    public String handleForm (User user) {
        System.out.println(user);
        userRepository.save(user);
        System.out.println(user);
        return "Thank you for adding " + user.getFirstName() + " " + user.getLastName() + " to the Self Love Bombs database!";
    }
    //returns null in postman. should this be connected to the user repository with the test? No right because there isnt a form yet....

}


