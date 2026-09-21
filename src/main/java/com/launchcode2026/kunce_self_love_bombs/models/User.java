package com.launchcode2026.kunce_self_love_bombs.models;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate birthday;


    @OneToMany(cascade = CascadeType.ALL)
    //i feel like is this many to many? one user may have many love bombs mbut many love bombs can have many users?
    @JoinTable
    private List<LoveBomb> loveBombs = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable
    private List<CheckIn> checkIns = new ArrayList<>();

    User() {
    }

    public User(String firstName, String lastName, String username, String email, LocalDate birthday) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.birthday = birthday;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public List<LoveBomb> getLoveBombs() {
        return loveBombs;
    }

    public void setLoveBombs(List<LoveBomb> loveBombs) {
        this.loveBombs = loveBombs;
    }

    public List<CheckIn> getCheckIns() {
        return checkIns;
    }

    public void setCheckIns(List<CheckIn> checkIns) {
        this.checkIns = checkIns;
    }
}