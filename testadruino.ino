#include <dummy.h>

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// WLAN-Zugangsdaten
const char* ssid = "WLAN-6211612.4ghz";
const char* password = "56534351153173509912";

// MQTT-Broker (z. B. Mosquitto im LAN)
const char* mqtt_server = "192.168.2.210";//IPAdresse Rapberry pi 

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Verbinde mit ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWLAN verbunden, IP: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Verbinde MQTT...");
    if (client.connect("ESP8266Client")) {
      Serial.println("verbunden");
      client.subscribe("test/topic");
    } else {
      Serial.print("Fehler, rc=");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Nachricht auf Topic: ");
  Serial.println(topic);

  // JSON aus Payload parsen
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, payload, length);
  if (!error) {
    const char* msg = doc["msg"];
    Serial.print("JSON msg: ");
    Serial.println(msg);
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Beispiel: JSON senden
  StaticJsonDocument<200> doc;
  doc["msg"] = "Hallo MQTT";
  char buffer[128];
  size_t n = serializeJson(doc, buffer);
  client.publish("test/topic", buffer, n);

  delay(1000);
}

