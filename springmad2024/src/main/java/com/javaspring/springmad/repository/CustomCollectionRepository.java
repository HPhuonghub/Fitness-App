package com.javaspring.springmad.repository;

import com.javaspring.springmad.entity.CustomCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomCollectionRepository extends JpaRepository<CustomCollection, Long> {
    List<CustomCollection> findByUserId(Long userId);
}
