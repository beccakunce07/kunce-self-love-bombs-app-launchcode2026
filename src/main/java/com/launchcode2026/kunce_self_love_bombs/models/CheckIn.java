package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CheckIn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int checkInId;
    private String key;
    private String feeling;
    private LocalDateTime recordedAt;

    @ManyToMany
    @JoinTable(
            name = "users_check_ins",
            joinColumns = @JoinColumn (name = "check_in_id)"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<CheckIn> checkIns = new ArrayList<>();

    public int getCheckInId() {
        return checkInId;
    }

    public void setCheckInId(int checkInId) {
        this.checkInId = checkInId;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getFeeling() {
        return feeling;
    }

    public void setFeeling(String feeling) {
        this.feeling = feeling;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    public void setRecordedAt(LocalDateTime recordedAt) {
        this.recordedAt = recordedAt;
    }

}
