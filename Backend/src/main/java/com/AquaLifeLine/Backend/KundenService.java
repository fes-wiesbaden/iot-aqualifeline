package com.AquaLifeLine.Backend;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class KundenService {

    private final KundenRepository kundenRepository;

    public KundenService(KundenRepository kundenRepository) {
        this.kundenRepository = kundenRepository;
    }

    public List<Kunde> getAllKunden() {
        return this.kundenRepository.findAll();
    }

    public Kunde getKundeByName(String name) {
        return this.kundenRepository.findByName(name);
    }

    public Kunde saveKunde(Kunde kunde) {
        return this.kundenRepository.save(kunde);
    }

    public void deleteKunde(long id) {
        this.kundenRepository.deleteById(id);
    }
}
