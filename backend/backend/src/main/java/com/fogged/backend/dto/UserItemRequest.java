package com.fogged.backend.dto;

import lombok.Getter;

@Getter
public class UserItemRequest {
    private String title;
    private String desc;
    private String mood;
    private String size;
    private String longDesc;
    private String tags;
    private String palette;
    private String paletteNames;
    private String accent;
}
