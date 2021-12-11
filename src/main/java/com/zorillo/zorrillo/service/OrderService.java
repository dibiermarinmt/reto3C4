
// Service Package
package com.zorillo.zorrillo.service;

import java.util.List;
import java.util.Optional;

// Zorrillo imports
import com.zorillo.zorrillo.model.Order;
import com.zorillo.zorrillo.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
// Spring Boot imports
import org.springframework.stereotype.Service;

// Sripong Boot annotation for service
@Service
public class OrderService {

    //Spring Boot annotation for inastances
    @Autowired
    OrderRepository repository; // Orderrepository instance
    
    // Store new order
    public void storeNewOrder(Order order) {
        if(order.getId() != null) {
            Optional<Order> aux = repository.findOrderById(order.getId());
            if(aux.isEmpty()) {
                repository.saveOrder(order);
            }
        } else {
            Integer id = 1;
            Optional<Order> aux = repository.findOrderById(id);
            while(!aux.isEmpty()) {
                id++;
                aux = repository.findOrderById(id);
            }
            order.setId(id);
            repository.saveOrder(order);
        }
    }
    
    // Return a list with all orders
    public List<Order> findAllOrders() {
        return repository.findAllOrders();
    }

    // Find order by id
    public Order findOrderById(Integer id) {
        Optional<Order> order = repository.findOrderById(id);
        if(!order.isEmpty()) {
            return order.get();
        }
        return new Order(null, null, null, null, null, null);
    }

    
    // Update order state
    public void updateOrderState(Order order){
        if(order.getId() != null) {
            Optional<Order> aux = repository.findOrderById(order.getId());
            if(!aux.isEmpty()){
            /**
             *  Check the state of user and update
             */
            if(order.getStatus() != null) {
                aux.get().setStatus(order.getStatus());
            }
            // Update order
            repository.saveOrder(aux.get());
            }
        }
    }


    // Find orders by salesman zone
    public List<Order> findOrdersBySalesManZone(String zone) {
        return repository.findOrdersBySalesManZone(zone);
    }

    /* Delete user by Id
    public void deleteUserById(Integer id) {
        Optional<User> user = repository.findUserById(id);
        if(user.get() != null) {
            repository.deleteUser(user.get());
        }
    }*/

}
