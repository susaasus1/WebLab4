package org.examplenew.comparator;

import org.apache.logging.log4j.util.PropertySource;
import org.examplenew.entity.Point;

import java.util.Comparator;

public class PointDataComparator implements Comparator {

        @Override
        public int compare(Object o1, Object o2) {
            Point p1 = (Point) o1;
            Point p2 = (Point) o2;
            return p1.getCurTime().compareTo(p2.getCurTime());
        }


}
