package org.examplenew.validation;

import org.examplenew.request.RegisterRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;


@Service
public class AuthValidator {

    public Optional<String> defaultCheck(RegisterRequest req){

        if (Objects.equals(req.getUserName(), "") || Objects.equals(req.getUserPassword(), "")) return Optional.of("Имя или пароль не могут быть пустыми");



        return Optional.empty();
    }
}
