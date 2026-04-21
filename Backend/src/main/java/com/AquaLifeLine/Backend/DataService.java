package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class DataService {

    private final DataRepository dataRepository;

    public DataService(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    public List<Data> getAllData(){
        return this.dataRepository.findAll();
        
    }

    public Data saveData(Data data) {
        return this.dataRepository.save(data);
    }

    public List<Data> getDataByDeviceId(long deviceId) {
        return this.dataRepository.findBySensor_id(deviceId);
    }

    public List<Data> getDataByTimestamp(LocalDateTime start, LocalDateTime end) {
        return this.dataRepository.findByTimestampBetween(start, end);
    }

    public Data editData(long id, Data data) {
    return this.dataRepository.findById(id)
        .map(existingData -> {
            existingData.setDatenwert(data.getDatenwert());
            existingData.setTimestamp(data.getTimestamp());
            existingData.setSensor(data.getSensor());
            return this.dataRepository.save(existingData);
        })
        .orElseThrow(() -> new RuntimeException("Data not found with id " + id));
    }

    public void deleteData(long id) {
        this.dataRepository.deleteById(id);
    }

}
