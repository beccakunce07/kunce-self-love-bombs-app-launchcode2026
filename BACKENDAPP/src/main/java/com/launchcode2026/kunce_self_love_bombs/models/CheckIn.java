package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
public class CheckIn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int checkInId;

    private String checkInKey;
    private String feeling;
    private Instant recordedAt;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public CheckIn(){}

    public CheckIn(String checkInKey, String feeling, Instant recordedAt){
        this.checkInKey = checkInKey;
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

    public String getCheckInKey() {
        return checkInKey;
    }

    public void setCheckInKey(String checkInKey) {
        this.checkInKey = checkInKey;
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
