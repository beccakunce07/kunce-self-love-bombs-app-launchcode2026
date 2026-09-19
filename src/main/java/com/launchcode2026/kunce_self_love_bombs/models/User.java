package com.launchcode2026.kunce_self_love_bombs.models;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Long id;

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private LocalDate birthday;

    @OneToMany (cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<LoveBomb> loveBombs = new ArrayList<>();

    @OneToMany (cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<CheckIn> checkIns = new ArrayList<>();

    public User(String firstName, String lastName, String username, String email, LocalDate birthday){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.birthday = birthday;
    }
}
