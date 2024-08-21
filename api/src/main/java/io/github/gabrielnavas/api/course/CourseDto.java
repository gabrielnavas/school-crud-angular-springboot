package io.github.gabrielnavas.api.course;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record CourseDto(
        UUID id,

        @NotBlank(message = "name is required")
        @Size(min = 2, max = 100, message = "name must have a minimum of 2 characters and a maximum of 100 characters")
        String name,

        @NotNull(message = "category is required")
        UUID categoryId,

        @NotEmpty(message = "lessons is required")
        List<UUID> lessonIds,

        @NotNull(message = "user id is required")
        UUID userId
) {
}
