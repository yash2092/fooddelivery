package com.fooddelivery.backend.repository;

import com.fooddelivery.backend.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Otp findByMobile(String mobile);
}
