package io.github.gabrielnavas.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler({EntityNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleEntityNotException(RuntimeException ex) {
        return ErrorResponse.builder()
                .message(ex.getMessage())
                .createdAt(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler({
            IllegalArgumentException.class,
            EntityAlreadyExistsException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleIllegalArgumentException(Exception ex) {
        return ErrorResponse.builder()
                .message(ex.getMessage())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
