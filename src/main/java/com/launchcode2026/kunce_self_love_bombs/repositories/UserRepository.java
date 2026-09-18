package com.launchcode2026.kunce_self_love_bombs.repositories;

import com.launchcode2026.kunce_self_love_bombs.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User, Long>{
    Optional<User> findByFirstNameIgnoreCase (String firstName);
    Optional<User> findByLastNameIgnoreCase (String firstName);
}
