package com.AquaLifeLine.Backend;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
public class SensorSet {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
 
    @OneToMany(mappedBy = "sensorSet")
    private List<Sensor> sensoren;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "aquarium_id")
    private Aquarium aquarium;

    @OneToMany(mappedBy = "sensorSet")
    private List<SensorData> daten;
}
