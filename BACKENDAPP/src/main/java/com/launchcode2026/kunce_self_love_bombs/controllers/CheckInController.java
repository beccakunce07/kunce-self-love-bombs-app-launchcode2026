package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.CheckIn;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/check-in")
@CrossOrigin ("http://localhost:5173")
public class CheckInController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private CheckInRepository checkInRepository;

    //Adding a check in and attaching it to a user.
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createCheckInWithUserId(@PathVariable("userId") int userId, @RequestBody CheckIn checkIn) {
        User user = userRepository.findByUserId(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("oops. No user found with id " + userId);
        }
        checkIn.setUser(user);
        CheckIn savedCheckIn = checkInRepository.save(checkIn);
        return ResponseEntity.ok(savedCheckIn);
    }
    @GetMapping("/find-by-user-id/{userId}")
    public ResponseEntity<List<CheckIn>> getCheckInsByUserId(@PathVariable ("userId") int userId){
        List<CheckIn> checkIns = checkInRepository.findByUser_UserId(userId);
        return ResponseEntity.ok(checkIns);
    }

    @GetMapping("find-all")
    public List<CheckIn> getAll(){
        return checkInRepository.findAll();

    }

    @DeleteMapping("/delete/{checkInId}")
    public ResponseEntity<?> deleteCheckIn(@PathVariable("checkInId") int checkInId) {
        if (!checkInRepository.existsById(checkInId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Check-in not found.");
        }
        checkInRepository.deleteById(checkInId);
        return ResponseEntity.ok("Check-in deleted successfully.");
    }


    @PutMapping("/update/{checkInId}")
    public ResponseEntity<?> updateCheckIn(@PathVariable("checkInId") int checkInId, @RequestBody CheckIn updatedCheckIn) {
        java.util.Optional<CheckIn> checkInOptional = checkInRepository.findById(checkInId);

        if (checkInOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Check-in not found.");
        }

        CheckIn existingCheckIn = checkInOptional.get();

        //need to apply the updates so forcing it to update this
        existingCheckIn.setFeeling(updatedCheckIn.getFeeling());
        existingCheckIn.setCategoryKey(updatedCheckIn.getCategoryKey());

        // save updated check in into repo
        CheckIn savedCheckIn = checkInRepository.save(existingCheckIn);

        return ResponseEntity.ok(savedCheckIn);
    }

}


