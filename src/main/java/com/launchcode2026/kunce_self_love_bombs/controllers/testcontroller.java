package com.launchcode2026.kunce_self_love_bombs.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController ("/love-bomb")
public class testcontroller {
    @GetMapping("/test")
    public String home(){
        return "<b>Hello World</b>";
    }
}
