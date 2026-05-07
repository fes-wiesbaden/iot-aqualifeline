package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SensorDataService {
    final private SensorDataRepository sensorDataRepository;

    public SensorDataService(SensorDataRepository sensorDataRepository) {
        this.sensorDataRepository = sensorDataRepository;
    }

    public List<SensorData> findBySensorSet_IdAndTimestampBetween(Long sensorSetId, LocalDateTime start, LocalDateTime end) {
        return this.sensorDataRepository.findBySensorSet_IdAndTimestampBetween(sensorSetId, start, end);
    }

    public List<SensorData> findBySensorSet_Id(Long sensorId) {
        return sensorDataRepository.findBySensorSet_Id(sensorId);
    }

    public SensorData save(SensorData sensorData) {
        return sensorDataRepository.save(sensorData);
    }

    public SensorData editSensorData(Long sensorDataId, SensorData sensorData){
        return this.sensorDataRepository.findById(sensorDataId)
            .map(existing ->{
                existing.setTemperatur(sensorData.getTemperatur());
                existing.setPH(sensorData.getPH());
                existing.setWasserstand(sensorData.getWasserstand());
                existing.setWasserqualitaet(sensorData.getWasserqualitaet());
                existing.setTimestamp(sensorData.getTimestamp());
                return sensorDataRepository.save(existing);
            })
            .orElseThrow(() -> new RuntimeException("Fehler beim bearbeiten."));
    }

    public void deleteById(Long sensorSet_Id){
        this.sensorDataRepository.deleteById(sensorSet_Id);
    }

}
