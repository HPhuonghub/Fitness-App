package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.ExerciseCollection;
import com.javaspring.springmad.repository.ExerciseCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExerciseCollectionService {
    @Autowired
    private ExerciseCollectionRepository exerciseCollectionRepository;

    public List<ExerciseCollection> getAllExerciseCollections() {
        return exerciseCollectionRepository.findAll();
    }

    public ExerciseCollection getExerciseCollectionById(Long id) {
        return exerciseCollectionRepository.findById(id).orElse(null);
    }

    public Double getTotalCalories() {
        return exerciseCollectionRepository.getTotalCalories();
    }

    public ExerciseCollection createExerciseCollection(ExerciseCollection exerciseCollection) {
        ExerciseCollection existingExerciseCollection = exerciseCollectionRepository.findByName(exerciseCollection.getName());
        if (existingExerciseCollection != null) {
            return null;
        } else {
            return exerciseCollectionRepository.save(exerciseCollection);
        }
    }

    public ExerciseCollection updateExerciseCollection(Long id, ExerciseCollection exerciseCollection) {
        Optional<ExerciseCollection> existingExerciseCollectionOptional = exerciseCollectionRepository.findById(id);
        if (existingExerciseCollectionOptional.isPresent()) {
            ExerciseCollection existingExerciseCollection = existingExerciseCollectionOptional.get();
            existingExerciseCollection.setName(exerciseCollection.getName());
            existingExerciseCollection.setPublicity(exerciseCollection.isPublicity());
            existingExerciseCollection.setCalories(exerciseCollection.getCalories());
            return exerciseCollectionRepository.save(existingExerciseCollection);
        } else {
            return null;
        }
    }


    public void deleteExerciseCollection(Long id) {
        exerciseCollectionRepository.deleteById(id);
    }

    public ExerciseCollection findExerciseCollectionByName(String name) {
        return exerciseCollectionRepository.findByName(name);
    }

    public List<ExerciseCollection> getExerciseCollectionsByUserId(Long userId) {
        return exerciseCollectionRepository.findByUserId(userId);
    }
}
