package com.fooddelivery.backend.config;

import com.fooddelivery.backend.entity.Category;
import com.fooddelivery.backend.entity.Menu;
import com.fooddelivery.backend.entity.Restaurant;
import com.fooddelivery.backend.repository.CategoryRepository;
import com.fooddelivery.backend.repository.RestaurantRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RestaurantRepository restaurantRepository;
    private final CategoryRepository categoryRepository;

    public DataSeeder(
            RestaurantRepository restaurantRepository,
            CategoryRepository categoryRepository
    ) {
        this.restaurantRepository = restaurantRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        seedCategories();
        if (restaurantRepository.count() == 0) {
            seedRestaurants();
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() > 0) {
            return;
        }
        categoryRepository.save(category("Pizza", "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"));
        categoryRepository.save(category("Burger", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"));
        categoryRepository.save(category("Biryani", "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400"));
        categoryRepository.save(category("Rolls", "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400"));
        categoryRepository.save(category("Dessert", "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400"));
        categoryRepository.save(category("Tea", "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400"));
    }

    private Category category(String name, String image) {
        Category item = new Category();
        item.setName(name);
        item.setImage(image);
        return item;
    }

    private void seedRestaurants() {
        restaurantRepository.save(restaurant(
                "Pizza Palace",
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
                4.5,
                "2 km",
                "30 mins",
                "20% OFF",
                "Pizza, Italian",
                List.of(
                        food("Margherita Pizza", 199.0),
                        food("Farmhouse Pizza", 299.0),
                        food("Garlic Bread", 99.0)
                )
        ));

        restaurantRepository.save(restaurant(
                "Slice Hub",
                "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
                4.4,
                "1.2 km",
                "22 mins",
                "ITEMS AT 129",
                "Pizza, Fast Food",
                List.of(
                        food("Veg Pizza", 169.0),
                        food("Pepperoni Pizza", 249.0),
                        food("Cheese Burst Pizza", 279.0)
                )
        ));

        restaurantRepository.save(restaurant(
                "Burger King",
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
                4.3,
                "1.5 km",
                "25 mins",
                "ITEMS AT 99",
                "Burgers, Fast Food",
                List.of(
                        food("Whopper", 179.0),
                        food("Chicken Burger", 149.0),
                        food("Fries", 89.0)
                )
        ));

        restaurantRepository.save(restaurant(
                "Biryani House",
                "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
                4.6,
                "3 km",
                "35 mins",
                "50% OFF",
                "Biryani, North Indian",
                List.of(
                        food("Chicken Biryani", 249.0),
                        food("Mutton Biryani", 329.0),
                        food("Raita", 49.0)
                )
        ));

        restaurantRepository.save(restaurant(
                "Rolls R Us",
                "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
                4.2,
                "1 km",
                "20 mins",
                "ITEMS AT 79",
                "Rolls, Street Food",
                List.of(
                        food("Paneer Roll", 129.0),
                        food("Chicken Kathi Roll", 159.0),
                        food("Egg Roll", 99.0)
                )
        ));

        restaurantRepository.save(restaurant(
                "Dessert Delight",
                "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800",
                4.7,
                "2.5 km",
                "28 mins",
                "30% OFF",
                "Desserts, Bakery",
                List.of(
                        food("Chocolate Cake", 149.0),
                        food("Brownie", 89.0),
                        food("Ice Cream Sundae", 119.0)
                )
        ));

        restaurantRepository.save(restaurant(
                "Tea Time",
                "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
                4.4,
                "0.8 km",
                "15 mins",
                "BUY 1 GET 1",
                "Tea, Snacks",
                List.of(
                        food("Masala Chai", 49.0),
                        food("Samosa", 39.0),
                        food("Veg Sandwich", 79.0)
                )
        ));
    }

    private Restaurant restaurant(
            String name,
            String image,
            Double rating,
            String distance,
            String deliveryTime,
            String offer,
            String cuisine,
            List<Menu> foods
    ) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(name);
        restaurant.setImage(image);
        restaurant.setRating(rating);
        restaurant.setDistance(distance);
        restaurant.setDeliveryTime(deliveryTime);
        restaurant.setOffer(offer);
        restaurant.setCuisine(cuisine);
        restaurant.setFoods(new ArrayList<>(foods));
        for (Menu food : foods) {
            food.setRestaurant(restaurant);
        }
        return restaurant;
    }

    private Menu food(String name, Double price) {
        Menu menu = new Menu();
        menu.setName(name);
        menu.setPrice(price);
        return menu;
    }
}
