package com.techin.controllers;

import com.techin.models.Meal;
import com.techin.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class MealController {

    @Autowired
    private MealRepository mealRepository;

    @GetMapping("allMeals")
    public ResponseEntity<List<Meal>> getAllMeals(){
        try {
            List<Meal> meals = new ArrayList<>();
            mealRepository.findAll().forEach(meals::add);

            if(meals.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(meals, HttpStatus.OK);
        }

        catch (Exception exception){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getMealsById/{id}")
    public ResponseEntity<Meal> getTimeById(@PathVariable Long id){
        Optional<Meal> mealsData = mealRepository.findById(id);

        if (mealsData.isPresent()){
            return new ResponseEntity<>(mealsData.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addMeal")
    public ResponseEntity<Meal> addMeal(@RequestBody Meal meal){
        boolean mealExists = mealRepository.existsByTitle(meal.getTitle());

        if(mealExists){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            Meal mealObject = mealRepository.save(meal);
            return new ResponseEntity<>(mealObject, HttpStatus.OK);
        }
    }

    @PostMapping("/updateMealById/{id}")
    public ResponseEntity<Meal> updateBookById(@PathVariable Long id, @RequestBody Meal meal){
        Optional<Meal> mealData = mealRepository.findById(id);

        if (mealData.isPresent()){
            Meal updatedMeal = mealData.get();
            updatedMeal.setTitle(meal.getTitle());
            updatedMeal.setDescription(meal.getDescription());
            updatedMeal.setQuantity(meal.getQuantity());

            Meal mealObject = mealRepository.save(updatedMeal);

            return new ResponseEntity<>(mealObject, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteMealById")
    public ResponseEntity<Meal> deleteMealById(@PathVariable Long id){
        mealRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
