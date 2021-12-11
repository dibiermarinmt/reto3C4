
// Service Package
package com.zorillo.zorrillo.service;

import java.util.List;
import java.util.Optional;

// Zorrillo imports
import com.zorillo.zorrillo.model.Fragance;
import com.zorillo.zorrillo.repository.FraganceRepository;

// Spring Boot imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Sripong Boot annotation for service
@Service
public class FraganceService {

    //Spring Boot annotation for inastances
    @Autowired
    FraganceRepository repository; // Fragance repository instance
    
    // Store new fragance
    public void storeNewFragance(Fragance fragance) {
        repository.saveFragance(fragance);
    }
    
    // Return a list with all fragances
    public List<Fragance> findAllFragances() {
        return repository.findAllFragances();
    }

    public Fragance findFraganceByReference(String reference) {
        Optional<Fragance> fragance = repository.findFraganceByReference(reference);
        if(!fragance.isEmpty()) {
            return fragance.get();
        }
        return new Fragance(null, null, null, null, null, null, null, null, null);
    }

    // Update fragance
    public void updateFragance(Fragance fragance){
        if(fragance.getReference() != null) {
            Optional<Fragance> aux = repository.findFraganceByReference(fragance.getReference());
            if(!aux.isEmpty()) {

                /**
                 *  Check all keys of fragance and update
                 * 
                 *  Document example of a user in data base:
                 * 
                 * {
                 *  "reference": "AP-903",
                 *  "brand": "Jaguar",
                 *  "category": "Cologne",
                 *  "presentation": "spray 1.7 oz",
                 *  "description": "vanilla, iris, musk, amber, sandalwood and rose.",
                 *  "availability": true,
                 *  "price": 350000,
                 *  "quantity": 20,
                 *  "photography": "www.catalog.com/sandalwood.png"
                 * }
                 */
        
                if(fragance.getBrand() != null) {
                    aux.get().setBrand(fragance.getBrand());
                }
                if(fragance.getCategory() != null) {
                    aux.get().setCategory(fragance.getCategory());
                }
                if(fragance.getPresentation() != null) {
                    aux.get().setPresentation(fragance.getPresentation());
                }
                if(fragance.getDescription() != null) {
                    aux.get().setDescription(fragance.getDescription());
                }
                if(fragance.getAvailability() != null) {
                    aux.get().setAvailability(fragance.getAvailability());
                }
                if(fragance.getPrice() != null) {
                    aux.get().setPrice(fragance.getPrice());
                }
                if(fragance.getQuantity() != null) {
                    aux.get().setQuantity(fragance.getQuantity());
                }
                if(fragance.getPhotography() != null) {
                    aux.get().setPhotography(fragance.getPhotography());
                }
                
                // Update fragance
                repository.saveFragance(aux.get());
            }
        }
    }

    // Delete fragance by reference
    public void deleteFraganceByReference(String reference) {
        Optional<Fragance> fragance = repository.findFraganceByReference(reference);
        if(fragance.get() != null) {
            repository.deleteFragance(fragance.get());
        }
    }
}
