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

@Entity
@Getter @Setter
@NoArgsConstructor
public class Data {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    double datenwert;
    LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;

}
