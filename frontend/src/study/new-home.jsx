// STUDY FILE — current Home using backend APIs
// Same idea as pages/home.jsx (simplified layout for reading)

import { Link } from "react-router-dom"
import Restaurant from "../components/Restaurant"
import Dishes from "../components/Dishes"
import { useState, useEffect } from "react"

function HomeNew() {
  const [query, setQuery] = useState("")
  const [restaurants, setRestaurants] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))

    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
  }, [])

  const visble = restaurants.filter((restaurant) => {
    const q = query.toLowerCase()
    const inName = restaurant.name?.toLowerCase().includes(q)
    const inCuisine = restaurant.cuisine?.toLowerCase().includes(q)
    const inMenu = restaurant.foods?.some((food) =>
      food.name.toLowerCase().includes(q)
    )
    return inName || inCuisine || inMenu
  })

  return (
    <div className="pb-24">
      {categories.map((item) => (
        <Link key={item.id} to={`/dish/${encodeURIComponent(item.name)}`}>
          <Dishes name={item.name} image={item.image} />
        </Link>
      ))}
      {visble.map((restaurant) => (
        <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
          <Restaurant
            name={restaurant.name}
            image={restaurant.image}
            rating={restaurant.rating}
            distance={restaurant.distance}
            deliveryTime={restaurant.deliveryTime}
            offer={restaurant.offer}
            cuisine={restaurant.cuisine}
          />
        </Link>
      ))}
    </div>
  )
}

export default HomeNew
