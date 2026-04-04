package com.fogged.backend.dto;

import com.fogged.backend.entity.UserItem;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserItemResponse {
    private Long id;
    private String title;
    private String desc;
    private String mood;
    private String size;
    private String longDesc;
    private String tags;
    private String palette;
    private String paletteNames;
    private String accent;
    private String nickname;
    private LocalDateTime createdAt;

    public UserItemResponse(UserItem item) {
        this.id = item.getId();
        this.title = item.getTitle();
        this.desc = item.getDesc();
        this.mood = item.getMood();
        this.size = item.getSize();
        this.longDesc = item.getLongDesc();
        this.tags = item.getTags();
        this.palette = item.getPalette();
        this.paletteNames = item.getPaletteNames();
        this.accent = item.getAccent();
        this.nickname = item.getUser().getNickname();
        this.createdAt = item.getCreatedAt();
    }
}
