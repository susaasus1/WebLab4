package org.examplenew.entity;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Getter
@Setter
@Entity
@Data
@Table(name="points")
public class Point {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private double x;

    @Column
    private double y;

    @Column
    private double r;

    @Column
    private String curTime;

    @Column
    private String execTime;

    @Column
    private String hit;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    public Point(){};
    public Point(
            double x,
            double y,
            double r,
            String curTime,
            String execTime,
            Boolean hit,
            User user){
        this.x = x;
        this.y = y;
        this.r = r;
        this.curTime = curTime;
        this.execTime = execTime;
        this.hit = hit.toString();
        this.user = user;

    }



}
