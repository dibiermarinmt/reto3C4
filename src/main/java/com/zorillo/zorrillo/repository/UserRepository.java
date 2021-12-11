// Repostory Package
package com.zorillo.zorrillo.repository;

// Util imports
import java.util.List;
import java.util.Optional;

// Zorrillo imports
import com.zorillo.zorrillo.model.User;
import com.zorillo.zorrillo.repository.mongo.UserMongoRepository;

// Spring Boot
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

// Sping Boot repository annotation
@Repository
public class UserRepository {

    // Sping Boot autowird annotation for instances 
    @Autowired
    UserMongoRepository mongo;

    // Store or update an User
    public User saveUser(User user) {
        return mongo.save(user);
    }

    // Return a list with all users
    public List<User> findAllUsers() {
        return (List<User>) mongo.findAll();
    }

    // Find an user by email
    public Optional<User> findUserByEmail(String email) {
        return mongo.findByEmail(email);
    }

    // Find user by email and password
    public Optional<User> findUserByEmailAndPassword(String email, String password) {
        return mongo.findByEmailAndPassword(email, password);
    }

    // Find user by id
    public Optional<User> findUserById(Integer id){
       return mongo.findById(id);
    }

    // Delete user by id
    public void deleteUser(User user) {
        mongo.delete(user);
    }
}
