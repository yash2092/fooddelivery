import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Menu() {
  const { id } = useParams()
  const { addItem, removeItem, getQuantity, totalCount } = useCart()
  const [query, setQuery] = useState("")
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:8080/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data)
        setLoading(false)
      })
      .catch(() => {
        setRestaurant(null)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <p className="px-4 py-10 text-center text-zinc-400">Loading menu...</p>
    )
  }

  if (!restaurant || !restaurant.id) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-zinc-400">Restaurant not found.</p>
        <Link to="/" className="mt-4 inline-block font-semibold text-orange-500">
          ← Back to Home
        </Link>
      </div>
    )
  }

  const visibleFoods = (restaurant.foods ?? []).filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="pb-24 bg-zinc-950 text-white min-h-screen">
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <Link
          to="/"
          className="absolute left-4 top-4 rounded-full bg-zinc-900/90 border border-zinc-700/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-md"
        >
          ← Back
        </Link>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <p className="mt-1 text-sm text-zinc-300">{restaurant.cuisine}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-zinc-900 border-b border-zinc-800 px-4 py-3 text-sm text-zinc-300 shadow-sm">
        <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
          ★ {restaurant.rating}
        </span>
        <span>{restaurant.distance}</span>
        <span>•</span>
        <span>{restaurant.deliveryTime}</span>
      </div>

      <div className="px-4 pt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search menu..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-orange-500"
        />
      </div>

      <section className="px-4 pt-6">
        <h2 className="text-lg font-bold text-white">Menu</h2>
        {visibleFoods.length === 0 ? (
          <p className="mt-6 text-center text-sm text-zinc-400">
            No items found
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            {visibleFoods.map((food) => {
              const quantity = getQuantity(food.name, restaurant.id)

              return (
                <div
                  key={food.id ?? food.name}
                  className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 shadow-md"
                >
                  <div>
                    <p className="font-semibold text-white">{food.name}</p>
                    <p className="mt-1 text-sm text-zinc-400">₹{food.price}</p>
                  </div>

                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => addItem(food, restaurant)}
                      className="rounded-lg bg-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 active:bg-orange-700"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg border border-orange-500 bg-orange-500/10 px-3 py-1 text-sm font-bold text-orange-500">
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(`${restaurant.id}-${food.name}`)
                        }
                        className="px-1 hover:text-orange-400"
                      >
                        −
                      </button>
                      <span className="text-white">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => addItem(food, restaurant)}
                        className="px-1 hover:text-orange-400"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {totalCount > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-20 left-1/2 z-30 w-[min(92%,32rem)] -translate-x-1/2 rounded-xl bg-orange-500 px-4 py-3 text-center font-bold text-white shadow-xl shadow-orange-500/30 transition hover:bg-orange-600 active:bg-orange-700"
        >
          View cart ({totalCount} item{totalCount > 1 ? "s" : ""})
        </Link>
      )}
    </div>
  )
}

export default Menu
