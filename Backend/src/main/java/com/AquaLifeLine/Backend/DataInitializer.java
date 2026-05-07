package com.AquaLifeLine.Backend;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class DataInitializer implements ApplicationRunner {

    private final KundenRepository kundenRepository;
    private final AquariumRepository aquariumRepository;
    private final PasswordEncoder passwordEncoder;
    private final SensorRepository sensorRepository;
    private final SensorSetRepository sensorSetRepository;

    public DataInitializer(KundenRepository kundenRepository, AquariumRepository aquariumRepository,
            PasswordEncoder passwordEncoder, SensorRepository sensorRepository,
            SensorSetRepository sensorSetRepository) {
        this.kundenRepository = kundenRepository;
        this.aquariumRepository = aquariumRepository;
        this.passwordEncoder = passwordEncoder;
        this.sensorRepository = sensorRepository;
        this.sensorSetRepository = sensorSetRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (kundenRepository.count() > 0)
            return;

        // Create aquariums
        Aquarium a1 = new Aquarium();
        a1.setSerialNumber("AQL-0001");
        aquariumRepository.save(a1);

        Aquarium a2 = new Aquarium();
        a2.setSerialNumber("AQL-0002");
        aquariumRepository.save(a2);

        Aquarium main = new Aquarium();
        main.setSerialNumber("ERGI-DASG-2026-HPKO");
        aquariumRepository.save(main);

        Sensor temp = new Sensor();
        temp.setSensortype(SensorType.Temperatur);

        Sensor ph = new Sensor();
        ph.setSensortype(SensorType.PH);

        Sensor wq = new Sensor();
        wq.setSensortype(SensorType.Wasserqualitaet);

        Sensor ws = new Sensor();
        ws.setSensortype(SensorType.Wasserstand);

        SensorSet mainSensorSet = new SensorSet();
        mainSensorSet.setAquarium(main);
        sensorSetRepository.save(mainSensorSet);

        temp.setSensorSet(mainSensorSet);
        ph.setSensorSet(mainSensorSet);
        wq.setSensorSet(mainSensorSet);
        ws.setSensorSet(mainSensorSet);

        sensorRepository.save(temp);
        sensorRepository.save(ph);
        sensorRepository.save(wq);
        sensorRepository.save(ws);

        mainSensorSet.setSensoren(List.of(temp, ph, wq, ws));
        sensorSetRepository.save(mainSensorSet);
        
        // Create kunde
        Kunde kunde = new Kunde();
        kunde.setName("TestBenutzer");
        kunde.setPassword(passwordEncoder.encode("test123"));
        kunde.getAquarien().add(a1);
        kunde.getAquarien().add(a2);
        kunde.getAquarien().add(main);
        kundenRepository.save(kunde);

        System.out.println("Dummy data created");
    }
}
