package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
public class SensorMeasurement {
    
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    private Double messwert;
    private LocalDateTime timeStamp;

    @ManyToOne
    @JoinColumn(name="sensor_id", nullable=false)
    private Sensor sensor;
}
