package com.decisionhub.service;

import com.decisionhub.dto.AuthRequest;
import com.decisionhub.dto.AuthResponse;
import com.decisionhub.dto.RegisterRequest;
import com.decisionhub.dto.UserDTO;
import com.decisionhub.entity.User;
import com.decisionhub.repository.UserRepository;
import com.decisionhub.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(User.Role.USER); // default role

        userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getUsername());
        return new AuthResponse(token, "Bearer", user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        String token = jwtTokenProvider.generateToken(authentication.getName());
        User user = userRepository.findByUsername(request.getUsername())
                .or(() -> userRepository.findByEmail(request.getUsername()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(token, "Bearer", user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
    }

    public UserDTO getCurrentUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setBio(user.getBio());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setInterests(user.getInterests());
        dto.setRole(user.getRole().name());
        return dto;
    }
}
