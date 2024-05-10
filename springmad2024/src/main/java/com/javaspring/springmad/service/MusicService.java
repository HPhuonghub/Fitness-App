package com.javaspring.springmad.service;

import com.javaspring.springmad.entity.Music;
import com.javaspring.springmad.repository.MusicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MusicService {
    @Autowired
    private MusicRepository musicRepository;

    public List<Music> getAllMusics() {
        return musicRepository.findAll();
    }

    public Music getMusicById(Long id) {
        return musicRepository.findById(id).orElse(null);
    }

    public Music createMusic(Music music) {
            return musicRepository.save(music);
    }

    public Music updateMusic(Long id, Music music) {
        Optional<Music> existingMusicOptional = musicRepository.findById(id);
        if (existingMusicOptional.isPresent()) {
            Music existingMusic = existingMusicOptional.get();
            existingMusic.setName(music.getName());
            existingMusic.setUrlImage(music.getUrlImage());
            existingMusic.setUrlMusic(music.getUrlMusic());
            existingMusic.setTime(music.getTime());
            return musicRepository.save(existingMusic);
        } else {
            return null;
        }
    }


    public void deleteMusic(Long id) {
        musicRepository.deleteById(id);
    }

}
