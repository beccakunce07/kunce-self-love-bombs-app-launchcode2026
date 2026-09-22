package com.launchcode2026.kunce_self_love_bombs.repositories;



import com.launchcode2026.kunce_self_love_bombs.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User, Integer>{
    Optional<User> findByUsername (String username);
    Optional<User> findByFirstName (String firstName);
    Optional<User> findByLastName (String lastName);

}
