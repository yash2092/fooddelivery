package com.fooddelivery.backend.controller;

import com.fooddelivery.backend.entity.Address;
import com.fooddelivery.backend.repository.AddressRepository;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressRepository addressRepository;

    public AddressController(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @GetMapping
    public List<Address> getByUser(@RequestParam Long userId) {
        return addressRepository.findByUserId(userId);
    }

    @PostMapping
    public Address create(@RequestBody Address address) {
        return addressRepository.save(address);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        addressRepository.deleteById(id);
    }
}
