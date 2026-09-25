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
import java.util.List;
import java.util.Optional;

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

    @GetMapping("find-by-category-key/{categoryKey}")
    public ResponseEntity<List<LoveBomb>> getLoveBombsByKey(@PathVariable("categoryKey") String categoryKey) {
        if (categoryKey == null || categoryKey.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<LoveBomb> loveBombs = loveBombRepository.findByCategoryKeyContaining(categoryKey);
        if (loveBombs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(loveBombs);
    }

    // EDITING
    @PutMapping("/update/{loveBombId}")
    public ResponseEntity<?> updateLoveBomb(@PathVariable("loveBombId") int loveBombId, @RequestBody LoveBomb updatedData) {
        Optional<LoveBomb> existingLoveBombOpt = loveBombRepository.findById(loveBombId);

        if (existingLoveBombOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("oops. Love Bomb not found with id: " + loveBombId);
        }

        LoveBomb existingLoveBomb = existingLoveBombOpt.get();

        // Update love bomb fields
        existingLoveBomb.setCategoryKey(updatedData.getCategoryKey());
        if (updatedData.getMessage() != null) {
            existingLoveBomb.setMessage(updatedData.getMessage());
        }

        // Save the edits to repo
        LoveBomb savedLoveBomb = loveBombRepository.save(existingLoveBomb);
        return ResponseEntity.ok(savedLoveBomb);
    }

    //DELETE
    @DeleteMapping("/delete/{loveBombId}")
    public ResponseEntity<?> deleteLoveBomb(@PathVariable("loveBombId") int loveBombId) {
        if (!loveBombRepository.existsById(loveBombId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Love Bomb not found.");
        }
        loveBombRepository.deleteById(loveBombId);
        return ResponseEntity.ok("Love Bomb deleted successfully.");
    }
}
