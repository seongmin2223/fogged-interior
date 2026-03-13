package com.fogged.backend.service;

import com.fogged.backend.entity.Bookmark;
import com.fogged.backend.entity.User;
import com.fogged.backend.repository.BookmarkRepository;
import com.fogged.backend.repository.UserRepository;
import com.fogged.backend.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private User getUserFromToken(String token) {
        String email = jwtUtil.extractEmail(token.replace("Bearer ", ""));
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
    }

    public List<Integer> getBookmarks(String token) {
        User user = getUserFromToken(token);
        return bookmarkRepository.findByUser(user)
                .stream()
                .map(Bookmark::getItemId)
                .collect(Collectors.toList());
    }

    @Transactional
    public void addBookmark(String token, Integer itemId) {
        User user = getUserFromToken(token);
        if (!bookmarkRepository.existsByUserAndItemId(user, itemId)) {
            bookmarkRepository.save(Bookmark.builder()
                    .user(user)
                    .itemId(itemId)
                    .build());
        }
    }

    @Transactional
    public void removeBookmark(String token, Integer itemId) {
        User user = getUserFromToken(token);
        bookmarkRepository.deleteByUserAndItemId(user, itemId);
    }

}
