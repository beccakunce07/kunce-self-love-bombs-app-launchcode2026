package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.LoveBomb;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.models.CheckIn;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.GetExchange;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.time.Month;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("love-bomb")
public class LoveBombController {

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CheckInRepository checkInRepository;

    @GetExchange("find-all")
    public List<LoveBomb> getAll() {
        return loveBombRepository.findAll();
    }

//    @GetMapping("testAddBomb")
//    public LoveBomb testBomb(){
//        LocalDateTime currentDateTime = LocalDateTime.now();
//        LoveBomb test = new LoveBomb("this is a test and you're doing great", "test category", currentDateTime)
//    }

    //this will use the CYO form on the front end.
    @PostMapping("CYO-form")
    public String handleForm(LoveBomb loveBomb){
        System.out.println(loveBomb.getMessage());
        loveBombRepository.save(loveBomb);
        System.out.println(loveBomb);
        return "Hello, here is your Love Bomb: " + loveBomb.getMessage() + " regarding " + loveBomb.getCategory() + ". This was submitted at " + loveBomb.getTimeSubmitted();
    }
}
