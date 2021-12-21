package org.examplenew.controller;


import org.examplenew.comparator.PointDataComparator;
import org.examplenew.dto.CustomPoint;
import org.examplenew.dto.CustomUserDetails;
import org.examplenew.entity.Point;
import org.examplenew.request.PointRequest;
import org.examplenew.response.OtherResponseWrapper;
import org.examplenew.service.PointService;
import org.examplenew.validation.PointValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/points/")
public class AreaController {

    private PointService pointService;
    private PointValidator pointValidator;

    @Autowired
    public AreaController(PointService pointService,
                          PointValidator pointValidator){
        this.pointService = pointService;
        this.pointValidator = pointValidator;
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody PointRequest pointRequest){
        try {
            if (SecurityContextHolder.getContext().getAuthentication() == null){
                return ResponseEntity.badRequest().body(new OtherResponseWrapper("Недостаточно прав."));
            }
            System.out.println("auth: " + SecurityContextHolder.getContext().getAuthentication());

            Optional<String> checkPoint = pointValidator.check(pointRequest);
            if (checkPoint.isPresent()) {
                return ResponseEntity.badRequest().body(new OtherResponseWrapper(checkPoint.get()));
            }
            Integer userID = ((CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserID();
            Optional<Point> savePointOptional = pointService.savePoint(
                    new CustomPoint(
                            pointRequest.getX(),
                            pointRequest.getY(),
                            pointRequest.getR(),
                            userID));
            if (!savePointOptional.isPresent()) {
                return ResponseEntity.badRequest().body(new OtherResponseWrapper("Точка не была сохранена."));
            }
            return ResponseEntity.ok().body(savePointOptional.get());
        } catch (Exception e){
            return ResponseEntity.badRequest().body(new OtherResponseWrapper(e.getMessage()));
        }
    }


    @GetMapping("get")
    public ResponseEntity<?> get(){
        if (SecurityContextHolder.getContext().getAuthentication() == null){
            return ResponseEntity.badRequest().body(new OtherResponseWrapper("Недостаточно прав."));
        }
        List<Point> points = pointService.findAll();
        Collections.sort(points, new PointDataComparator());
        return ResponseEntity.ok().body(points);
    }

    @PostMapping("clear")
    public ResponseEntity<?> clear(@RequestBody PointRequest pointRequest){
        if (SecurityContextHolder.getContext().getAuthentication() == null){
            return ResponseEntity.badRequest().body(new OtherResponseWrapper("Недостаточно прав."));
        }
        System.out.println("FFDAFA" + pointRequest.getUserID());
        Collection<Point> deletedPoints = pointService.deletePointsByUserID(pointRequest.getUserID());
        deletedPoints.forEach(System.out::println);
        return ResponseEntity.ok().body(deletedPoints);
    }


}
