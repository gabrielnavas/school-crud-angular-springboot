package io.github.gabrielnavas.api.user.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record RoleDto(
        UUID id,
        String name
) {
}
