package com.launchcode2026.kunce_self_love_bombs.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class LoveBomb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loveBombId;

    private String message;

    @JsonProperty("categoryKey")
    private String categoryKey;

    private Instant timeSubmitted;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    @JsonIgnore //Hopefully this stops the loop going from check in to lovebomb and vice versa
    private User user;

//    @ManyToMany(mappedBy = "loveBombs", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private List<CheckIn> checkIns = new ArrayList<>();

    public LoveBomb(){}

    public int getUserId() {
        return this.user != null ? this.user.getUserId() : 0;
    }

    public void setUserId(int userId) {
        if (this.user == null) {
            this.user = new User();
        }
        this.user.setUserId(userId);
    }


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
        this.categoryKey = key;
    }

    public Instant getTimeSubmitted() {
        return timeSubmitted;
    }

    public void setTimeSubmitted(Instant timeSubmitted) {
        this.timeSubmitted = timeSubmitted;
    }

//    public List<CheckIn> getCheckIns() {
//        return checkIns;
//    }
//
//    public void setCheckIns(List<CheckIn> checkIns) {
//        this.checkIns = checkIns;
//    }
}
