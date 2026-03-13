package com.fogged.backend.repository;

import com.fogged.backend.entity.Bookmark;
import com.fogged.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark,Integer> {
    List<Bookmark> findByUser(User user);
    void deleteByUserAndItemId(User user, Integer itemId);
    boolean existsByUserAndItemId(User user, Integer itemId);
}
