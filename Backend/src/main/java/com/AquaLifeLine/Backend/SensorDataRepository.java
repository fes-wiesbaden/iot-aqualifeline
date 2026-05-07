package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;
import java.util.List;

public interface SensorDataRepository extends org.springframework.data.jpa.repository.JpaRepository<SensorData, Long> {
    List<SensorData> findBySensorSet_IdAndTimestampBetween(Long sensorSetId, LocalDateTime start, LocalDateTime end);
    List<SensorData> findBySensorSet_Id(Long sensorSetId);
}
