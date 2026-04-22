	// Arduino Code
	const int sensorPin = A0; // Wasserstandsensor an Pin A0
	const int powerPin = 7; // Digitaler pin zur stromversorgung vom Sensor

  int sensorValue = 0;

	void setup() {
    pinMode(powerPin, OUTPUT); //Powerpin als ausgang definieren
    digitalWrite(powerPin, LOW);// Sensor zunächst ausschalten

	  Serial.begin(9600); // Serielle Kommunikation starten
    Serial.print("Wasserstandsensor bereit");
	}
	
	void loop() {
    digitalWrite(powerPin, HIGH); // Sonsor kruz anschalten um Kolisionenen zu vermeiden
    delay(10);// Warten bis das Signal stabiel ist
    sensorValue = analogRead(sensorPin);
    digitalWrite(powerPin, LOW);// Sensor zunächst ausschalten
    //Ausgabe am Seriellen Monitor
    Serial.print("Aktueller Wert: " );
    Serial.println(sensorValue);

    //Einfache Auswertung 

    if(sensorValue > 500) {
      Serial.print("Status: Höher Wasserstand");
    }else if (sensorValue > 100) {
      Serial.print("Status: Wasserstand niedrig");
    } else {
      Serial.print("Status: Wüste");
    }

    

    /*int reading = analogRead(sensorPin); // Rohdaten lesen
	  // Umrechnung in Celsius (für LM35: (Volt * 100))
	  float voltage = reading * 5.0 / 1024.0;
	  float temperatureC = voltage * 100.0;
	
	  Serial.println(temperatureC); // Temperatur senden*/
    
	  delay(1000); // 1 Sekunde warten
	}
