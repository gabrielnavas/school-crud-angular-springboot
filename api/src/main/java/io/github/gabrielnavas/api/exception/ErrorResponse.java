package io.github.gabrielnavas.api.exception;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ErrorResponse(
        String message,
        LocalDateTime createdAt
) {
}
