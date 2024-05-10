package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.CustomeCollectionDetail;
import com.javaspring.springmad.repository.CustomeCollectionDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomeCollectionDetailService {

    private final CustomeCollectionDetailRepository customeCollectionDetailRepository;

    @Autowired
    public CustomeCollectionDetailService(CustomeCollectionDetailRepository customeCollectionDetailRepository) {
        this.customeCollectionDetailRepository = customeCollectionDetailRepository;
    }

    public List<CustomeCollectionDetail> getAllCustomeCollectionDetails() {
        return customeCollectionDetailRepository.findAll();
    }

    public Optional<CustomeCollectionDetail> getCustomeCollectionDetailById(Long id) {
        return customeCollectionDetailRepository.findById(id);
    }

    public CustomeCollectionDetail saveCustomeCollectionDetail(CustomeCollectionDetail customeCollectionDetail) {
        return customeCollectionDetailRepository.save(customeCollectionDetail);
    }

    public void deleteCustomeCollectionDetail(Long id) {
        customeCollectionDetailRepository.deleteById(id);
    }
}
