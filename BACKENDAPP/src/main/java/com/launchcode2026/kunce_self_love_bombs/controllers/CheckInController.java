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
import java.util.Optional;

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

    @GetMapping("testing")
    public String test() {
        return "I am here";
    }

//    @PostMapping("/create-check-in")
//    public ResponseEntity<?> createCheckIn(@RequestBody CheckIn checkIn) {
//        // 2. Fetch the user using the userId sent from the React frontend
//        Optional<User> userOptional = userRepository.findById(checkIn.getUserId());
//
//        if (userOptional.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body("Error: User with ID " + checkIn.getUserId() + " not found.");
//        }
//        checkIn.setUser(userOptional.get());
//
//        CheckIn savedCheckIn = checkInRepository.save(checkIn);
//        return ResponseEntity.ok(savedCheckIn);
//    }

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
    @GetMapping("/find-by-user-id-{userId}")
    public ResponseEntity<List<CheckIn>> getCheckInsByUserId(@PathVariable int userId){
        List<CheckIn> checkIns = checkInRepository.findByUser_UserId(userId);
        return ResponseEntity.ok(checkIns);
    }

    @GetMapping("find-all")
    public List<CheckIn> getAll(){
        return checkInRepository.findAll();

    }

}

//}
