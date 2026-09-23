package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.CheckIn;
import com.launchcode2026.kunce_self_love_bombs.models.User;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("check-in")
@CrossOrigin ("http://localhost:5173/")
public class CheckInController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private CheckInRepository checkInRepository;


    //this is giving me a bad request
//    @PostMapping("new-check-in")
//    public CheckIn addCheckIn(@RequestBody CheckIn checkIn) {
//        if (checkIn.getRecordedAt() == null) {
//            checkIn.setRecordedAt(LocalDateTime.now());
//        }
//        return checkInRepository.save(checkIn);
//    }

//this is working
    @GetMapping("testing")
    public String test() {
        return "I am here";
    }

    @PostMapping("/create-check-in")
    public ResponseEntity<CheckIn> createCheckIn (@RequestBody CheckIn checkIn){
        return ResponseEntity.ok(checkInRepository.save(checkIn));}

    @PostMapping("/user/{userId}")
    //after way too long of googling, realizing there was a type error with the possibility of returning the error string. had to make it a ? like oh i dont know what is gonna happen.

    public ResponseEntity<?> createCheckIn(@PathVariable int userId, @RequestBody CheckIn checkIn) {
        User user = userRepository.findByUserId(userId);
        if (user == null)
            return ResponseEntity.status(404).body("oops. No user found with id " + userId);
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
