package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.ExerciseCollectionDetail;
import com.javaspring.springmad.service.ExerciseCollectionDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercise-collection-details")
public class ExerciseCollectionDetailController {

    private final ExerciseCollectionDetailService exerciseCollectionDetailService;

    public ExerciseCollectionDetailController(ExerciseCollectionDetailService exerciseCollectionDetailService) {
        this.exerciseCollectionDetailService = exerciseCollectionDetailService;
    }

    @GetMapping
        public ResponseEntity<List<ExerciseCollectionDetail>> getAllExerciseCollectionDetails() {
            List<ExerciseCollectionDetail> exerciseCollections = exerciseCollectionDetailService.getAllExerciseCollectionDetails();

            return new ResponseEntity<>(exerciseCollections, HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<ExerciseCollectionDetail> getExerciseCollectionDetailById(@PathVariable Long id) {
            ExerciseCollectionDetail exerciseCollection = exerciseCollectionDetailService.getExerciseCollectionDetailById(id);
            if (exerciseCollection != null) {
                return new ResponseEntity<>(exerciseCollection, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @PostMapping
        public ResponseEntity<ExerciseCollectionDetail> createExerciseCollectionDetail(@RequestBody ExerciseCollectionDetail exerciseCollectionDetail) {
            ExerciseCollectionDetail createdExerciseCollectionDetail = exerciseCollectionDetailService.createExerciseCollectionDetail(exerciseCollectionDetail);
            System.out.println(createdExerciseCollectionDetail);
            if (createdExerciseCollectionDetail != null) {
                return new ResponseEntity<>(createdExerciseCollectionDetail, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }

        @PutMapping("/{id}")
        public ResponseEntity<ExerciseCollectionDetail> updateExerciseCollectionDetail(@PathVariable Long id, @RequestBody ExerciseCollectionDetail exerciseCollection) {
            ExerciseCollectionDetail existingExerciseCollectionDetail = exerciseCollectionDetailService.getExerciseCollectionDetailById(id);
            if (existingExerciseCollectionDetail != null) {
                ExerciseCollectionDetail updatedExerciseCollectionDetail = exerciseCollectionDetailService.updateExerciseCollectionDetail(id, exerciseCollection);
                return new ResponseEntity<>(updatedExerciseCollectionDetail, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteExerciseCollectionDetail(@PathVariable Long id) {
            ExerciseCollectionDetail existingExerciseCollectionDetail = exerciseCollectionDetailService.getExerciseCollectionDetailById(id);
            if (existingExerciseCollectionDetail != null) {
                exerciseCollectionDetailService.deleteExerciseCollectionDetail(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }


}


