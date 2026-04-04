package com.fogged.backend.repository;

import com.fogged.backend.entity.UserItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserItemRepository extends JpaRepository<UserItem, Long> {
    List<UserItem> findAllByOrderByCreatedAtDesc();
    List<UserItem> findByUserEmailOrderByCreatedAtDesc(String email);
}
