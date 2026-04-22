#include <WiFiS3.h>
#include <PubSubClient.h>
#include <ArduinoJson.h> // NEU: ArduinoJson Bibliothek

// ==========================================
// ⚙️ KONFIGURATION
// ==========================================
//WLAN Verbindungsdaten
const char* ssid = "FES-SuS";
const char* password = "SuS-WLAN!Key24";
//MQTT Verbindungsdaten
const char* mqtt_server = "10.93.128.211";
const int mqtt_port = 1883;
const char* mqtt_user = "DEIN_MQTT_USER"; // Falls benötigt, sonst ""
const char* mqtt_pass = "DEIN_MQTT_PASS"; // Falls benötigt, sonst ""

// MQTT Topics angepasst für JSON
const char* publish_topic = "sensor/aquarium/data";
const char* subscribe_topic = "sensor/aquarium/command";
//Adruino Analogpin Konfiguration
#define TDS_PIN A0
#define WATERLEVEL_PIN A1
#define PH A2
#define Temperatur A3

// 'const' entfernt, damit wir das Intervall per MQTT (JSON) ändern können
unsigned long publishInterval = 5000; 

// ==========================================
// 🛠 OBJEKTE & VARIABLEN
// ==========================================

WiFiClient wifiClient;
PubSubClient client(wifiClient);
unsigned long lastMsgTime = 0;

// ==========================================
// 📥 CALLBACK: EINGEHENDE MQTT-NACHRICHTEN
// ==========================================
// Diese Funktion wird automatisch aufgerufen, wenn der Broker uns etwas sendet
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("\n📩 Nachricht empfangen auf Topic: ");
  Serial.println(topic);

  // Payload in einen String umwandeln
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.print("Inhalt: ");
  Serial.println(message);

  // JSON Dokument erstellen (ArduinoJson v7 Syntax)
  JsonDocument doc;
  
  // JSON aus dem String auslesen
  DeserializationError error = deserializeJson(doc, message);

  if (error) {
    Serial.print("Fehler beim Parsen des JSON: ");
    Serial.println(error.c_str());
    return;
  }

  // --- Beispiel: Auf JSON-Schlüssel reagieren ---
  // Wir prüfen, ob der Broker uns ein neues "intervall" geschickt hat
  // Beispiel-Payload vom Broker: {"intervall": 10000}
  if (doc.containsKey("intervall")) {
    publishInterval = doc["intervall"];
    Serial.print(" Neues Messintervall gesetzt auf: ");
    Serial.print(publishInterval);
    Serial.println(" ms");
  }
}

// ==========================================
// 📡 FUNKTIONEN FÜR WLAN & MQTT
// ==========================================

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
      
      // NEU: Beim erfolgreichen Verbinden auf das Command-Topic abonnieren (Subscribe)
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

// ==========================================
// 🚀 SETUP & LOOP
// ==========================================

void setup() {
  Serial.begin(115200);
  analogReadResolution(10); 
  
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  
  // NEU: Dem MQTT-Client sagen, welche Funktion bei neuen Nachrichten aufgerufen werden soll
  client.setCallback(callback);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    setup_wifi();
  }

  if (!client.connected()) {
    reconnect();
  }
  
  client.loop(); // Wichtig für das Empfangen von Nachrichten!

  unsigned long currentMillis = millis();
  if (currentMillis - lastMsgTime >= publishInterval) {
    lastMsgTime = currentMillis;

    int tdsRaw = analogRead(TDS_PIN);
    int waterLevelRaw = analogRead(WATERLEVEL_PIN);
    int rawPH = analogRead(PH);
    int rawTemp = analogRead(Temperatur);

    // ==========================================
    //  JSON ERSTELLEN UND SENDEN
    // ==========================================
    JsonDocument doc;
    
    // Daten in das JSON-Dokument eintragen
    // Syntax = doc["status"] = "online";    
    doc["Wasserqualitaet"] = tdsRaw;
    doc["Wasserstand"] = waterLevelRaw;
    doc["PH-Wert"] = rawPH;
    doc["Temperatur"] = rawTemp;

    // JSON in einen String umwandeln
    String jsonOutput;
    serializeJson(doc, jsonOutput);

    Serial.print("Sende JSON: ");
    Serial.println(jsonOutput);

    // JSON-String an den Broker senden
    client.publish(publish_topic, jsonOutput.c_str());
  }
}