package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class LoveBomb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loveBombId;

    private String message;
    private String categoryKey;
    private LocalDateTime timeSubmitted;

//    @ManyToMany
//    @JoinTable(
//            name = "users_love_bombs",
//            joinColumns = @JoinColumn (name = "love_bomb_id"), //primary key
//            inverseJoinColumns = @JoinColumn(name = "user_id") //foreign key
//    )
//    private List<User> users = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    public LoveBomb(){}

    public LoveBomb(String message, String categoryKey, LocalDateTime timeSubmitted){
        this.message = message;
        this.categoryKey = categoryKey;
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

    public String getCategoryKey() {
        return categoryKey;
    }

    public void setCategoryKey(String key) {
        this.categoryKey = categoryKey;
    }

    public LocalDateTime getTimeSubmitted() {
        return timeSubmitted;
    }

    public void setTimeSubmitted(LocalDateTime timeSubmitted) {
        this.timeSubmitted = timeSubmitted;
    }



}
