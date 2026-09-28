// STUDY FILE — earlier Menu using restaurants.js
// Not used by the running app. Compare with new-menu.jsx

import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { restaurants } from "../data/restaurants"
import { useCart } from "../context/CartContext"

function MenuOld() {
  const { id } = useParams()
  // id was a string like "pizza-palace"
  const restaurant = restaurants.find((item) => item.id === id)
  const { addItem, removeItem, getQuantity, totalCount } = useCart()
  const [query, setQuery] = useState("")

  if (!restaurant) {
    return <p>Restaurant not found.</p>
  }

  const visibleFoods = restaurant.foods.filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h1>{restaurant.name}</h1>
      {visibleFoods.map((food) => (
        <div key={food.name}>
          <p>{food.name}</p>
          <p>₹{food.price}</p>
          <button onClick={() => addItem(food, restaurant)}>ADD</button>
        </div>
      ))}
      {totalCount > 0 && <Link to="/cart">View cart</Link>}
    </div>
  )
}

export default MenuOld
