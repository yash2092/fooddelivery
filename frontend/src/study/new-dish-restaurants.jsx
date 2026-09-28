// STUDY FILE — current category page using backend list + filter

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Restaurant from "../components/Restaurant"

function DishRestaurantsNew() {
  const { name } = useParams()
  const dishName = decodeURIComponent(name)
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
  }, [])

  const q = dishName.toLowerCase()
  const matches = restaurants.filter((restaurant) => {
    const inCuisine = restaurant.cuisine?.toLowerCase().includes(q)
    const inMenu = restaurant.foods?.some((food) =>
      food.name.toLowerCase().includes(q)
    )
    return inCuisine || inMenu
  })

  return (
    <div>
      <h1>{dishName}</h1>
      {matches.map((restaurant) => (
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

export default DishRestaurantsNew
