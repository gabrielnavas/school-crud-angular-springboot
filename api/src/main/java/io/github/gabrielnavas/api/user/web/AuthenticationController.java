package io.github.gabrielnavas.api.user.web;

import io.github.gabrielnavas.api.user.dto.SaveUserDto;
import io.github.gabrielnavas.api.user.dto.SigninDto;
import io.github.gabrielnavas.api.user.dto.SignupDto;
import io.github.gabrielnavas.api.user.dto.TokenDto;
import io.github.gabrielnavas.api.user.service.AuthenticationService;
import io.github.gabrielnavas.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public void signup(@RequestBody SignupDto dto) {
        userService.saveUser(SaveUserDto.builder()
                .firstname(dto.firstname())
                .lastname(dto.lastname())
                .dateOfBirth(dto.dateOfBirth())
                .email(dto.email())
                .password(dto.password())
                .passwordConfirmation(dto.passwordConfirmation())
                .build()
        );
    }
    
    @PostMapping("/signin")
    public TokenDto signin(@RequestBody SigninDto dto) {
        return authenticationService.signin(dto);
    }
}
