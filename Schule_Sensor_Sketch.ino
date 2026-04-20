#include <WiFiS3.h>
#include <PubSubClient.h>

// --- WLAN Daten ---
const char* ssid = "FES-SuS";
const char* password = "SuS-WLAN!Key24";

// --- MQTT Daten ---
const char* mqtt_server = " 10.93.128.211"; 
const char* topic = "sensor/temperatur";

const int sensorPin = A0; 

WiFiClient wifiClient; // Umbenannt zur besseren Übersicht
PubSubClient client(wifiClient);

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

  Serial.println("\nWLAN verbunden!");
  Serial.print("IP-Adresse: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Versuche MQTT Verbindung...");
    // Erstellt eine zufällige Client ID, damit der Broker die Verbindung nicht ablehnt
    String clientId = "ArduinoUnoR4-";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("verbunden");
    } else {
      Serial.print("Fehler, rc=");
      Serial.print(client.state());
      Serial.println(" Versuche es in 5 Sekunden erneut...");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial) {
    ; // Warten bis die serielle Schnittstelle bereit ist (beim R4 sinnvoll)
  }
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Temperatur lesen
  int reading = analogRead(sensorPin);
  
  // Der UNO R4 arbeitet standardmäßig mit 5V Referenzspannung und 10-Bit (0-1023)
  float voltage = reading * (5.0 / 1024.0); 
  float temperatureC = voltage * 100.0; // Beispiel für einen LM35 Sensor

  // Umwandlung von float in String
  char tempString[8];
  dtostrf(temperatureC, 1, 2, tempString); 

  // Senden an den Broker
  Serial.print("Sende Temperatur: ");
  Serial.println(tempString);
  client.publish(topic, tempString);

  delay(5000); // Sende alle 5 Sekunden
}

