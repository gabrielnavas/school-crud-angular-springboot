package io.github.gabrielnavas.api.user.repository;

import io.github.gabrielnavas.api.user.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {
}
