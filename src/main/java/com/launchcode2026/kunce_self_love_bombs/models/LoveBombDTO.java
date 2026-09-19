package com.launchcode2026.kunce_self_love_bombs.models;

import java.time.LocalDateTime;

public class LoveBombDTO {
    private String message;
    private String category;
    private LocalDateTime timeSubmitted;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDateTime getTimeSubmitted() {
        return timeSubmitted;
    }

    public void setTimeSubmitted(LocalDateTime timeSubmitted) {
        this.timeSubmitted = timeSubmitted;
    }
}
