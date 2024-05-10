package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.CustomCollection;
import com.javaspring.springmad.entity.CustomeCollectionDetail;
import com.javaspring.springmad.entity.Exercise;
import com.javaspring.springmad.entity.User;
import com.javaspring.springmad.repository.CustomCollectionRepository;
import com.javaspring.springmad.repository.ExerciseRepository;
import com.javaspring.springmad.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomCollectionService {

    @Autowired
    private CustomCollectionRepository customCollectionRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserRepository userRepository;


    public List<CustomCollection> getAllCustomCollections() {
        return customCollectionRepository.findAll();
    }

    public Optional<CustomCollection> getCustomCollectionById(Long id) {
        return customCollectionRepository.findById(id);
    }

    public CustomCollection saveCustomCollection(CustomCollection customCollection) {
        User user = userRepository.findById(customCollection.getUser().getId()).get();
        for (CustomeCollectionDetail customeCollectionDetail : customCollection.getCustomeCollectionDetails()) {
            Exercise exercise = exerciseRepository.findById(customeCollectionDetail.getExercise().getId()).get();
            customeCollectionDetail.setExercise(exercise);
        }
        customCollection.setUser(user);
        return customCollectionRepository.save(customCollection);
    }

    public void deleteCustomCollection(Long id) {
        customCollectionRepository.deleteById(id);
    }

    public List<CustomCollection> getCustomCollectionsByUserId(Long userId) {
        return customCollectionRepository.findByUserId(userId);
    }
}
