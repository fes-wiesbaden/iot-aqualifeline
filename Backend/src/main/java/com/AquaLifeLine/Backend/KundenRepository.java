package com.AquaLifeLine.Backend;

public interface KundenRepository extends org.springframework.data.jpa.repository.JpaRepository<Kunde, Long> {
    public Kunde findByName(String name);
    public Kunde getKundeById(Long id);
  }
