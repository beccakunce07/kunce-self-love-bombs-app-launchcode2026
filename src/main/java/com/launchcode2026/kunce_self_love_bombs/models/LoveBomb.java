package com.launchcode2026.kunce_self_love_bombs.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table
@Data
public class LoveBomb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private String category;
    private LocalDate timeSubmitted;

}
