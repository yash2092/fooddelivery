import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext(null)

const STORAGE_KEY = "food-delivery-orders"
const USER_KEY = "user"

function getCurrentUser() {
  try {
    const saved = localStorage.getItem(USER_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function getOrdersKey(user) {
  if (!user) return null
  return `${STORAGE_KEY}-${user.id ?? user.mobile ?? "guest"}`
}

function readOrdersForUser(user) {
  const key = getOrdersKey(user)
  if (!key) return []

  try {
    const savedOrders = localStorage.getItem(key)
    return savedOrders ? JSON.parse(savedOrders) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [user, setUser] = useState(getCurrentUser())
  const [orders, setOrders] = useState(() => readOrdersForUser(getCurrentUser()))

  useEffect(() => {
    const syncUser = () => {
      const nextUser = getCurrentUser()
      setUser(nextUser)
      setOrders(readOrdersForUser(nextUser))
    }

    window.addEventListener("auth-changed", syncUser)
    window.addEventListener("storage", syncUser)
    return () => {
      window.removeEventListener("auth-changed", syncUser)
      window.removeEventListener("storage", syncUser)
    }
  }, [])

  useEffect(() => {
    const key = getOrdersKey(user)
    if (key) {
      localStorage.setItem(key, JSON.stringify(orders))
    }
  }, [user, orders])

  const addItem = (food, restaurant) => {
    const id = `${restaurant.id}-${food.name}`

    setItems((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [
        ...prev,
        {
          id,
          name: food.name,
          price: food.price,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          quantity: 1,
        },
      ]
    })
  }

  const removeItem = (id) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const placeOrder = () => {
    if (items.length === 0 || !user) return null

    const newOrder = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      items: [...items],
      totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      restaurantNames: [...new Set(items.map((item) => item.restaurantName))],
    }

    setOrders((prev) => [newOrder, ...prev])
    setItems([])
    return newOrder
  }

  const getQuantity = (foodName, restaurantId) => {
    const id = `${restaurantId}-${foodName}`
    return items.find((item) => item.id === id)?.quantity ?? 0
  }

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ items, orders, user, addItem, removeItem, placeOrder, getQuantity, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return cart
}
