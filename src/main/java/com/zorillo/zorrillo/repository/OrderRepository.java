// Repostory Package
package com.zorillo.zorrillo.repository;

// Util imports
import java.util.List;
import java.util.Optional;

// Zorrillo imports
import com.zorillo.zorrillo.model.Order;
import com.zorillo.zorrillo.repository.mongo.OrderMongoRepository;

// Spring Boot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

// Sping Boot repository annotation
@Repository
public class OrderRepository {

    // Sping Boot autowired annotation for instances 
    @Autowired
    OrderMongoRepository mongo;

    // Store or update an Order
    public Order saveOrder(Order order) {
        return mongo.save(order);
    }

    // Return a list with all Orders
    public List<Order> findAllOrders() {
        return (List<Order>) mongo.findAll();
    }

    // Find order by id
    public Optional<Order> findOrderById(Integer id){
       return mongo.findById(id);
    }

    public List<Order> findOrdersBySalesManZone(String zone) {
        return mongo.findBySalesManZone(zone);
    }

    /* Delete user by id
    public void deleteUser(User user) {
        mongo.delete(user);
    }*/
}
