package com.launchcode2026.kunce_self_love_bombs.repositories;
import com.launchcode2026.kunce_self_love_bombs.models.LoveBomb;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoveBombRepository extends JpaRepository<LoveBomb, Integer>{
    List<LoveBomb> findByMessageContaining(String keyword);
    List<LoveBomb> findByCategoryKeyContaining(String categoryKey);

}
