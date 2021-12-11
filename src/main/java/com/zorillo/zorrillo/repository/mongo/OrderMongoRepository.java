// Mongo package
package com.zorillo.zorrillo.repository.mongo;

import java.util.List;

// Zorrillo imports
import com.zorillo.zorrillo.model.Order; // User model

// Mongo Repository
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderMongoRepository extends MongoRepository<Order, Integer> {
    List<Order> findBySalesManZone(String zone);
}
