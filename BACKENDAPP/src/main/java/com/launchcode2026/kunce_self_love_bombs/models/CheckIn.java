package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CheckIn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int checkInId;

    private String categoryKey;
    private String feeling;
    private Instant recordedAt;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany (fetch = FetchType.LAZY)
    @JoinTable(
            name = "checkin_lovebomb",
            joinColumns = @JoinColumn(name = "check_in_id"),
            inverseJoinColumns = @JoinColumn(name = "love_bomb_id")
    )
    private List<LoveBomb> loveBombs = new ArrayList<>();


    public CheckIn(){}

    public CheckIn(String categoryKey, String feeling, Instant recordedAt){
        this.categoryKey = categoryKey;
        this.feeling = feeling;
        this.recordedAt = recordedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getCheckInId() {
        return checkInId;
    }

    public void setCheckInId(int checkInId) {
        this.checkInId = checkInId;
    }

    public String getCategoryKey() {
        return categoryKey;
    }

    public void setCategoryKey(String categoryKey) {
        this.categoryKey = categoryKey;
    }

    public List<LoveBomb> getLoveBombs() {
        return loveBombs;
    }

    public void setLoveBombs(List<LoveBomb> loveBombs) {
        this.loveBombs = loveBombs;
    }

    public String getFeeling() {
        return feeling;
    }

    public void setFeeling(String feeling) {
        this.feeling = feeling;
    }

    public Instant getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(Instant recordedAt) {
        this.recordedAt = recordedAt;
    }

}
