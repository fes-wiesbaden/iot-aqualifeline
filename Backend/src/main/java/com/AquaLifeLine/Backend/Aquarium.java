package com.AquaLifeLine.Backend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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

    @Column(unique = true)
    private String serialNumber;

    @ManyToMany(mappedBy = "aquarien")
    private java.util.Set<Kunde> kunden;

    @OneToMany(mappedBy = "aquarium")
    private java.util.List<Sensor> sensoren;
}
