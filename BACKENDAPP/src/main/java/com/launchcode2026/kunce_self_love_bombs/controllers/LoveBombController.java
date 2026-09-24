package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.LoveBomb;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//add this back in if there is time with birthday and time submitted
import java.util.List;

@RestController
@RequestMapping("/love-bomb")
@CrossOrigin ("http://localhost:5173")

public class LoveBombController {

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CheckInRepository checkInRepository;

    @GetMapping("/find-all")
    public List<LoveBomb> findAll() {
        return loveBombRepository.findAll();
    }


    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createLoveBombWithUserId(@PathVariable("userId") int userId, @RequestBody LoveBomb loveBomb){
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

    @DeleteMapping("/delete/{checkInId}")
    public ResponseEntity<?> deleteLoveBomb(@PathVariable("loveBombId") int loveBombId) {
        if (!checkInRepository.existsById(loveBombId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Check-in not found.");
        }
        checkInRepository.deleteById(loveBombId);
        return ResponseEntity.ok("Check-in deleted successfully.");
    }
    //this will (hopefully) use the CYO form on the front endd

}
