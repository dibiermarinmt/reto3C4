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
@Document(collection="user")
public class User {

    /**
     *  Document example of a user in data base:
     * 
     * { 
     *  "id": 1,
     *  "identification": "123456",
     *  "name": "alan brito",
     *  "address": "CR 34-45",
     *  "cellPhone": "311222222",
     *  "email": "alanbrito@gmail.com",
     *  "password": "Demo123.",
     *  "zone": "ZONA 1",
     *  "type": "COORD"
     * }
     */
    
    // Spring Boot annotation for id key
    @Id
    private Integer id;
    private String identification;
    private String name;
    private String address;
    private String cellPhone;
    private String email;
    private String password;
    private String zone;
    private String type; 
}
