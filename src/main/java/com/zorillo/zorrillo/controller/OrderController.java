
// Controller package
package com.zorillo.zorrillo.controller;

import java.util.List;

// Zorrillo imports
import com.zorillo.zorrillo.model.Order;
import com.zorillo.zorrillo.service.OrderService;

// Sring Boot imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

// Spring Boot annotations for controller
@RestController
@RequestMapping("/api/order")
public class OrderController {

    // Spring Boot annotation for instances
    @Autowired
    OrderService service; // User service instance

    // Mapping to store new order
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED) // Response created
    public void storeNewOrder(@RequestBody Order order) {
        service.storeNewOrder(order);
    }

    // Mapping to get a list with all orders
    @GetMapping("/all")
    public List<Order> findAllOrders() {
        return service.findAllOrders();
    }

    // Mapping to get order by id
    @GetMapping("/{id}")
    public Order findorderById(@PathVariable("id") Integer id) {
        return service.findOrderById(id);
    }

    // Mapping to update order state
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateOrderState(@RequestBody Order order) {
        service.updateOrderState(order);
    }

    @GetMapping("/zona/{zone}")
    public List<Order> findOrdersBySalesManZone(@PathVariable("zone") String zone) {
        return service.findOrdersBySalesManZone(zone);
    }

    /* Mapping to delete and user by id
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable("id") Integer id) {
        service.deleteUserById(id);
    }*/
}
