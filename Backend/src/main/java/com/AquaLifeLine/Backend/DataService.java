package com.AquaLifeLine.Backend;

import java.util.List;

public class DataService {
    public List<Data> getAllData(){
        return List.of();
        
    }

    public Data getDataById(long id){
        return new Data();// Plathalter
    }

    public Data saveData(Data data) {
        return data;
    }
}
