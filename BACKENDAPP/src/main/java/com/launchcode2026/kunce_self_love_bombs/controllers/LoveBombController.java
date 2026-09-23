package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.LoveBomb;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//add this back in if there is time with birthday and time submitted
import java.util.List;

@RestController
@RequestMapping("love-bomb")
@CrossOrigin ("http://localhost:5173/")

public class LoveBombController {

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CheckInRepository checkInRepository;

    //this one is working!!
    @GetMapping("find-all")
    public List<LoveBomb> findAll() {
        return loveBombRepository.findAll();
    }

    //this one gets a 404 error
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createLoveBomb (@PathVariable("userId") int userId, @RequestBody LoveBomb loveBomb){
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            return ResponseEntity.status(404).body("oops. No user found with id: " + userId);
        }
        loveBomb.setUser(user);

        LoveBomb savedLoveBomb = loveBombRepository.save(loveBomb);

        return ResponseEntity.ok(savedLoveBomb);
    }

    @GetMapping("find-by-category-key")
    public ResponseEntity<List<LoveBomb>> getLoveBombsByKey(@RequestParam(required = false) String categoryKey) {
        if (categoryKey == null || categoryKey.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<LoveBomb> loveBombs = loveBombRepository.findByCategoryKeyContaining(categoryKey);
        if (loveBombs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(loveBombs);
    }

    //
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
        return "Hello, here is your Love Bomb: " + loveBomb.getMessage() + " regarding " + loveBomb.getCategoryKey() + ". This was submitted at " + loveBomb.getTimeSubmitted();
    }
}
