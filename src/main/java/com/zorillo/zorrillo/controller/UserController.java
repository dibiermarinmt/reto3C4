
// Controller package
package com.zorillo.zorrillo.controller;

import java.util.List;

import com.zorillo.zorrillo.model.NextId;
// Zorrillo imports
import com.zorillo.zorrillo.model.User;
import com.zorillo.zorrillo.service.UserService;

// Sring Boot imports
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/api/user")
public class UserController {

    // Spring Boot annotation for instances
    @Autowired
    UserService service; // User service instance

    // Mapping to store new user
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED) // Response created
    public void storeNewUser(@RequestBody User user) {
        service.storeNewUser(user);
    }

    // Mapping to get a list with all users
    @GetMapping("/all")
    public List<User> findAllUsers() {
        return service.findAllUsers();
    }

    // Mapping to check email existence
    @GetMapping("/emailexist/{email}")
    public boolean checkEmailExistence(@PathVariable("email") String email) {
        return service.checkEmailExistence(email);
    }

    // Mapping to get user by id
    @GetMapping("/{id}")
    public User findUserById(@PathVariable("id") Integer id) {
        return service.findUserById(id);
    }


    // Mapping to find user by email and password
    @GetMapping("/{email}/{password}")
    public User findUserByEmailAndPassword(@PathVariable("email") String email, @PathVariable("password") String password) {
        return service.findUserByEmailAndPassword(email, password);
    }

    // Mapping to update an user
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateUser(@RequestBody User user) {
        service.updateUser(user);
    }

    // Mapping to delete and user by id
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable("id") Integer id) {
        service.deleteUserById(id);
    }

    // Mapping to check id user existence
    @GetMapping("/idexist/{id}")
    public boolean checkIdExistence(@PathVariable("id") Integer id) {
        return service.checkIdExistence(id);
    }

    //Mapping to get next integer id for new user
    @GetMapping("/nextid")
    public NextId findNextId() {
        return service.findNextId();
    }
}
