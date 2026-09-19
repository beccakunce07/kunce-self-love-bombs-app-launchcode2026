package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table
public class LoveBomb {
    @Id
    @GeneratedValue
    private int id;

    private String message;
    private String category;
    private LocalDateTime timeSubmitted;

}
