package org.examplenew.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class CustomPoint {
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private String curTime;
    private String execTime;
    private Integer userID;
    private Long pointID;

    public CustomPoint(double x, double y, double r, Integer userID) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.userID = userID;
        checkHit();
    }

    public void checkHit() {
        long startTime = System.nanoTime();
        String fullCurrentTime = OffsetDateTime.now().toString();
        this.curTime = fullCurrentTime.substring(0, 10) + " " + fullCurrentTime.substring(11, 19);

        if (checkCircle() || checkTriangle() || checkRectangle()) {
            setHit(true);
        } else {
            setHit(false);
        }
        this.execTime = String.valueOf((System.nanoTime() - startTime)/Math.pow(10,6));
    }

    private boolean checkCircle() {
        double x = this.x;
        double y = this.y;
        double r = this.r;
        if (r >= 0) {
            return x <= 0 && y <= 0 && Math.sqrt(x * x + y * y) <= r / 2;
        } else {
            return x >= 0 && y >= 0 && Math.sqrt(x * x + y * y) <= Math.abs(r / 2);
        }
    }

    private boolean checkTriangle() {
        double x = this.x;
        double y = this.y;
        double r = this.r;
        if (r >= 0) {
            return x >= 0 && y <= 0 && y >= (x - r/2);
        } else {
            return x <= 0 && y >= 0 && -y >= (-x + r/2);
        }
    }

    private boolean checkRectangle() {
        double x = this.x;
        double y = this.y;
        double r = this.r;
        if (r >= 0) {
            return x <= 0 && y >= 0 && -x <= r / 2 && y <= r;
        } else {
            return x >= 0 && y <= 0 && x <= -r/2 && -y <= -r;
        }
    }
}
