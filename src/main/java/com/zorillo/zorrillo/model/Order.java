// Model Package
package com.zorillo.zorrillo.model;

// Util pacage
import java.util.Date;
import java.util.Map;

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
@Document(collection="order")
public class Order {

    /**
     *  Document example of an order in data base:
     * 
     * { 
     *  "id": 1,
     *  "registerDay": "2021-09-15T05:00:00.000+00:00",
     *  "status": "Pendiente",
     *  "salesMan": {
     *    "id": 3,
     *     "identification": "46669989",
     *     "name": "BLODY MARRY",
     *     "birthtDay": "1996-11-15T05:00:00.000+00:00",
     *     "monthBirthtDay": "11",
     *     "address": "CR 34-45",
     *     "cellPhone": "3174565625",
     *     "email": "stellez@gmail.com",
     *     "password": "Demo123.",
     *     "zone": "ZONA 2",
     *     "type": "ASE"
     *    }, 
     *   "products": {
     *     "AP-904": {
     *       "reference": "AP-904",
     *       "brand": "VERSAGE",
     *       "category": "CATEGORIA 2",
     *       "presentation": "PRESENTACION 1",
     *       "description": "Descripción",
     *       "availability": true,
     *       "price": 150000,
     *       "quantity": 10,
     *       "photography": "https://www.avasoluciones.com/uploads/2021/09/910-007.jpg"
     *      },
     *     "AP-903": {
     *      "reference": "AP-903",
     *      "brand": "DIOR",
     *      "category": "CATEGORIA 1",
     *      "presentation": "PRESENTACION 1",
     *      "description": "Descripción",
     *      "availability": true,
     *      "price": 150000,
     *      "quantity": 10,
     *      "photography": "https://www.avasoluciones.com/uploads/2021/09/910-006127.jpg"
     *      }
     *     },
     *  "quantities": {
     *    "AP-904": 1,
     *    "AP-903": 1 
     *    }
     *   }
     */
    // Order status
    public static String PENDING = "Pendiente";
    public static String APROVED = "Aprobada";
    public static String REJECTED = "Rechazada";

    // Spring Boot annotation for id key
    @Id
    private Integer id; // Order's id
    private Date registerDay;
    private String status;
    private User salesMan;
    private Map<String, Fragance> products;
    private Map<String, Integer> quantities; 
}
