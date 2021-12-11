// Model Package
package com.zorillo.zorrillo.model;

// Spring Boot imports
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Lombok imports
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Lobmbok annotations
@Data
@AllArgsConstructor
@NoArgsConstructor

// Spring Boot annotation
@Document(collection="fragance")
public class Fragance {

    /**
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
    
    // Spring Boot annotation for id key
    @Id
    String reference;
    String brand;
    String category;
    String presentation;
    String description;
    Boolean availability;
    Double price;
    Integer quantity;
    String photography;
}
