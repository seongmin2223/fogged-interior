package com.fogged.backend.dto;

import lombok.Getter;

@Getter
public class SignupRequest {

    private String email;
    private String password;
    private String nickname;

}
