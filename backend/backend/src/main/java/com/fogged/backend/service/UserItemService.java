package com.fogged.backend.service;

import com.fogged.backend.dto.CommentResponse;
import com.fogged.backend.dto.UserItemRequest;
import com.fogged.backend.dto.UserItemResponse;
import com.fogged.backend.entity.Comment;
import com.fogged.backend.entity.User;
import com.fogged.backend.entity.UserItem;
import com.fogged.backend.repository.CommentRepository;
import com.fogged.backend.repository.UserItemRepository;
import com.fogged.backend.repository.UserRepository;
import com.fogged.backend.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserItemService {

    private final UserItemRepository userItemRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private User getUserFromToken(String token) {
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다"));
    }

    public List<UserItemResponse> getAllItems() {
        return userItemRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(UserItemResponse::new)
                .collect(Collectors.toList());
    }

    public List<UserItemResponse> getMyItems(String token) {
        User user = getUserFromToken(token);
        return userItemRepository.findByUserEmailOrderByCreatedAtDesc(user.getEmail())
                .stream()
                .map(UserItemResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserItemResponse createItem(String token, UserItemRequest request) {
        User user = getUserFromToken(token);
        UserItem userItem = UserItem.builder()
                .user(user)
                .title(request.getTitle())
                .desc(request.getDesc())
                .mood(request.getMood())
                .size(request.getSize())
                .longDesc(request.getLongDesc())
                .tags(request.getTags())
                .palette(request.getPalette())
                .paletteNames(request.getPaletteNames())
                .accent(request.getAccent())
                .build();
        return new  UserItemResponse(userItemRepository.save(userItem));
    }

    @Transactional
    public void deleteItem(String token, Long itemId) {
        User user = getUserFromToken(token);
        UserItem item  = userItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다."));
        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }
        userItemRepository.delete(item);
    }

    public List<CommentResponse> getComments(Long itemId) {
        return commentRepository.findByUserItemIdOrderByCreatedAtAsc(itemId)
                .stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentResponse addComment(String token, Long itemId, String content) {
        User user = getUserFromToken(token);
        UserItem item = userItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("아이템을 찾을 수 없습니다"));
        Comment comment = Comment.builder()
                .user(user)
                .userItem(item)
                .content(content)
                .build();
        return new CommentResponse(commentRepository.save(comment));
    }

    @Transactional
    public void deleteComment(String token, Long commentId) {
        User user = getUserFromToken(token);
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("댓글 삭제 권한이 없습니다.");
        }
        commentRepository.delete(comment);
    }

}
