package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity

public class LoveBomb {
    @Id
    @GeneratedValue
    private int loveBombId;

    private String message;
    private String key;
    private LocalDateTime timeSubmitted;

    @ManyToMany
    @JoinTable(
            name = "users_love_bombs",
            joinColumns = @JoinColumn(name = "love_bomb_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

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
}
