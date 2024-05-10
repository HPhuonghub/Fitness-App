package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.ExerciseCollection;
import com.javaspring.springmad.service.ExerciseCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercise-collection")
public class ExerciseCollectionController {

    @Autowired
    private ExerciseCollectionService exerciseCollectionService;

    @GetMapping
    public ResponseEntity<List<ExerciseCollection>> getAllExerciseCollections() {
        List<ExerciseCollection> exerciseCollections = exerciseCollectionService.getAllExerciseCollections();

        return new ResponseEntity<>(exerciseCollections, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExerciseCollection> getExerciseCollectionById(@PathVariable Long id) {
        ExerciseCollection exerciseCollection = exerciseCollectionService.getExerciseCollectionById(id);
        if (exerciseCollection != null) {
            return new ResponseEntity<>(exerciseCollection, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<ExerciseCollection> createExerciseCollection(@RequestBody ExerciseCollection exerciseCollection) {
        ExerciseCollection createdExerciseCollection = exerciseCollectionService.createExerciseCollection(exerciseCollection);
        if (createdExerciseCollection != null) {
            return new ResponseEntity<>(createdExerciseCollection, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExerciseCollection> updateExerciseCollection(@PathVariable Long id, @RequestBody ExerciseCollection exerciseCollection) {
        ExerciseCollection existingExerciseCollection = exerciseCollectionService.getExerciseCollectionById(id);
        if (existingExerciseCollection != null) {
            ExerciseCollection updatedExerciseCollection = exerciseCollectionService.updateExerciseCollection(id, exerciseCollection);
            return new ResponseEntity<>(updatedExerciseCollection, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExerciseCollection(@PathVariable Long id) {
        ExerciseCollection existingExerciseCollection = exerciseCollectionService.getExerciseCollectionById(id);
        if (existingExerciseCollection != null) {
            exerciseCollectionService.deleteExerciseCollection(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public List<ExerciseCollection> getExerciseCollectionsByUserId(@PathVariable Long userId) {
        return exerciseCollectionService.getExerciseCollectionsByUserId(userId);
    }


}


