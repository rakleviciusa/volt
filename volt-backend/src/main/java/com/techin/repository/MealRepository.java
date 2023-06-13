package com.techin.repository;

import com.techin.models.Meal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRepository extends JpaRepository<Meal, Long> {
    boolean existsByTitle(String title);
}
