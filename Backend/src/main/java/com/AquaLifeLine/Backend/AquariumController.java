package com.AquaLifeLine.Backend;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/aquarien")
public class AquariumController {

    private final AquariumService aquariumService;
    private final KundenService kundenService;
    private final SensorDataService sensorDataService;

    public AquariumController(AquariumService aquariumService, KundenService kundenService, SensorDataService sensordataService) {
        this.aquariumService = aquariumService;
        this.kundenService = kundenService;
        this.sensorDataService = sensordataService;
    }

    @GetMapping
    public List<Aquarium> getAquarienByKunde(Principal principal) {
        Kunde kunde = kundenService.getKundeByName(principal.getName());
        return aquariumService.getAquarienByKunde(kunde);
    }

    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok("Ok");
    }

    @GetMapping("/serialNumber/{serialNumber}")
    public Aquarium findAquariumBySerialNumber(@PathVariable String serialNumber) {
        return this.aquariumService.findBySerialNumber(serialNumber);
    }

    @GetMapping("/{id}")
    public Aquarium getAquariumById(@PathVariable long id) {
        return aquariumService.getAquariumById(id);
    }

    @GetMapping("/{id}/daten")
    public List<SensorData> getSensorData(@PathVariable long id) {
        Aquarium aquarium = aquariumService.getAquariumById(id);
        return sensorDataService.findBySensorSet_Id(aquarium.getSensorSet().getId());
    }

    @GetMapping("/{id}/daten/timestamp")
    public List<SensorData> getSensorDataByTimestamp(
            @PathVariable long id,
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        Aquarium aquarium = aquariumService.getAquariumById(id);
        return sensorDataService.findBySensorSet_IdAndTimestampBetween(aquarium.getSensorSet().getId(), start, end);
    }

    @PostMapping("/assign/{serialNumber}")
    public ResponseEntity<?> assignAquarium(@PathVariable String serialNumber, Principal principal) {
        Aquarium aquarium = aquariumService.findBySerialNumber(serialNumber);
        if (aquarium == null) {
            return ResponseEntity.status(404).body("Aquarium nicht gefunden.");
        }
        Kunde kunde = kundenService.getKundeByName(principal.getName());
        if (kunde.getAquarien().contains(aquarium)) {
            return ResponseEntity.status(404).body("Aquarium bereits zugewiesen.");
        }
        kunde.getAquarien().add(aquarium);
        kundenService.saveKunde(kunde);
        return ResponseEntity.ok("Aquarium erfolgreich hinzugefügt.");
    }

    @PostMapping
    public Aquarium createAquarium(@RequestBody Aquarium aquarium) {
        do {
            aquarium.setSerialNumber(SerialNumberGenerator.generateSerialNumber());
        } while (aquariumService.existsBySerialNumber(aquarium.getSerialNumber()));
        return aquariumService.saveAquarium(aquarium);
    }

    @DeleteMapping("/{id}")
    public void deleteAquarium(@PathVariable long id) {
        aquariumService.deleteAquarium(id);
    }
}
