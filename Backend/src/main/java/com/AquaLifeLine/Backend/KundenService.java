package com.AquaLifeLine.Backend;


import org.springframework.stereotype.Service;

@Service
public class KundenService {

    private final KundenRepository kundenRepository;

    public KundenService(KundenRepository kundenRepository) {
        this.kundenRepository = kundenRepository;
    }

    public Kunde getKundeById(long id) {
        return this.kundenRepository.getKundeById(id);
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
