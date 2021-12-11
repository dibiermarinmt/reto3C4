
// Controller package
package com.zorillo.zorrillo.controller;

import java.util.List;

// Zorrillo imports
import com.zorillo.zorrillo.model.Fragance;
import com.zorillo.zorrillo.service.FraganceService;

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
@RequestMapping("/api/fragance")
public class FraganceController {

    // Spring Boot annotation for instances
    @Autowired
    FraganceService service; // Fragance service instance

    // Mapping to store new fragance
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED) // Response created
    public void storeNewFragance(@RequestBody Fragance fragance) {
        service.storeNewFragance(fragance);
    }

    // Mapping to get a list with all fragances
    @GetMapping("/all")
    public List<Fragance> findAllFragances() {
        return service.findAllFragances();
    }

    @GetMapping("/{reference}")
    public Fragance findFraganceByReference(@PathVariable("reference") String reference) {
        return service.findFraganceByReference(reference);
    }

    // Mapping to update an fragance
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateFragance(@RequestBody Fragance fragance) {
        service.updateFragance(fragance);
    }

    // Mapping to delete a fragance by reference
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFraganceByReference(@PathVariable("id") String id) {
        service.deleteFraganceByReference(id);
    }
}
