package com.AquaLifeLine.Backend;

import java.util.Map;

public class SensorData {

    private Map<String, Object> values;

    public Map<String, Object> getSensorValues(){
        return values;
    }

    public void setSensorValues(Map<String, Object> values){
        this.values = values;
    }
}
