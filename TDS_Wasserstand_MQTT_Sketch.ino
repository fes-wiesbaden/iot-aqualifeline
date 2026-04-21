#include <WiFiS3.h>
#include <ArduinoMqttClient.h>

// WLAN Zugangsdaten
char ssid[] = "DEINE_WLAN_SSID";
char pass[] = "DEIN_WLAN_PASSWORT";

// MQTT Setup
WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "192.168.178.XX"; // IP deines Brokers (z.B. Raspberry Pi)
int        port     = 1883;
const char topicTDS[]  = "aquarium/tds";
const char topicWater[] = "aquarium/wasserstand";

// Pins
const int tdsPin = A0;
const int waterPin = A1;

unsigned long lastMillis = 0;
const long interval = 10000; // Alle 10 Sekunden senden

void setup() {
  Serial.begin(9600);
  
  // WiFi Verbindung
  Serial.print("Verbinde mit WLAN...");
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print(".");
    delay(5000);
  }
  Serial.println("\nVerbunden!");

  // MQTT Verbindung
  Serial.print("Verbinde mit MQTT Broker...");
  if (!mqttClient.connect(broker, port)) {
    Serial.print("Fehler! Code: ");
    Serial.println(mqttClient.connectError());
    while (1);
  }
  Serial.println("Erfolgreich verbunden!");
}

void loop() {
  // MQTT am Leben halten
  mqttClient.poll();

  unsigned long currentMillis = millis();

  if (currentMillis - lastMillis >= interval) {
    lastMillis = currentMillis;

    // Sensoren auslesen
    int tdsRaw = analogRead(tdsPin);
    int waterRaw = analogRead(waterPin);

    // TDS Umrechnung (vereinfacht, ohne Temp-Kompensation)
    // Spannung = tdsRaw * (5.0 / 1024.0)
    float tdsValue = tdsRaw * 0.5; // Platzhalter für deine Kalibrierung

    // Daten an MQTT senden
    mqttClient.beginMessage(topicTDS);
    mqttClient.print(tdsValue);
    mqttClient.endMessage();

    mqttClient.beginMessage(topicWater);
    mqttClient.print(waterRaw);
    mqttClient.endMessage();

    Serial.print("Gesendet - TDS: ");
    Serial.print(tdsValue);
    Serial.print(" | Wasserstand: ");
    Serial.println(waterRaw);
  }
}