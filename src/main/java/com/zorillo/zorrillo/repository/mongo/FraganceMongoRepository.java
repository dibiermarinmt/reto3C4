
// Mongo package
package com.zorillo.zorrillo.repository.mongo;

// Zorrillo imports
import com.zorillo.zorrillo.model.Fragance; // Fragance model

// Mongo Repository
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FraganceMongoRepository extends MongoRepository<Fragance, String> {
    /* 
    //Examples

    // Find user by email
    Optional<User> findByEmail(String email);

    // Find user by email and password
    Optional<User> findByEmailAndPassword(String email, String password);

    /**List<Fragance> findAllByPriceLessThanEqual(Float price);

    @Query("{price: {$lte:?0}}")
    public List<Fragance> findFraganceByPrice(Float price);
    */
}
