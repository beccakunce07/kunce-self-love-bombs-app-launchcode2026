package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.LoveBomb;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.models.CheckIn;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import jakarta.persistence.OneToMany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.GetExchange;
//add this back in if there is time with birthday and time submitted
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

    @OneToMany


    @GetMapping("find-all")
    public List<LoveBomb> findAll() {
        return loveBombRepository.findAll();
    }

    @GetMapping("find-by-category")
    public ResponseEntity<List<LoveBomb>> getLoveBombsByCategory(@RequestParam String category) {
        List<LoveBomb> loveBombs = loveBombRepository.findByCategoryIgnoreCase(category);

        if (loveBombs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(loveBombs);
    }

    @GetMapping("find-by-keyword")
    public ResponseEntity<List<LoveBomb>> getLoveBombsByKeyword(@RequestParam String keyword) {
        List<LoveBomb> loveBombs = loveBombRepository.findByMessageContainingIgnoreCase(keyword);
        if (loveBombs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(loveBombs);
    }

    //this will (hopefully) use the CYO form on the front endd

    @PostMapping("CYO-form")
    public String handleForm(LoveBomb loveBomb){
        System.out.println(loveBomb.getMessage());
        loveBombRepository.save(loveBomb);
        System.out.println(loveBomb);
        return "Hello, here is your Love Bomb: " + loveBomb.getMessage() + " regarding " + loveBomb.getCategory() + ". This was submitted at " + loveBomb.getTimeSubmitted();
    }
}
