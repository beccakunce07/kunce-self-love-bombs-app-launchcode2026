package com.launchcode2026.kunce_self_love_bombs.models;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String location;
    private LocalDate birthday;

    @OneToMany(cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();

    public User(){}

    public User(Long id, String firstName, String lastName, String username, String email, String location, LocalDate birthday){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.location = location;
        this.birthday = birthday;
    }
}
