package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.LoveBomb;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import jakarta.persistence.OneToMany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//add this back in if there is time with birthday and time submitted
import java.util.List;

@RestController
@RequestMapping("love-bomb")
public class LoveBombController {

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CheckInRepository checkInRepository;

    @GetMapping("find-all")
    public List<LoveBomb> findAll() {
        return loveBombRepository.findAll();
    }

    //this one gets a 404 error
    @GetMapping("find-by-key")
    public ResponseEntity<List<LoveBomb>> getLoveBombsByKey(@RequestParam(required = false) String key) {
        if (key == null || key.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<LoveBomb> loveBombs = loveBombRepository.findByKeyContaining(key);
        if (loveBombs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(loveBombs);
    }

    //400 error
    @GetMapping("find-by-keyword")
    public ResponseEntity<List<LoveBomb>> findByMessageContaining(@RequestParam(required = false) String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        List<LoveBomb> loveBombs = loveBombRepository.findByMessageContaining(keyword);
        if (loveBombs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(loveBombs);
    }
    //this will (hopefully) use the CYO form on the front endd

    @PostMapping("CYO-form")
    public String handleForm(@RequestBody LoveBomb loveBomb){
        System.out.println(loveBomb.getMessage());
        loveBombRepository.save(loveBomb);
        System.out.println(loveBomb);
        return "Hello, here is your Love Bomb: " + loveBomb.getMessage() + " regarding " + loveBomb.getKey() + ". This was submitted at " + loveBomb.getTimeSubmitted();
    }
}
