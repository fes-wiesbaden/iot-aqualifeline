package com.AquaLifeLine.Backend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Entity
public class Kunde {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
    

    @ManyToMany
    @JoinTable(
        name = "kunde_aquarium",
        joinColumns = @JoinColumn(name = "kunde_id"),
        inverseJoinColumns = @JoinColumn(name = "aquarium_id")
    )
    private java.util.Set<Aquarium> aquarien;
}
