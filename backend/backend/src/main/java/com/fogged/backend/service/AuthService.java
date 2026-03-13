package com.fogged.backend.service;

import com.fogged.backend.dto.AuthResponse;
import com.fogged.backend.dto.LoginRequest;
import com.fogged.backend.dto.SignupRequest;
import com.fogged.backend.entity.User;
import com.fogged.backend.repository.UserRepository;
import com.fogged.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("이미 사용중인 이메일입니다.");
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .build();
        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 이메일입니다."));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일차하지 않습니다.");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getNickname());
    }
}
