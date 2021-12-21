package org.examplenew.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.examplenew.entity.RefreshToken;
import org.examplenew.entity.User;
import org.examplenew.repos.RefreshTokenRepository;
import org.examplenew.repos.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public Optional<String> create(Integer userID){
        RefreshToken refreshToken = new RefreshToken();
        Optional<User> userOptional = userRepository.findById(userID);


        if (userOptional.isPresent()){
            refreshToken.setUser(userOptional.get());
        } else {
            return Optional.empty();
        }

        String tokenData = UUID.randomUUID().toString();
        refreshToken.setRefreshToken(tokenData);

        refreshTokenRepository.save(refreshToken);
        return Optional.of(tokenData);
    }


    public int deleteByUserID(Integer userID){


        Optional<User> userOptional = userRepository.findById(userID);
        if (userOptional.isPresent()){

            return refreshTokenRepository.deleteByUser(userOptional.get());
        }
        return 0;
    }


    public Optional<String> updateRefreshToken(Integer userID){
        deleteByUserID(userID);
        return create(userID);
    }

    public Optional<RefreshToken> findByRefreshTokenString(String refreshTokenString){
        refreshTokenRepository.findAll().stream().map(RefreshToken::getRefreshToken).forEach(System.out::println);

        RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(refreshTokenString);
        if (refreshToken == null){
            return Optional.empty();
        }
        return Optional.of(refreshToken);
    }

}
