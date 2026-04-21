package com.AquaLifeLine.Backend;

import org.springframework.stereotype.Service;

@Service
public class AquariumService {
    final private AquariumRepository aquariumRepository;

    public AquariumService(AquariumRepository aquariumRepository) {
        this.aquariumRepository = aquariumRepository;
    }

    public boolean existsBySerialNumber(String serialNumber) {
        return this.aquariumRepository.existsBySerialNumber(serialNumber);
    }
    /* 
    public List<Aquarium> getAllAquariums() {
        return this.aquariumRepository.findAll();
    }
    */

    public Aquarium saveAquarium(Aquarium aquarium) {
        return this.aquariumRepository.save(aquarium);
    }

    public Aquarium getAquariumById(long id) {
        return this.aquariumRepository.findById(id).orElseThrow(() -> new RuntimeException("Aquarium not found with id " + id));
    }

    public void deleteAquarium(long id) {
        this.aquariumRepository.deleteById(id);
    }
}
