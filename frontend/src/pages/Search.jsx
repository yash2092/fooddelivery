import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Restaurant from "../components/Restaurant"

function Search() {
  const [query, setQuery] = useState("")
  const [restaurants, setRestaurants] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch(() => setRestaurants([]))

    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]))
  }, [])

  const q = query.trim().toLowerCase()

  const restaurantMatches = q
    ? restaurants.filter((restaurant) => {
        const inName = restaurant.name?.toLowerCase().includes(q)
        const inCuisine = restaurant.cuisine?.toLowerCase().includes(q)
        const inMenu = restaurant.foods?.some((food) =>
          food.name.toLowerCase().includes(q)
        )
        return inName || inCuisine || inMenu
      })
    : []

  const dishMatches = q
    ? categories.filter((item) => item.name?.toLowerCase().includes(q))
    : []

  const menuMatches = []
  if (q) {
    restaurants.forEach((restaurant) => {
      restaurant.foods?.forEach((food) => {
        if (food.name.toLowerCase().includes(q)) {
          menuMatches.push({ food, restaurant })
        }
      })
    })
  }

  return (
    <div className="px-4 pb-24 pt-6 bg-zinc-950 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-white">Search</h1>
      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search restaurants, dishes, cuisine..."
        className="mt-4 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
      />

      {!q && (
        <p className="mt-8 text-center text-sm text-zinc-400">
          Try pizza, burger, or a restaurant name
        </p>
      )}

      {q && dishMatches.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Dishes
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {dishMatches.map((item) => (
              <Link
                key={item.id ?? item.name}
                to={`/dish/${encodeURIComponent(item.name)}`}
                className="rounded-full bg-orange-500/15 border border-orange-500/30 px-3.5 py-1 text-sm font-medium text-orange-400 hover:bg-orange-500 hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {q && menuMatches.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Menu items
          </h2>
          <div className="mt-2 space-y-2">
            {menuMatches.map(({ food, restaurant }) => (
              <Link
                key={`${restaurant.id}-${food.id ?? food.name}`}
                to={`/restaurant/${restaurant.id}`}
                className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 shadow-md hover:border-zinc-700 transition"
              >
                <div>
                  <p className="font-semibold text-white">{food.name}</p>
                  <p className="text-xs text-zinc-400">{restaurant.name}</p>
                </div>
                <p className="text-sm font-bold text-orange-400">₹{food.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {q && restaurantMatches.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Restaurants
          </h2>
          <div className="mt-3 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
            {restaurantMatches.map((restaurant) => (
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
        </section>
      )}

      {q &&
        dishMatches.length === 0 &&
        menuMatches.length === 0 &&
        restaurantMatches.length === 0 && (
          <p className="mt-8 text-center text-sm text-zinc-400">
            No results for “{query}”
          </p>
        )}
    </div>
  )
}

export default Search
