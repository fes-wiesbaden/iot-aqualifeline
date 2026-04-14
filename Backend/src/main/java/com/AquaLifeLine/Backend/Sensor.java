package com.AquaLifeLine.Backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
public class Sensor {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long sensor_id;

    private String type;
}
