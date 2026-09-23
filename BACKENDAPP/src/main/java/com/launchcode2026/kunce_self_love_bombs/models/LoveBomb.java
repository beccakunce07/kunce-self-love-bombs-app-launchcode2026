package com.launchcode2026.kunce_self_love_bombs.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class LoveBomb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loveBombId;

    private String message;
    @JsonProperty ("categoryKey")
    private String categoryKey;
    private Instant timeSubmitted;

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

    @ManyToMany (mappedBy = "loveBombs", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("loveBombs")
    private List<CheckIn> checkIns = new ArrayList<>();


    public LoveBomb(){}

    public User getUser() {
        return user;
    }

    public void setUser(User user){
        this.user = user;
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

    public Instant getTimeSubmitted() {
        return timeSubmitted;
    }

    public void setTimeSubmitted(Instant timeSubmitted) {
        this.timeSubmitted = timeSubmitted;
    }

    public List<CheckIn> getCheckIns() {
        return checkIns;
    }

    public void setCheckIns(List<CheckIn> checkIns) {
        this.checkIns = checkIns;
    }
}
