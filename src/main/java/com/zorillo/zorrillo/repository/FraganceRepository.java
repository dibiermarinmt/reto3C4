// Repostory Package
package com.zorillo.zorrillo.repository;

// Util imports
import java.util.List;
import java.util.Optional;

// Zorrillo imports
import com.zorillo.zorrillo.model.Fragance;
import com.zorillo.zorrillo.repository.mongo.FraganceMongoRepository;

// Spring Boot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

// Sping Boot repository annotation
@Repository
public class FraganceRepository {

    // Sping Boot autowird annotation for instances 
    @Autowired
    FraganceMongoRepository mongo;

    // Store or update a Fragance
    public Fragance saveFragance(Fragance fragance) {
        return mongo.save(fragance);
    }

    // Return a list with all fragances
    public List<Fragance> findAllFragances() {
        return (List<Fragance>) mongo.findAll();
    }

    // Find fragance by reference
    public Optional<Fragance> findFraganceByReference(String reference){
       return mongo.findById(reference);
    }

    // Delete fragance
    public void deleteFragance(Fragance fragance) {
        mongo.delete(fragance);
    }
}
