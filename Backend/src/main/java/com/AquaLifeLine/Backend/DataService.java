package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;
import java.util.List;

public class DataService {
    public List<Data> getAllData(){
        return List.of();
        
    }

    public Data saveData(Data data) {
        return data;
    }

    public List<Data> getDataByDeviceId(String deviceId) {
        return List.of();
    }

    public List<Data> getDataByTimestamp(LocalDateTime start, LocalDateTime end) {
        
        return List.of();
    }

    public Data editData(Data data) {
        return data;
    }

    public void deleteData(long id) {
        // TODO Auto-generated method stub
        
    }

}
