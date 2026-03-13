package com.fogged.backend.controller;

import com.fogged.backend.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping
    public ResponseEntity<List<Integer>> getBookmarks(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(bookmarkService.getBookmarks(token));
    }

    @PostMapping("/{itemId}")
    public ResponseEntity<Void> addBookmark(@RequestHeader("Authorization") String token, @PathVariable Integer itemId) {
        bookmarkService.addBookmark(token, itemId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeBookmark(@RequestHeader("Authorization") String token, @PathVariable Integer itemId) {
        bookmarkService.removeBookmark(token, itemId);
        return ResponseEntity.ok().build();
    }

}
