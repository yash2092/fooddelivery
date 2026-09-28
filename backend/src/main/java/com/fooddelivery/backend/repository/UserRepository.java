package com.fooddelivery.backend.repository;

import com.fooddelivery.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByMobile(String mobile);
}
