package org.examplenew.validation;


import org.examplenew.request.PointRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PointValidator {

    public Optional<String> check(PointRequest req){
        if (checkX(req.getX()).isPresent()){
            return checkX(req.getX());
        }
        if (checkY(req.getY()).isPresent()){
            return checkY(req.getY());
        }
        if (checkR(req.getR()).isPresent()){
            return checkR(req.getR());
        }
        return Optional.empty();
    }

    public Optional<String> checkX(Double x){
        if (x == null || x.isNaN() || x < -2 || x > 2){
            return Optional.of("X должен быть числом от -2 до 2.");
        }
        return Optional.empty();
    }

    public Optional<String> checkY(Double y){
        if (y == null || y.isNaN() || y < -5 || y > 5){
            return Optional.of("Y должен быть числом от -5 до 5.");
        }
        return Optional.empty();
    }

    public Optional<String> checkR(Double r){
        if (r == null || r.isNaN() || r < -2 || r > 2){
            return Optional.of("R должен быть числом от -2 до 2.");
        }
        return Optional.empty();
    }
}
