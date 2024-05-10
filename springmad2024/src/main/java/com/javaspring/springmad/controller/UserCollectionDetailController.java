package com.javaspring.springmad.controller;


import com.javaspring.springmad.entity.UserCollectionDetail;
import com.javaspring.springmad.service.UserCollectionDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-collection-details")
public class UserCollectionDetailController {
	@Autowired
	private UserCollectionDetailService userCollectionDetailService;

	@GetMapping
	public ResponseEntity<List<UserCollectionDetail>> getAllUserCollectionDetails() {
		List<UserCollectionDetail> userCollectionDetails = userCollectionDetailService.getAllUserCollectionDetails();

		return new ResponseEntity<>(userCollectionDetails, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserCollectionDetail> getUserCollectionDetailById(@PathVariable Long id) {
		UserCollectionDetail userCollectionDetail = userCollectionDetailService.getUserCollectionDetailById(id);
		if (userCollectionDetail != null) {
			return new ResponseEntity<>(userCollectionDetail, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping
	public ResponseEntity<UserCollectionDetail> createUserCollectionDetail(@RequestBody UserCollectionDetail user) {
		UserCollectionDetail createdUserCollectionDetail = userCollectionDetailService.createUserCollectionDetail(user);
		if (createdUserCollectionDetail != null) {
			return new ResponseEntity<>(createdUserCollectionDetail, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<UserCollectionDetail> updateUserCollectionDetail(@PathVariable Long id, @RequestBody UserCollectionDetail userCollectionDetail) {
		UserCollectionDetail existingUserCollectionDetail = userCollectionDetailService.getUserCollectionDetailById(id);
		if (existingUserCollectionDetail != null) {
			UserCollectionDetail updatedUserCollectionDetail = userCollectionDetailService.updateUserCollectionDetail(id, userCollectionDetail);
			return new ResponseEntity<>(updatedUserCollectionDetail, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUserCollectionDetail(@PathVariable Long id) {
		UserCollectionDetail existingUserCollectionDetail = userCollectionDetailService.getUserCollectionDetailById(id);
		if (existingUserCollectionDetail != null) {
			userCollectionDetailService.deleteUserCollectionDetail(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
