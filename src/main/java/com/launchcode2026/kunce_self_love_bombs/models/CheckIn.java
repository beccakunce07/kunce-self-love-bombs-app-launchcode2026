package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class CheckIn {
    @Id
    private String key;
    private String feeling;
    private LocalDate recordedAt;

}
