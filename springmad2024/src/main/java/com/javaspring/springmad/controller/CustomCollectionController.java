package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.CustomCollection;
import com.javaspring.springmad.service.CustomCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/custom_collections")
public class CustomCollectionController {

    private final CustomCollectionService customCollectionService;

    @Autowired
    public CustomCollectionController(CustomCollectionService customCollectionService) {
        this.customCollectionService = customCollectionService;
    }

    @GetMapping
    public ResponseEntity<List<CustomCollection>> getAllCustomCollections() {
        List<CustomCollection> customCollections = customCollectionService.getAllCustomCollections();
        return new ResponseEntity<>(customCollections, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomCollection> getCustomCollectionById(@PathVariable("id") Long id) {
        Optional<CustomCollection> customCollection = customCollectionService.getCustomCollectionById(id);
        return customCollection.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<CustomCollection> createCustomCollection(@RequestBody CustomCollection customCollection) {
        CustomCollection savedCustomCollection = customCollectionService.saveCustomCollection(customCollection);
        return new ResponseEntity<>(savedCustomCollection, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomCollection(@PathVariable("id") Long id) {
        customCollectionService.deleteCustomCollection(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<CustomCollection>> getCustomCollectionsByUser(@PathVariable("userId") Long userId) {
        List<CustomCollection> customCollections = customCollectionService.getCustomCollectionsByUserId(userId);
        return new ResponseEntity<>(customCollections, HttpStatus.OK);
    }
}
