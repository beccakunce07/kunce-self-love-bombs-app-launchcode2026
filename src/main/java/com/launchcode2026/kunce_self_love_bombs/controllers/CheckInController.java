package com.launchcode2026.kunce_self_love_bombs.controllers;

import com.launchcode2026.kunce_self_love_bombs.models.CheckIn;
import com.launchcode2026.kunce_self_love_bombs.repositories.CheckInRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.LoveBombRepository;
import com.launchcode2026.kunce_self_love_bombs.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("check-in")
public class CheckInController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoveBombRepository loveBombRepository;

    @Autowired
    private CheckInRepository checkInRepository;

//    @PostMapping
//    public CheckIn addCheckIn(String key, String feeling, LocalDateTime recordedAt){
//        CheckIn checkIn = new CheckIn(key, feeling, recordedAt);
//        checkInRepository.save(checkIn);
//        return checkIn;

    }

//    @GetMapping("testing")
//        public String test() {
//            return "I am here";
//        }


//    @GetMapping("find-all")
//    public List<CheckIn> getAll(){
//        return checkInRepository.findAll();
//
//    }
//}
