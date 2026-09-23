package com.launchcode2026.kunce_self_love_bombs.repositories;
import com.launchcode2026.kunce_self_love_bombs.models.CheckIn;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckInRepository extends JpaRepository<CheckIn, Integer> {
    List<CheckIn> findByUser_userId(int userId);
}
