package com.javaspring.springmad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.javaspring.springmad.entity.User;
import com.javaspring.springmad.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8081")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user) {
		User storedUser = userService.findUserByUsername(user.getUsername());
		if (storedUser != null) {
			if (userService.verifyPassword(user.getHashed_password(),storedUser.getHashed_password())) {
				return new ResponseEntity<>(storedUser, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.getAllUsers();

		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userService.getUserById(id);
		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User createdUser = userService.createUser(user);
		if (createdUser != null) {
			return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> requestData) {
		User existingUser = userService.getUserById(id);
		if (existingUser != null){
			if (requestData.containsKey("full_name")) {
				existingUser.setFull_name((String) requestData.get("full_name"));

			}
			if (requestData.containsKey("old_Password") && requestData.containsKey("new_Password")) {
				String oldPassword = (String) requestData.get("old_Password");
				String newPassword = (String) requestData.get("new_Password");
				if (userService.verifyPassword(oldPassword, existingUser.getHashed_password())) {
					existingUser.setHashed_password(userService.hashPassword(newPassword));
				} else {
					return new ResponseEntity<>("Old password is incorrect", HttpStatus.BAD_REQUEST);
				}
			}

			User updatedUser = userService.updateUser(id, existingUser);
			return new ResponseEntity<>("Update success", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		}
	}
	

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		User existingUser = userService.getUserById(id);
		if (existingUser != null) {
			userService.deleteUser(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
