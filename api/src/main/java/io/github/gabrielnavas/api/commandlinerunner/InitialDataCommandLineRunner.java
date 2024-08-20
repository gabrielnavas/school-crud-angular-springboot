package io.github.gabrielnavas.api.commandlinerunner;

import io.github.gabrielnavas.api.category.Category;
import io.github.gabrielnavas.api.category.CategoryRepository;
import io.github.gabrielnavas.api.category.ECategory;
import io.github.gabrielnavas.api.user.service.RoleService;
import io.github.gabrielnavas.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class InitialDataCommandLineRunner implements CommandLineRunner {

    private final UserService userService;
    private final RoleService roleService;
    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        addRoles();
        addUserAdmin();
    }

    public void addUserAdmin() {
        System.out.println("[ * ] STARTED ADD ADMIN USER.");
        userService.saveUserAdmin();
        System.out.println("[ * ] ENDED ADDED ADMIN USER.");
    }

    public void addRoles() {
        System.out.println("[ * ] STARTED VERIFYING ROLES.");
        roleService.saveInitialRoles();
        System.out.println("[ * ] ENDED VERIFYING ROLES.");
    }

    private void addCoursesCategories() {
        Stream.of(ECategory.FRONT_END, ECategory.BACK_END)
                .filter(eCategory -> categoryRepository.findByName(eCategory).isEmpty())
                .forEach(categoryName -> categoryRepository.save(
                        Category.builder().name(categoryName).build()
                ));
    }
}
