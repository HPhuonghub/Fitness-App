package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.ExerciseTypeDetail;
import com.javaspring.springmad.service.ExerciseTypeDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercise-type-detail")
public class ExerciseTypeDetailController {
	@Autowired
	private ExerciseTypeDetailService exerciseTypeDetailService;

	@GetMapping
	public ResponseEntity<List<ExerciseTypeDetail>> getAllExerciseTypeDetail() {
		List<ExerciseTypeDetail> exerciseType = exerciseTypeDetailService.getAllExerciseTypeDetail();

		return new ResponseEntity<>(exerciseType, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ExerciseTypeDetail> getExerciseTypeDetailById(@PathVariable Long id) {
		ExerciseTypeDetail exerciseType = exerciseTypeDetailService.getExerciseTypeDetailById(id);
		if (exerciseType != null) {
			return new ResponseEntity<>(exerciseType, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping
	public ResponseEntity<ExerciseTypeDetail> createExerciseTypeDetail(@RequestBody ExerciseTypeDetail exerciseType) {
		ExerciseTypeDetail createdExerciseTypeDetail = exerciseTypeDetailService.createExerciseTypeDetail(exerciseType);
		if (createdExerciseTypeDetail != null) {
			return new ResponseEntity<>(createdExerciseTypeDetail, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

//	@PutMapping("/{id}")
//	public ResponseEntity<ExerciseTypeDetail> updateExerciseTypeDetail(@PathVariable Long id, @RequestBody ExerciseTypeDetail exerciseType) {
//		ExerciseTypeDetail existingExerciseTypeDetail = exerciseTypeDetailService.getExerciseTypeDetailById(id);
//		if (existingExerciseTypeDetail != null) {
//			ExerciseTypeDetail updatedExerciseTypeDetail = exerciseTypeDetailService.updateExerciseTypeDetail(id, exerciseType);
//			return new ResponseEntity<>(updatedExerciseTypeDetail, HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteExerciseTypeDetail(@PathVariable Long id) {
		ExerciseTypeDetail existingExerciseTypeDetail = exerciseTypeDetailService.getExerciseTypeDetailById(id);
		if (existingExerciseTypeDetail != null) {
			exerciseTypeDetailService.deleteExerciseTypeDetail(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
