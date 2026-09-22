package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class LoveBomb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loveBombId;
    private String message;
    private String key;
    private LocalDateTime timeSubmitted;

//    @ManyToMany
//    @JoinTable(
//            name = "users_love_bombs",
//            joinColumns = @JoinColumn (name = "love_bomb_id"), //primary key
//            inverseJoinColumns = @JoinColumn(name = "user_id") //foreign key
//    )
//    private List<User> users = new ArrayList<>();

    @ManyToMany (mappedBy = "loveBombs")
    private List<User> userList = new ArrayList<>();

    public LoveBomb(){}

    public LoveBomb(String message, String key, LocalDateTime timeSubmitted){
        this.message = message;
        this.key = key;
        this.timeSubmitted = timeSubmitted;
    }

    public int getLoveBombId() {
        return loveBombId;
    }

    public void setLoveBombId(int loveBombId) {
        this.loveBombId = loveBombId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public LocalDateTime getTimeSubmitted() {
        return timeSubmitted;
    }

    public void setTimeSubmitted(LocalDateTime timeSubmitted) {
        this.timeSubmitted = timeSubmitted;
    }

    public List <User> getUserList() {return userList;}

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }


}
