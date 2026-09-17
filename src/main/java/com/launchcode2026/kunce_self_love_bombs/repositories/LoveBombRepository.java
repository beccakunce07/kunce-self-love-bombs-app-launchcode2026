package com.launchcode2026.kunce_self_love_bombs.repositories;
import com.launchcode2026.kunce_self_love_bombs.models.LoveBomb;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public class LoveBombRepository extends JpaRepository<LoveBomb, Long> {
}
