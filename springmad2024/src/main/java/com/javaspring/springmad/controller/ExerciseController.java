package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.Exercise;
import com.javaspring.springmad.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

        @Autowired
        private ExerciseService exerciseService;

        @GetMapping
        public ResponseEntity<List<Exercise>> getAllExercises() {
            List<Exercise> exercises = exerciseService.getAllExercises();

            return new ResponseEntity<>(exercises, HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
            Exercise exercise = exerciseService.getExerciseById(id);
            if (exercise != null) {
                return new ResponseEntity<>(exercise, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PostMapping
        public ResponseEntity<Exercise> createExercise(@RequestBody Exercise exercise) {
            Exercise createdExercise = exerciseService.createExercise(exercise);
            if (createdExercise != null) {
                return new ResponseEntity<>(createdExercise, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }

        @PutMapping("/{id}")
        public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Exercise exercise) {
            Exercise existingExercise = exerciseService.getExerciseById(id);
            if (existingExercise != null) {
                Exercise updatedExercise = exerciseService.updateExercise(id, exercise);
                return new ResponseEntity<>(updatedExercise, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
            Exercise existingExercise = exerciseService.getExerciseById(id);
            if (existingExercise != null) {
                exerciseService.deleteExercise(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }


}


