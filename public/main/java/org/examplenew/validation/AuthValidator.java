package org.examplenew.validation;

import org.examplenew.request.RegisterRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;


@Service
public class AuthValidator implements AuthValidatorInter {

    public Optional<String> defaultCheck(RegisterRequest req) {
        if (Objects.equals(req.getUserName(), "") || Objects.equals(req.getUserPassword(), ""))
            return Optional.of("Имя или пароль не могут быть пустыми");
        if (req.getUserName().trim().length() < 3 || req.getUserPassword().trim().length() < 3)
            return Optional.of("Имя и пароль должны быть длинее 2 символов.");
        return Optional.empty();
    }
}
