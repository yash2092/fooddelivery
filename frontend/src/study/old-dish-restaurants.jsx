// STUDY FILE — earlier category page using restaurants.js helper

import { Link, useParams } from "react-router-dom"
import Restaurant from "../components/Restaurant"
import { restaurantsWithDish } from "../data/restaurants"

function DishRestaurantsOld() {
  const { name } = useParams()
  const dishName = decodeURIComponent(name)
  const matches = restaurantsWithDish(dishName)

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

export default DishRestaurantsOld
