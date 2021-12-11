// Model Package
package com.zorillo.zorrillo.model;

import java.util.Date;

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
     *  "id": 3,
     *  "identification": "46669989",
     *  "name": "BLODY MARRY",
     *  "birthtDay": "1996-11-15T05:00:00.000+00:00",
     *  "monthBirthtDay": "11",
     *  "address": "CR 34-45",
     *  "cellPhone": "3174565625",
     *  "email": "stellez@gmail.com",
     *  "password": "Demo123.",
     *  "zone": "ZONA 2",
     *  "type": "ASE"
     * }
     */
    
    // Spring Boot annotation for id key
    @Id
    private Integer id;
    private String identification;
    private String name;
    private Date birthtDay;
    private String monthBirthtDay;
    private String address;
    private String cellPhone;
    private String email;
    private String password;
    private String zone;
    private String type; 
}
