package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Daten")
public class DataController {
    private final DataService dataService;

    public DataController(DataService dataService){
        this.dataService = dataService;
    }

    @GetMapping
    public List<Data> getAllData() {
        return dataService.getAllData();
    }

    @GetMapping("/device/{deviceId}")
    public List<Data> getDataByDeviceId(@PathVariable String deviceId){
        return dataService.getDataByDeviceId(deviceId);
    }

    @GetMapping("/timestamp")
    public List<Data> getDataByTimestamp(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end){
        return dataService.getDataByTimestamp(start, end);
    }

    @PostMapping("/create")
    public Data createData(@RequestBody Data data){
        return dataService.saveData(data);
    }

    @PostMapping("/edit")
    public Data editData(@RequestBody Data data){
        return dataService.editData(data);
    }

    @PostMapping("/delete/{id}")
    public void deleteData(@PathVariable long id){
        dataService.deleteData(id);
    }
    
}
