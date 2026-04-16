package com.AquaLifeLine.Backend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
public class Aquarium {
    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private Long serienNummer;

    @Column(unique = true)
    private String SerialNumber;

    @ManyToOne
    @JoinColumn(name="kunde_id", nullable=false)
    private Kunde kunde;

    @OneToMany(mappedBy = "aquarium")
    private java.util.List<Sensor> sensoren;
}
