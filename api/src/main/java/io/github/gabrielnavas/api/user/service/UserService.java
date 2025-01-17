package io.github.gabrielnavas.api.user.service;

import io.github.gabrielnavas.api.exception.EntityAlreadyExistsException;
import io.github.gabrielnavas.api.user.dto.RoleDto;
import io.github.gabrielnavas.api.user.dto.SaveUserDto;
import io.github.gabrielnavas.api.user.dto.UserDto;
import io.github.gabrielnavas.api.user.model.ERole;
import io.github.gabrielnavas.api.user.model.Role;
import io.github.gabrielnavas.api.user.model.User;
import io.github.gabrielnavas.api.user.repository.RoleRepository;
import io.github.gabrielnavas.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public void saveUserAdmin() {
        final String email = "root@root.com";
        Optional<User> optionalUserByEmail = userRepository.findByEmailIgnoreCase(email);
        if (optionalUserByEmail.isEmpty()) {
            List<Role> roles = roleRepository.findAllByNameIn(List.of(ERole.ADMIN, ERole.STUDENT, ERole.MANAGER));
            if (roles.isEmpty()) {
                throw new RuntimeException("missing roles");
            }

            User user = new User();
            user.setFirstname("root");
            user.setLastname("root");
            user.setDateOfBirth(LocalDate.of(1970, 1, 1));
            user.setEmail(email);
            user.setHashPassword(passwordEncoder.encode("12345678"));
            user.setAccountLocked(false);
            user.setEnabled(true);
            user.setCreatedAt(LocalDateTime.now());
            user.addRoles(roles);
            userRepository.save(user);
        }
    }

    public UserDto saveUser(SaveUserDto dto) {
        if (!dto.password().equals(dto.passwordConfirmation())) {
            throw new RuntimeException("password is different from password confirmation");
        }

        Optional<User> userByEmail = userRepository.findByEmailIgnoreCase(dto.email());
        if (userByEmail.isPresent()) {
            throw new EntityAlreadyExistsException(String.format("Usuário com o E-mail %s já cadastrado.", dto.email()));
        }

        List<Role> roles;
        Optional<Role> roleOptional = roleRepository.findByName(ERole.STUDENT);
        if (roleOptional.isEmpty()) {
            throw new RuntimeException(String.format("role %s not found", ERole.STUDENT.name()));
        }
        roles = List.of(roleOptional.get());


        User user = new User();
        user.setFirstname(dto.firstname());
        user.setLastname(dto.lastname());
        user.setDateOfBirth(dto.dateOfBirth());
        user.setEmail(dto.email());
        user.setHashPassword(passwordEncoder.encode(dto.password()));
        user.setAccountLocked(false);
        user.setEnabled(true);
        user.setCreatedAt(LocalDateTime.now());
        user.addRoles(roles);
        user = userRepository.save(user);

        return UserDto.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .dateOfBirth(user.getDateOfBirth())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .roles(
                        user.getUserRoles().stream().map(role -> RoleDto.builder()
                                .id(role.getRole().getId())
                                .name(role.getRole().getName().name())
                                .build()).toList()
                )
                .build();
    }
}
