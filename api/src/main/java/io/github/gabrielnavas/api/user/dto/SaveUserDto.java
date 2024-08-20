package io.github.gabrielnavas.api.user.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record SaveUserDto(
        String firstname,
        String lastname,
        LocalDate dateOfBirth,
        String email,
        String password,
        String passwordConfirmation
) {
}
