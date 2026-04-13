package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class SensorMeasurement {
    
    @Id @GeneratedValue
    private long id;

    private String deviceId;
    private String type;
    private Double value;
    private LocalDateTime timeStamp;
}
