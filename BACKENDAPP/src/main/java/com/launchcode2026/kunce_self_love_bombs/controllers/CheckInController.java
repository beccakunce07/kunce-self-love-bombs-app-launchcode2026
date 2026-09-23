package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.CheckIn;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    @PostMapping("new-check-in")
    public CheckIn addCheckIn(@RequestBody CheckIn checkIn) {
        if (checkIn.getRecordedAt() == null) {
            checkIn.setRecordedAt(LocalDateTime.now());
        }
        return checkInRepository.save(checkIn);
    }

//this is working
    @GetMapping("testing")
    public String test() {
        return "I am here";
    }

    //this is getting a 500 request
    @GetMapping("find-all")
    public List<CheckIn> getAll(){
        return checkInRepository.findAll();

    }

}

//}
