import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Restaurant from "../components/Restaurant"

function DishRestaurants() {
  const { name } = useParams()
  const dishName = decodeURIComponent(name)
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/restaurants")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch(() => setRestaurants([]))
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
    <div className="px-4 pb-24 pt-6 bg-zinc-950 text-white min-h-screen">
      <Link to="/" className="text-sm font-semibold text-orange-500 hover:text-orange-400">
        ← Back to Home
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-white">{dishName}</h1>
      <p className="mt-1 text-sm text-zinc-400">
        {matches.length} restaurant{matches.length === 1 ? "" : "s"} serve this
      </p>

      {matches.length === 0 ? (
        <p className="mt-8 text-center text-zinc-400">
          No restaurants found for {dishName}.
        </p>
      ) : (
        <div className="mt-4 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
          {matches.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className="block"
            >
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
      )}
    </div>
  )
}

export default DishRestaurants
