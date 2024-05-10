package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.UserCollectionDetail;
import com.javaspring.springmad.repository.UserCollectionDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCollectionDetailService {
    @Autowired
    private UserCollectionDetailRepository userCollectionDetailRepository;

    public List<UserCollectionDetail> getAllUserCollectionDetails() {
        return userCollectionDetailRepository.findAll();
    }

    public UserCollectionDetail getUserCollectionDetailById(Long id) {
        return userCollectionDetailRepository.findById(id).orElse(null);
    }

    public UserCollectionDetail createUserCollectionDetail(UserCollectionDetail userCollectionDetail) {

            return userCollectionDetailRepository.save(userCollectionDetail);

    }

    public UserCollectionDetail updateUserCollectionDetail(Long id, UserCollectionDetail userCollectionDetail) {
        Optional<UserCollectionDetail> existingUserCollectionDetailOptional = userCollectionDetailRepository.findById(id);
        if (existingUserCollectionDetailOptional.isPresent()) {
            UserCollectionDetail existingUserCollectionDetail = existingUserCollectionDetailOptional.get();
            existingUserCollectionDetail.setExerciseCollection(userCollectionDetail.getExerciseCollection());
            existingUserCollectionDetail.setUser(userCollectionDetail.getUser());
            existingUserCollectionDetail.setState(userCollectionDetail.isState());
            return userCollectionDetailRepository.save(existingUserCollectionDetail);
        } else {
            return null;
        }
    }


    public void deleteUserCollectionDetail(Long id) {
        userCollectionDetailRepository.deleteById(id);
    }

}
