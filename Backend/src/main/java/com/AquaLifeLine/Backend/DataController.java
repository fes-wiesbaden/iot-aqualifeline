package com.AquaLifeLine.Backend;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

    @GetMapping("/{id}")
    public Data getDatabyId(@PathVariable long id){
        return dataService.getDataById(id);
    }

    @PostMapping
    public Data createData(@RequestBody Data data){
        return dataService.saveData(data);
    }
}
