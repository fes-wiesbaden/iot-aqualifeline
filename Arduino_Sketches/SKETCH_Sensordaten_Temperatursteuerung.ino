#include <WiFiS3.h>
#include <PubSubClient.h>
#include <ArduinoJson.h> 
#include <DallasTemperature.h>
#include <OneWire.h>

/*
Konfiguration
*/

const char* ssid = "FES-SuS";
const char* password = "SuS-WLAN!Key24";

const char* mqtt_server = "10.93.128.211";
const int mqtt_port = 1883;
const char* mqtt_user = "DEIN_MQTT_USER"; 
const char* mqtt_pass = "DEIN_MQTT_PASS"; 

// MQTT Topics angepasst für JSON
const char* publish_topic = "sensor/aquarium/data";
const char* subscribe_topic = "sensor/aquarium/command";

#define TDS_PIN A0
#define WATERLEVEL_PIN A1
#define PH A2
#define ONE_WIRE_BUS 2

// Instanzen für OneWire und DallasTemperature erstellen
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

unsigned long publishInterval = 5000; 

/*
Objekte und Variablen
*/

const int red = 10;
const float SCHWELLENWERT = 23.0;
const float HYSTERESE = 0.5;

WiFiClient wifiClient;
PubSubClient client(wifiClient);
unsigned long lastMsgTime = 0;

// Kalibrierungswerte 
float phOffset = -2.50;          //Differenz des PH-Werts
float phStep = 3.5;             // Steigung 
#define SAMPLES 10              // Anzahl der Messungen für Durchschnitt

/*
Callback Eingehede MQTT-Nachrichten
*/

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("\n Nachricht empfangen auf Topic: ");
  Serial.println(topic);

  // Payload in einen String umwandeln
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.print("Inhalt: ");
  Serial.println(message);

  // JSON Dokument erstellen 
  JsonDocument doc;
  
  // JSON aus dem String auslesen
  DeserializationError error = deserializeJson(doc, message);

  if (error) {
    Serial.print("Fehler beim Parsen des JSON: ");
    Serial.println(error.c_str());
    return;
  }

  
  if (doc.containsKey("intervall")) {
    publishInterval = doc["intervall"];
    Serial.print(" Neues Messintervall gesetzt auf: ");
    Serial.print(publishInterval);
    Serial.println(" ms");
  }
}
/*
Funktionen für WLAN und MQTT 
*/

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Verbinde mit WLAN: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("WLAN verbunden!");
  Serial.print("IP-Adresse: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Versuche MQTT-Verbindung aufzubauen...");
    String clientId = "UnoR4WiFi-";
    clientId += String(random(0, 0xffff), HEX);

    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pass)) {
      Serial.println("  verbunden!");
      
      client.subscribe(subscribe_topic);
      Serial.print("Abonniert auf Topic: ");
      Serial.println(subscribe_topic);
    } else {
      Serial.print(" Fehlgeschlagen, rc=");
      Serial.print(client.state());
      Serial.println(" - Versuche es in 5 Sekunden erneut");
      delay(5000);
    }
  }
}
/*
Setup und Loop
*/

void setup() {
  Serial.begin(115200);
  analogReadResolution(10); 
  
  // Pin 10 Sensor Pin am Arduino
	pinMode(red, OUTPUT);									   			   
  
 sensors.begin();
  setup_wifi();
  Serial.print("Anzahl gefundener Sensoren: ");
Serial.println(sensors.getDeviceCount());
  client.setServer(mqtt_server, mqtt_port);
  
  client.setCallback(callback);
  client.setBufferSize(512);
}

void loop() {
  //WLAN immer wieder reconnecten
  if (WiFi.status() != WL_CONNECTED) {
    setup_wifi();
  }

  if (!client.connected()) {
    reconnect();
  }
  
  client.loop(); 

  unsigned long currentMillis = millis();
  if (currentMillis - lastMsgTime >= publishInterval) {
    lastMsgTime = currentMillis;

       // ph Messungen
    long sumPH = 0;
    for (int i = 0; i < SAMPLES; i++) {
      sumPH += analogRead(PH);
      delay(10);
    }
    float avgPHRaw = (float)sumPH / SAMPLES;

    // Umrechnung in Spannung  V (Arduino Uno R4 nutzt 5V Referenz bei 10-bit)
    float voltagePH = avgPHRaw * (5.0 / 1023.0);

    // Umrechnung Spannung -> pH-Wert
    // Die Formel lautet oft: pH = 7 + (V_neutral - V_mess) * Multiplikator
    float phValue = 3.5 * voltagePH + phOffset;

    int tdsRaw = analogRead(TDS_PIN);
    int waterLevelRaw = analogRead(WATERLEVEL_PIN);
    int rawPH = analogRead(PH);
								 
								   
											  
		 // Temperaturmessung
     sensors.requestTemperatures(); // Befehl zum Messen senden
    float tempC = sensors.getTempCByIndex(0); // Temperatur in Celsius 
  
	// --- LICHT-STEUERUNG (LOGIK) ---
	if (tempC != DEVICE_DISCONNECTED_C) { // Nur schalten, wenn Sensor okay ist
     if ( tempC <= SCHWELLENWERT) {
       digitalWrite(red, HIGH);//Licht an unter 23 Grad
     } else {
        delay(50); 
       digitalWrite(red, LOW);//Licht aus ab 23 Grad
	   }
     }
      
/*
JSON documnet erstllen und senden
*/

    JsonDocument doc;
    
    //Sensoranschluss prüfen ist (-127 = Fehler)
    if (tempC == DEVICE_DISCONNECTED_C) {
      doc["Temperatur"] = "Fehler";
    } else {
      doc["Temperatur"] = tempC;
    }
    
    // Syntax = doc["status"] = "online";    
    doc["Wasserqualitaet"] = tdsRaw;
    doc["Wasserstand"] = waterLevelRaw;
    doc["PH-Wert"] = round(phValue * 100) / 100.0;

    // JSON umwandlung in String
    String jsonOutput;
    serializeJson(doc, jsonOutput);

    Serial.print("Sende JSON: ");
    Serial.println(jsonOutput);

    // JSON-String sendung an den Broker 
    client.publish(publish_topic, jsonOutput.c_str());
	
	Serial.print("Temperatur: ");
    Serial.print(tempC);
    Serial.print(" | Lichtstatus: ");
    Serial.println(tempC < SCHWELLENWERT ? "AN" : "AUS");							 							 
														 
  }
}