// STUDY FILE — current Menu using backend
// Same idea as pages/Menu.jsx (shortened for reading)

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useCart } from "../context/CartContext"

function MenuNew() {
  const { id } = useParams()
  // id is now a number from MySQL, like "1"
  const { addItem, removeItem, getQuantity, totalCount } = useCart()
  const [query, setQuery] = useState("")
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8080/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p>Loading menu...</p>
  }

  if (!restaurant || !restaurant.id) {
    return <p>Restaurant not found.</p>
  }

  const visibleFoods = (restaurant.foods ?? []).filter((food) =>
    food.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <h1>{restaurant.name}</h1>
      {visibleFoods.map((food) => (
        <div key={food.id}>
          <p>{food.name}</p>
          <p>₹{food.price}</p>
          <button onClick={() => addItem(food, restaurant)}>ADD</button>
        </div>
      ))}
      {totalCount > 0 && <Link to="/cart">View cart</Link>}
    </div>
  )
}

export default MenuNew
