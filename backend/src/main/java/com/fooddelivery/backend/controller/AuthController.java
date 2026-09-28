package com.fooddelivery.backend.controller;

import com.fooddelivery.backend.entity.Otp;
import com.fooddelivery.backend.entity.User;
import com.fooddelivery.backend.repository.OtpRepository;
import com.fooddelivery.backend.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    private final OtpRepository otpRepository;
    private final UserRepository userRepository;

    public AuthController(OtpRepository otpRepository, UserRepository userRepository) {
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/check-mobile")
    public Map<String, String> checkMobile(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        Map<String, String> response = new HashMap<>();
        User user = userRepository.findByMobile(mobile);
        response.put("exists", user == null ? "false" : "true");
        return response;
    }

    @PostMapping("/send-otp")
    public Map<String, String> sendOtp(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        if (mobile == null || mobile.isBlank()) {
            return message("Mobile number is required");
        }

        String code = String.format("%04d", new Random().nextInt(10000));

        Otp otp = otpRepository.findByMobile(mobile);
        if (otp == null) {
            otp = new Otp();
            otp.setMobile(mobile);
        }
        otp.setCode(code);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otp);

        System.out.println("OTP for " + mobile + " is " + code);

        return message("OTP sent. Check the backend console.");
    }

    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        String code = body.get("code");
        if (code == null) {
            code = body.get("otp");
        }

        Map<String, String> otpError = checkOtp(mobile, code);
        if (otpError != null) {
            return otpError;
        }

        User user = userRepository.findByMobile(mobile);
        if (user == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP verified. Create your account.");
            response.put("exists", "false");
            return response;
        }

        otpRepository.delete(otpRepository.findByMobile(mobile));
        Map<String, String> success = userMap(user);
        success.put("message", "Logged in");
        success.put("exists", "true");
        return success;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> body) {
        String mobile = body.get("mobile");
        String name = body.get("name");
        String email = body.get("email");
        String code = body.get("code");

        if (name == null || name.isBlank()) {
            return message("Name is required");
        }

        if (userRepository.findByMobile(mobile) != null) {
            return message("Account already exists. Enter OTP to login.");
        }

        Map<String, String> otpError = checkOtp(mobile, code);
        if (otpError != null) {
            return otpError;
        }

        User user = new User();
        user.setMobile(mobile);
        user.setName(name.trim());
        user.setEmail(email == null ? "" : email.trim());
        user = userRepository.save(user);

        otpRepository.delete(otpRepository.findByMobile(mobile));

        Map<String, String> success = userMap(user);
        success.put("message", "Account created");
        success.put("exists", "true");
        return success;
    }

    private Map<String, String> checkOtp(String mobile, String code) {
        if (mobile == null || mobile.isBlank()) {
            return message("Mobile number is required");
        }
        if (code == null || code.isBlank()) {
            return message("OTP is required");
        }

        Otp existingOtp = otpRepository.findByMobile(mobile);
        if (existingOtp == null) {
            return message("No OTP found");
        }
        if (existingOtp.getExpiresAt() == null
                || existingOtp.getExpiresAt().isBefore(LocalDateTime.now())) {
            return message("OTP expired");
        }
        if (!existingOtp.getCode().equals(code)) {
            return message("Invalid OTP");
        }
        return null;
    }

    private Map<String, String> userMap(User user) {
        Map<String, String> success = new HashMap<>();
        success.put("id", String.valueOf(user.getId()));
        success.put("mobile", user.getMobile());
        success.put("name", user.getName() == null ? "" : user.getName());
        success.put("email", user.getEmail() == null ? "" : user.getEmail());
        return success;
    }

    private Map<String, String> message(String text) {
        Map<String, String> error = new HashMap<>();
        error.put("message", text);
        return error;
    }
}
