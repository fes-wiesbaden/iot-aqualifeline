package com.AquaLifeLine.Backend;

import java.util.ArrayList;
import java.util.List;

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

    public Aquarium findBySerialNumber(String serialNumber) {
        System.out.println("Looking for: '" + serialNumber + "'");
        Aquarium result = this.aquariumRepository.findBySerialNumber(serialNumber);
        System.out.println("Result: " + result);
        return result;
    }

    public List<Aquarium> getAquarienByKunde(Kunde kunde) {
        return new ArrayList<>(kunde.getAquarien());
    }

    public Aquarium saveAquarium(Aquarium aquarium) {
        return this.aquariumRepository.save(aquarium);
    }

    public Aquarium getAquariumById(long id) {
        return this.aquariumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aquarium not found with id " + id));
    }

    public void deleteAquarium(long id) {
        this.aquariumRepository.deleteById(id);
    }
}
