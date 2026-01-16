package com.jobtracker.service;

import com.jobtracker.dto.AuthDto;

public interface AuthService {

    AuthDto.AuthResponse register(AuthDto.RegisterRequest request);

    AuthDto.AuthResponse login(AuthDto.LoginRequest request);
}