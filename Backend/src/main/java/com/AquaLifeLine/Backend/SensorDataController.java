package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/daten")
public class SensorDataController {
    private final SensorDataService sensorDataService;

    public SensorDataController(SensorDataService sensorDataService) {
        this.sensorDataService = sensorDataService;
    }

    @GetMapping("/{sensorSet_id}")
    public List<SensorData> findBySensorId(@PathVariable Long sensorSet_Id) {
        return this.sensorDataService.findBySensorSet_Id(sensorSet_Id);
    }

    @GetMapping("/{sensorSetId}/timestamp")
    public List<SensorData> findBySensorSet_IdAndTimestampBetween(
            @PathVariable Long sensorSetId,
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {
        return this.sensorDataService.findBySensorSet_IdAndTimestampBetween(sensorSetId, start, end);
    }

    @PatchMapping("/edit/{sensorData_id}")
    public SensorData editSensorData(@PathVariable Long sensorDataId, @RequestBody SensorData sensorData) {
        return sensorDataService.editSensorData(sensorDataId, sensorData);
    }

    @PostMapping("/create")
    public SensorData createSensorData(@RequestBody SensorData sensorData) {
        return this.sensorDataService.save(sensorData);
    }

    @DeleteMapping("/delete/{sensorSet_id}")
    public void deleteById(@PathVariable Long sensorSet_Id) {
        this.sensorDataService.deleteById(sensorSet_Id);
    }
}
