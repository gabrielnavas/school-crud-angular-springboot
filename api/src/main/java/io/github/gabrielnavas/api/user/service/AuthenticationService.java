package io.github.gabrielnavas.api.user.service;

import io.github.gabrielnavas.api.security.JwtService;
import io.github.gabrielnavas.api.user.dto.SigninDto;
import io.github.gabrielnavas.api.user.dto.TokenDto;
import io.github.gabrielnavas.api.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    public TokenDto signin(SigninDto dto) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.email(), dto.password())
        );
        final HashMap<String, Object> claims = new HashMap<>();
        final User user = (User) auth.getPrincipal();
        claims.put("userId", user.getId());
        claims.put("full_name", String.format("%s %s", user.getFirstname(), user.getLastname()));

        final String token = jwtService.generateToken(claims, user);
        return TokenDto.builder()
                .token(token)
                .build();
    }

}
