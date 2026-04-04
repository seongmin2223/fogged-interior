package com.fogged.backend.controller;

import com.fogged.backend.dto.CommentResponse;
import com.fogged.backend.dto.UserItemRequest;
import com.fogged.backend.dto.UserItemResponse;
import com.fogged.backend.service.UserItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-items")
@RequiredArgsConstructor
public class UserItemController {

    private final UserItemService userItemService;

    @GetMapping
    public ResponseEntity<List<UserItemResponse>> getAllItems() {
        return ResponseEntity.ok(userItemService.getAllItems());
    }

    @GetMapping("/my")
    public ResponseEntity<List<UserItemResponse>> getMyItems(
            @RequestHeader(value = "Authorization", required = false) String token) {
        return ResponseEntity.ok(userItemService.getMyItems(token));
    }

    @PostMapping
    public ResponseEntity<UserItemResponse> createItem(
            @RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody UserItemRequest request) {
        return ResponseEntity.ok(userItemService.createItem(token, request));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> deleteItem(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable Long itemId) {
        userItemService.deleteItem(token, itemId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{itemId}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long itemId) {
        return ResponseEntity.ok(userItemService.getComments(itemId));
    }

    @PostMapping("/{itemId}/comments")
    public ResponseEntity<CommentResponse> addComment(
            @RequestHeader(value = "Authorization", required = false) String token,
            @PathVariable Long itemId,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(userItemService.addComment(token, itemId, body.get("content")));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @RequestHeader("Authorization") String token,
            @PathVariable Long commentId) {
        userItemService.deleteComment(token, commentId);
        return ResponseEntity.ok().build();
    }
}