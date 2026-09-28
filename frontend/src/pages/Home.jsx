import { Link, useNavigate } from 'react-router-dom'
import Restaurant from '../components/Restaurant'
import Dishes from '../components/Dishes'
import { useState, useEffect } from 'react'
import { useAddress } from '../context/AddressContext'

function Home() {
  const navigate = useNavigate()
  const { selected } = useAddress()
  const [query, setQuery] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/restaurants')
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching restaurants:', error))

    fetch('http://localhost:8080/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error))
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
    <div className="pb-24 bg-zinc-950 text-white min-h-screen">
      <header className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <button type="button" className="text-left" onClick={() => navigate('/addresses')}>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
              Deliver to
            </p>
            <h2 className="text-lg font-bold text-white">
              {selected?.label || 'Select address'} ▾
            </h2>
            {selected?.line && (
              <p className="max-w-[220px] truncate text-xs text-zinc-400">
                {selected.line}, {selected.city}
              </p>
            )}
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-xl shadow-inner">
            🔔
          </div>
        </div>
      </header>

      <div className="px-4 pt-4">
        <input
          type="text"
          value={query}
          onFocus={() => navigate('/search')}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for restaurants or menu..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <section className="px-4 pt-8">
        <h2 className="text-xl font-bold text-white">What's on your mind?</h2>
        <div className="no-scrollbar mt-4 flex w-full gap-5 overflow-x-auto pb-2">
          {categories.map((item) => (
            <Link
              key={item.id ?? item.name}
              to={`/dish/${encodeURIComponent(item.name)}`}
              className="shrink-0"
            >
              <Dishes name={item.name} image={item.image} />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pt-8">
        <h2 className="text-xl font-bold text-white">
          Top restaurants near you
        </h2>
        <div className="mt-4 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
          {visble.map((restaurant) => (
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
    </div>
  )
}

export default Home
