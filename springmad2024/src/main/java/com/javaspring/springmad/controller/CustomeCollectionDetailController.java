package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.CustomeCollectionDetail;
import com.javaspring.springmad.service.CustomeCollectionDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/custom_collection_details")
public class CustomeCollectionDetailController {

    private final CustomeCollectionDetailService customeCollectionDetailService;

    @Autowired
    public CustomeCollectionDetailController(CustomeCollectionDetailService customeCollectionDetailService) {
        this.customeCollectionDetailService = customeCollectionDetailService;
    }

    @GetMapping
    public ResponseEntity<List<CustomeCollectionDetail>> getAllCustomeCollectionDetails() {
        List<CustomeCollectionDetail> customeCollectionDetails = customeCollectionDetailService.getAllCustomeCollectionDetails();
        return new ResponseEntity<>(customeCollectionDetails, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomeCollectionDetail> getCustomeCollectionDetailById(@PathVariable("id") Long id) {
        Optional<CustomeCollectionDetail> customeCollectionDetail = customeCollectionDetailService.getCustomeCollectionDetailById(id);
        return customeCollectionDetail.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<CustomeCollectionDetail> createCustomeCollectionDetail(@RequestBody CustomeCollectionDetail customeCollectionDetail) {
        CustomeCollectionDetail savedCustomeCollectionDetail = customeCollectionDetailService.saveCustomeCollectionDetail(customeCollectionDetail);
        return new ResponseEntity<>(savedCustomeCollectionDetail, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomeCollectionDetail(@PathVariable("id") Long id) {
        customeCollectionDetailService.deleteCustomeCollectionDetail(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
