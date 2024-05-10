package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.Exercise;
import com.javaspring.springmad.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    public Exercise getExerciseById(Long id) {
        return exerciseRepository.findById(id).orElse(null);
    }

    public Exercise createExercise(Exercise exercise) {
        Exercise existingExercise = exerciseRepository.findByName(exercise.getName());
        if (existingExercise != null) {
            return null;
        } else {
            return exerciseRepository.save(exercise);
        }
    }

    public Exercise updateExercise(Long id, Exercise exercise) {
        Optional<Exercise> existingExerciseOptional = exerciseRepository.findById(id);
        if (existingExerciseOptional.isPresent()) {
            Exercise existingExercise = existingExerciseOptional.get();
            existingExercise.setName(exercise.getName());
            existingExercise.setDetail(exercise.getDetail());
            existingExercise.setAnimation(exercise.getAnimation());
            existingExercise.setVideo(exercise.getVideo());
            return exerciseRepository.save(existingExercise);
        } else {
            return null;
        }
    }


    public void deleteExercise(Long id) {
        exerciseRepository.deleteById(id);
    }

    public Exercise findExerciseByName(String name) {
        return exerciseRepository.findByName(name);
    }
}
