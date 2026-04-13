package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Data {
    //Erweitern je nach Sensoren die tatsächlich vorhanden sein können.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    double temperature;
    LocalDateTime timestamp;
}
