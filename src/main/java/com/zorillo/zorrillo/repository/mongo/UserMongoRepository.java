// Mongo package
package com.zorillo.zorrillo.repository.mongo;

// Util imports
import java.util.Optional;

// Zorrillo imports
import com.zorillo.zorrillo.model.User; // User model

// Mongo Repository
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserMongoRepository extends MongoRepository<User, Integer> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Find user by email and password
    Optional<User> findByEmailAndPassword(String email, String password);
}
