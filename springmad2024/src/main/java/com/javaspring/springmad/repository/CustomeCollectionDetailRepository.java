package com.javaspring.springmad.repository;

import com.javaspring.springmad.entity.CustomeCollectionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomeCollectionDetailRepository extends JpaRepository<CustomeCollectionDetail, Long> {
    // You can add custom query methods here if needed
}
