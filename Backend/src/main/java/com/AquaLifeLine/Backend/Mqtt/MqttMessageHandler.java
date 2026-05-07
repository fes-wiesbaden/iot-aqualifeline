package com.AquaLifeLine.Backend.Mqtt;

import java.time.LocalDateTime;

import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.AquaLifeLine.Backend.SensorData;
import com.AquaLifeLine.Backend.SensorDataRepository;
import com.AquaLifeLine.Backend.SensorSet;
import com.AquaLifeLine.Backend.SensorSetRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class MqttMessageHandler {
    private final ObjectMapper objectMapper;
    private final SensorDataRepository sensorDataRepository;
    private final SensorSetRepository sensorSetRepository;

    public MqttMessageHandler(ObjectMapper objectMapper, SensorDataRepository sensorDataRepository,
            SensorSetRepository sensorSetRepository) {
        this.objectMapper = objectMapper;
        this.sensorDataRepository = sensorDataRepository;
        this.sensorSetRepository = sensorSetRepository;
    }

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleMessage(Message<String> message) {
        try {
            Optional<SensorSet> sensorSetOpt = sensorSetRepository.findAll()
                    .stream()
                    .findFirst();

            if (sensorSetOpt.isEmpty()) {
                System.err.println("Kein SensorSet vorhanden, Nachricht ignoriert.");
                return;
            }

            SensorSet sensorSet = sensorSetOpt.get();
            String payload = message.getPayload();
            System.out.println("MQTT erhalten: " + payload);
            JsonNode json = objectMapper.readTree(payload);

            SensorData sensordata = new SensorData();
            sensordata.setTemperatur(json.path("Temperatur").asDouble(0));
            sensordata.setPH(json.path("PH").asDouble(0));
            sensordata.setWasserstand(json.path("Wasserstand").asDouble(0));
            sensordata.setWasserqualitaet(json.path("Wasserqualitaet").asDouble(0));
            sensordata.setTimestamp(LocalDateTime.now());
            sensordata.setSensorSet(sensorSet);
            sensorDataRepository.save(sensordata);
        } catch (Exception e) {
            System.err.println("Fehler beim Verarbeiten der MQTT-Nachricht: " + e.getMessage());
        }
    }
}
