package com.AquaLifeLine.Backend;



public interface AquariumRepository extends org.springframework.data.jpa.repository.JpaRepository<Aquarium, Long> {
    boolean existsBySerialNumber(String serialNumber);
    Aquarium findBySerialNumber(String serialNumber);
}
