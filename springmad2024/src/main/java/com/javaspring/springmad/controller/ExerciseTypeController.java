package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.ExerciseType;
import com.javaspring.springmad.service.ExerciseTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercise-type")
public class ExerciseTypeController {
	@Autowired
	private ExerciseTypeService exerciseTypeService;

	@GetMapping
	public ResponseEntity<List<ExerciseType>> getAllExerciseType() {
		List<ExerciseType> exerciseType = exerciseTypeService.getAllExerciseType();

		return new ResponseEntity<>(exerciseType, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ExerciseType> getExerciseTypeById(@PathVariable Long id) {
		ExerciseType exerciseType = exerciseTypeService.getExerciseTypeById(id);
		if (exerciseType != null) {
			return new ResponseEntity<>(exerciseType, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping
	public ResponseEntity<ExerciseType> createExerciseType(@RequestBody ExerciseType exerciseType) {
		ExerciseType createdExerciseType = exerciseTypeService.createExerciseType(exerciseType);
		if (createdExerciseType != null) {
			return new ResponseEntity<>(createdExerciseType, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<ExerciseType> updateExerciseType(@PathVariable Long id, @RequestBody ExerciseType exerciseType) {
		ExerciseType existingExerciseType = exerciseTypeService.getExerciseTypeById(id);
		if (existingExerciseType != null) {
			ExerciseType updatedExerciseType = exerciseTypeService.updateExerciseType(id, exerciseType);
			return new ResponseEntity<>(updatedExerciseType, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteExerciseType(@PathVariable Long id) {
		ExerciseType existingExerciseType = exerciseTypeService.getExerciseTypeById(id);
		if (existingExerciseType != null) {
			exerciseTypeService.deleteExerciseType(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
