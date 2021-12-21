package org.examplenew.service;


import lombok.RequiredArgsConstructor;
import org.examplenew.dto.CustomPoint;
import org.examplenew.entity.Point;
import org.examplenew.entity.User;
import org.examplenew.repos.PointRepository;
import org.examplenew.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PointService {
    @Autowired
    private PointRepository pointRepository;
    @Autowired
    private UserRepository userRepository;

    public Optional<Point> savePoint(CustomPoint customPoint){
        Optional<User> userOptional = userRepository.findById(customPoint.getUserID());
        if (!userOptional.isPresent()){
            return Optional.empty();
        }
        Point point = new Point(
                customPoint.getX(),
                customPoint.getY(),
                customPoint.getR(),
                customPoint.getCurTime(),
                customPoint.getExecTime(),
                customPoint.isHit(),
                userOptional.get());
        return Optional.of(pointRepository.save(point));
    }

    public List<Point> findAll(){
        return pointRepository.findAll();
    }


    public Collection<Point> deletePointsByUserID(Integer userID){
        Optional<User> userOptional = userRepository.findById(userID);
        if (!userOptional.isPresent()){
            return Collections.<Point>emptyList();
        }
        return pointRepository.deleteAllByUser(userRepository.findById(userID).get());
    }
}
