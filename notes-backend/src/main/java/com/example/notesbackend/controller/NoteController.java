package com.example.notesbackend.controller;

import com.example.notesbackend.entity.Note;
import com.example.notesbackend.repository.NoteRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    private final NoteRepository repository;

    public NoteController(NoteRepository repository) {
        this.repository = repository;
    }

    // Get all notes
    @GetMapping
    public List<Note> getAllNotes() {
        return repository.findAll();
    }

    // Add a note
    @PostMapping
    public Note addNote(@RequestBody Note note) {

        if (note.getCreatedAt() == null) {
            note.setCreatedAt(LocalDateTime.now());
        }

        return repository.save(note);
    }

    // Delete a note
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        repository.deleteById(id);
    }
}