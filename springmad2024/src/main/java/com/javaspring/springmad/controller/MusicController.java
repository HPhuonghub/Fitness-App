package com.javaspring.springmad.controller;

import com.javaspring.springmad.entity.Music;
import com.javaspring.springmad.service.MusicService;
import com.javaspring.springmad.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/musics")
public class MusicController {
	@Autowired
	private MusicService musicService;

	@GetMapping
	public ResponseEntity<List<Music>> getAllMusics() {
		List<Music> musics = musicService.getAllMusics();

		return new ResponseEntity<>(musics, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Music> getMusicById(@PathVariable Long id) {
		Music music = musicService.getMusicById(id);
		if (music != null) {
			return new ResponseEntity<>(music, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping
	public ResponseEntity<Music> createMusic(@RequestBody Music music) {
		Music createdMusic = musicService.createMusic(music);
		if (createdMusic != null) {
			return new ResponseEntity<>(createdMusic, HttpStatus.CREATED);
		} else {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Music> updateMusic(@PathVariable Long id, @RequestBody Music music) {
		Music existingMusic = musicService.getMusicById(id);
		if (existingMusic != null) {
			Music updatedMusic = musicService.updateMusic(id, music);
			return new ResponseEntity<>(updatedMusic, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteMusic(@PathVariable Long id) {
		Music existingMusic = musicService.getMusicById(id);
		if (existingMusic != null) {
			musicService.deleteMusic(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
