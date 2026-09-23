package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin ("http://localhost:5173/")
public class UserController {

    //Injecting the user repository
    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private LoveBombRepository loveBombRepository;
//
//    @Autowired
//    private CheckInRepository checkInRepository;

    @GetMapping
    public String user(){
        return "Welcome to the user home page";
    }

    @GetMapping("/home")
    public String home() {
        return "Hello World";
    }

    @GetMapping("/find-all")
    public List<User> findAll() {
        return userRepository.findAll();
    } //500 internal server error

    @PostMapping("/create-form")
    public ResponseEntity<User> createUser (@RequestBody User user){
        return ResponseEntity.ok(userRepository.save(user));
    }

//    String handleForm (User user) {
//        System.out.println(user);
//        userRepository.save(user);
//        System.out.println(user);
//        return "Thank you for adding " + user.getFirstName() + " " + user.getLastName() + " to the Self Love Bombs database!";
//    }
//


    //this one i dont even know how to search it - i'm searching by just the data so like becca or 3 for id or first name?
//    @GetMapping("/{id}")
//    public Optional<User> findById(@PathVariable int id) {
//        return userRepository.findById(id);
//    }
//
//    @GetMapping("/{firstName}")
//    public Optional<User> findByFirstName(@PathVariable String firstName) {
//        return userRepository.findByFirstName(firstName);
//    }
//
//    @GetMapping("{lastName}")
//    public Optional<User> findByLastName(@PathVariable String lastName) {
//        return userRepository.findByLastName (lastName);
//    }


    //returns null in postman. should this be connected to the user repository with the test? No right because there isnt a form yet....

}


