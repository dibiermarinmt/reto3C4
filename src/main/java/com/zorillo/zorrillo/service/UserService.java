
// Service Package
package com.zorillo.zorrillo.service;

import java.util.List;
import java.util.Optional;

import com.zorillo.zorrillo.model.NextId;
// Zorrillo imports
import com.zorillo.zorrillo.model.User;
import com.zorillo.zorrillo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
// Spring Boot imports
import org.springframework.stereotype.Service;

// Sripong Boot annotation for service
@Service
public class UserService {

    //Spring Boot annotation for inastances
    @Autowired
    UserRepository repository; // User repository instance
    
    // Store new user
    public void storeNewUser(User user) {
        if(user.getId() != null) {
            Optional<User> aux = repository.findUserById(user.getId());
            if(aux.isEmpty()) {
                repository.saveUser(user);
            }
        } else {
            Integer id = 1;
            Optional<User> aux = repository.findUserById(id);
            while(!aux.isEmpty()) {
                id++;
                aux = repository.findUserById(id);
            }
            user.setId(id);
            repository.saveUser(user);
        }
    }
    
    // Return a list with all users
    public List<User> findAllUsers() {
        return repository.findAllUsers();
    }
    
    // Check email
    public boolean checkEmailExistence(String email) {
        Optional<User> user = repository.findUserByEmail(email);
        return !user.isEmpty();
    }

    // Find user by id
    public User findUserById(Integer id) {
        Optional<User> user = repository.findUserById(id);
        if(!user.isEmpty()) {
            return user.get();
        }
        return new User(null, null, null, null, null, null, null, null, null);
    }

    // Find user by email and password
    public User findUserByEmailAndPassword(String email, String password) {
        Optional<User> user = repository.findUserByEmailAndPassword(email, password);
        if(!user.isEmpty()) {
            return user.get();
        }
        return new User(null, null, null, null, null, null, null, null, null);
    }

    // Update user
    public void updateUser(User user){
        if(user.getId() != null) {
            Optional<User> aux = repository.findUserById(user.getId());
            if(!aux.isEmpty()){
            /**
             *  Check all keys of user and update
             * 
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

            
            if(user.getIdentification() != null) {
                aux.get().setIdentification(user.getIdentification());
            }
            if(user.getName() != null) {
                aux.get().setName(user.getName());
            }
            if(user.getAddress() != null) {
                aux.get().setAddress(user.getAddress());
            }
            if(user.getCellPhone() != null) {
                aux.get().setCellPhone(user.getCellPhone());
            }
            if(user.getEmail() != null) {
                aux.get().setEmail(user.getEmail());
            }
            if(user.getPassword() != null) {
                aux.get().setPassword(user.getPassword());
            }
            if(user.getZone() != null) {
                aux.get().setZone(user.getZone());
            }
            if(user.getType() != null) {
                aux.get().setType(user.getType());
            }

            // Update user
            repository.saveUser(aux.get());
            }
        }
    }

    // Delete user by Id
    public void deleteUserById(Integer id) {
        Optional<User> user = repository.findUserById(id);
        if(user.get() != null) {
            repository.deleteUser(user.get());
        }
    }

    // Check id user existence
    public boolean checkIdExistence(Integer id) {
        Optional<User> user = repository.findUserById(id);
        return !user.isEmpty();
    }

    // Get next integer id for new user
    public NextId findNextId() {
        Integer id = 1;
        Optional<User> user = repository.findUserById(id);
        while(!user.isEmpty()) {
            id++;
            user = repository.findUserById(id);
        }
        NextId nextId = new NextId();
        nextId.setNextId(id);
        return nextId;
    }
}
