package io.github.gabrielnavas.api.user.repository;


import io.github.gabrielnavas.api.user.model.ERole;
import io.github.gabrielnavas.api.user.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByName(ERole roleName);

    List<Role> findAllByNameIn(List<ERole> roleNames);
}
