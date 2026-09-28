import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Cart() {
  const navigate = useNavigate()
  const { items, addItem, removeItem, placeOrder, user, totalCount, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-xl font-bold text-white">Your cart is empty</p>
        <p className="mt-2 text-sm text-zinc-400">Add items from a restaurant menu.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 shadow-md shadow-orange-500/20"
        >
          Browse restaurants
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 pb-24 pt-6">
      <h1 className="text-2xl font-bold text-white">Cart</h1>
      <p className="mt-1 text-sm text-zinc-400">{totalCount} items</p>

      <div className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 shadow-md"
          >
            <div>
              <p className="font-semibold text-white">{item.name}</p>
              <p className="mt-0.5 text-xs text-zinc-400">{item.restaurantName}</p>
              <p className="mt-1 text-sm font-medium text-zinc-200">
                ₹{item.price * item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-orange-500 bg-orange-500/10 px-3 py-1.5 text-sm font-bold text-orange-500">
              <button type="button" onClick={() => removeItem(item.id)} className="px-1 hover:text-orange-400">
                −
              </button>
              <span className="text-white">{item.quantity}</span>
              <button
                type="button"
                onClick={() =>
                  addItem(
                    { name: item.name, price: item.price },
                    { id: item.restaurantId, name: item.restaurantName }
                  )
                }
                className="px-1 hover:text-orange-400"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-4 shadow-md">
        <div className="flex justify-between text-zinc-400">
          <span>Item total</span>
          <span className="text-white font-medium">₹{totalPrice}</span>
        </div>
        <div className="mt-3 flex justify-between text-lg font-bold text-white border-t border-zinc-800 pt-3">
          <span>To pay</span>
          <span className="text-orange-500">₹{totalPrice}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!user) {
              navigate('/profile')
              return
            }

            const order = placeOrder()
            if (order) {
              alert('Order Placed Successfully! 🎉')
              navigate('/orders')
            }
          }}
          className="mt-5 w-full rounded-xl bg-orange-500 py-3.5 text-center font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 active:bg-orange-700"
        >
          Place Order (₹{totalPrice})
        </button>
      </div>
    </div>
  )
}

export default Cart
