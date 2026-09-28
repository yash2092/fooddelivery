export const restaurants = [
  {
    id: "pizza-palace",
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    rating: 4.5,
    distance: "2 km",
    deliveryTime: "30 mins",
    offer: "20% OFF",
    cuisine: "Pizza, Italian",
    foods: [
      { name: "Margherita Pizza", price: 199 },
      { name: "Farmhouse Pizza", price: 299 },
      { name: "Garlic Bread", price: 99 },
    ],
  },
  {
    id: "slice-hub",
    name: "Slice Hub",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
    rating: 4.4,
    distance: "1.2 km",
    deliveryTime: "22 mins",
    offer: "ITEMS AT ₹129",
    cuisine: "Pizza, Fast Food",
    foods: [
      { name: "Veg Pizza", price: 169 },
      { name: "Pepperoni Pizza", price: 249 },
      { name: "Cheese Burst Pizza", price: 279 },
    ],
  },
  {
    id: "burger-king",
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    rating: 4.3,
    distance: "1.5 km",
    deliveryTime: "25 mins",
    offer: "ITEMS AT ₹99",
    cuisine: "Burgers, Fast Food",
    foods: [
      { name: "Whopper", price: 179 },
      { name: "Chicken Burger", price: 149 },
      { name: "Fries", price: 89 },
    ],
  },
  {
    id: "biryani-house",
    name: "Biryani House",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800",
    rating: 4.6,
    distance: "3 km",
    deliveryTime: "35 mins",
    offer: "50% OFF",
    cuisine: "Biryani, North Indian",
    foods: [
      { name: "Chicken Biryani", price: 249 },
      { name: "Mutton Biryani", price: 329 },
      { name: "Raita", price: 49 },
    ],
  },
  {
    id: "rolls-r-us",
    name: "Rolls R Us",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800",
    rating: 4.2,
    distance: "1 km",
    deliveryTime: "20 mins",
    offer: "ITEMS AT ₹79",
    cuisine: "Rolls, Street Food",
    foods: [
      { name: "Paneer Roll", price: 129 },
      { name: "Chicken Kathi Roll", price: 159 },
      { name: "Egg Roll", price: 99 },
    ],
  },
  {
    id: "dessert-delight",
    name: "Dessert Delight",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800",
    rating: 4.7,
    distance: "2.5 km",
    deliveryTime: "28 mins",
    offer: "30% OFF",
    cuisine: "Desserts, Bakery",
    foods: [
      { name: "Chocolate Cake", price: 149 },
      { name: "Brownie", price: 89 },
      { name: "Ice Cream Sundae", price: 119 },
    ],
  },
  {
    id: "tea-time",
    name: "Tea Time",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
    rating: 4.4,
    distance: "0.8 km",
    deliveryTime: "15 mins",
    offer: "BUY 1 GET 1",
    cuisine: "Tea, Snacks",
    foods: [
      { name: "Masala Chai", price: 49 },
      { name: "Samosa", price: 39 },
      { name: "Veg Sandwich", price: 79 },
    ],
  },
]

export const dishes = [
  { name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
  { name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400" },
  { name: "Biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400" },
  { name: "Rolls", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400" },
  { name: "Dessert", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400" },
  { name: "Tea", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400" },
]

export function restaurantsWithDish(dishName) {
  const query = dishName.toLowerCase()

  return restaurants.filter((restaurant) => {
    const inCuisine = restaurant.cuisine.toLowerCase().includes(query)
    const inMenu = restaurant.foods.some((food) =>
      food.name.toLowerCase().includes(query)
    )
    return inCuisine || inMenu
  })
}
