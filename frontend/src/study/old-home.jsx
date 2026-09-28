// STUDY FILE — earlier Home using restaurants.js
// Not used by the running app. Compare with new-home.jsx

import { Link } from "react-router-dom"
import Restaurant from "../components/Restaurant"
import Dishes from "../components/Dishes"
import { dishes, restaurants } from "../data/restaurants"
import { useState } from "react"

function HomeOld() {
  const [query, setQuery] = useState("")

  const visble = restaurants.filter((restaurant) => {
    const q = query.toLowerCase()
    const inName = restaurant.name.toLowerCase().includes(q)
    const inCuisine = restaurant.cuisine.toLowerCase().includes(q)
    const inMenu = restaurant.foods.some((food) =>
      food.name.toLowerCase().includes(q)
    )
    return inName || inCuisine || inMenu
  })

  return (
    <div className="pb-24">
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {dishes.map((dish) => (
        <Link key={dish.name} to={`/dish/${encodeURIComponent(dish.name)}`}>
          <Dishes name={dish.name} image={dish.image} />
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

export default HomeOld
