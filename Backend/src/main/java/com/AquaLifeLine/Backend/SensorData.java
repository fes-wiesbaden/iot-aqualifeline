package com.AquaLifeLine.Backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter 
public class SensorData {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceId;
    private double temperature;
    private double ph;
    private long timestamp;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;


}
