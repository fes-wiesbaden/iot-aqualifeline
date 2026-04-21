package com.AquaLifeLine.Backend.Mqtt;

import org.springframework.context.annotation.Bean;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;

import com.AquaLifeLine.Backend.SensorData;
import com.AquaLifeLine.Backend.SensorDataRepository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class MqttMessageHandler {
    private final ObjectMapper objectMapper;
    private final SensorDataRepository sensorDataRepository;

    public MqttMessageHandler(ObjectMapper objectMapper, SensorDataRepository sensorDataRepository) {
        this.objectMapper = objectMapper;
        this.sensorDataRepository = sensorDataRepository;
    }

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleMessage(Message<String> message) {
        try {
            String payload = message.getPayload();
            System.out.println("MQTT erhalten: " + payload);
            JsonNode json = objectMapper.readTree(payload);

            SensorData data = new SensorData();
            data.setDeviceId(json.get("deviceId").asText());
            data.setTemperature(json.get("temperature").asDouble());
            data.setPh(json.get("ph").asDouble());
            data.setTimestamp(System.currentTimeMillis());
            sensorDataRepository.save(data);
        } catch (Exception e) {
            System.err.println("Fehler beim Verarbeiten der MQTT-Nachricht: " + e.getMessage());
        }
    }
}
