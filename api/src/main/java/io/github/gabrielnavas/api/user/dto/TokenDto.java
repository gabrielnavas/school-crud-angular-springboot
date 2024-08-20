package io.github.gabrielnavas.api.user.dto;

import lombok.Builder;

@Builder
public record TokenDto(
        String token
) {
}
