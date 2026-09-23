package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.CheckIn;
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
    @Autowired
    private CheckInRepository checkInRepository;

    @GetMapping("/find-all")
    public List<User> findAll() {
        return userRepository.findAll();
    } //500 internal server error

    @PostMapping("/create-form")
    public ResponseEntity<User> createUser (@RequestBody User user){
        return ResponseEntity.ok(userRepository.save(user));}

    @GetMapping("find-by-last-name-{lastName}")
    public List<User> findByLastName(@PathVariable("lastName") String lastName) {
        return userRepository.findByLastNameIgnoreCase (lastName);}

    @GetMapping("find-by-first-name-{firstName}")
    public List<User> findByFirstName(@PathVariable("firstName") String firstName) {
        return userRepository.findByFirstNameIgnoreCase (firstName);}

    @GetMapping("find-by-username-{userName}")
    public List<User> findByUsername(@PathVariable("username") String username) {
        return userRepository.findByUsernameIgnoreCase(username);}

    @GetMapping("find-by-userId-{userId}")
    public User findByUserId(@PathVariable("userId") int userId) {
        return userRepository.findByUserId(userId);}





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

    }


    //returns null in postman. should this be connected to the user repository with the test? No right because there isnt a form yet....




