package com.AquaLifeLine.Backend;

import java.time.LocalDateTime;
import java.util.List;

public interface DataRepository extends org.springframework.data.jpa.repository.JpaRepository<Data, Long> {
    List<Data> findByDeviceId(long deviceId);
    List<Data> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
}
