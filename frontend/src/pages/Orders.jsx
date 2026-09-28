import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function Orders() {
  const { orders, user } = useCart()

  if (!user) {
    return (
      <div className="px-4 pb-24 pt-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-3xl shadow-md shadow-zinc-900/50">
          🔐
        </div>
        <h1 className="mt-6 text-2xl font-bold text-white">Login required</h1>
        <p className="mt-2 text-sm text-zinc-400">Sign in to view your orders and saved history.</p>
        <Link
          to="/profile"
          className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600"
        >
          Go to login
        </Link>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="px-4 pb-24 pt-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-3xl shadow-md shadow-zinc-900/50">
          📋
        </div>
        <h1 className="mt-6 text-2xl font-bold text-white">No orders yet</h1>
        <p className="mt-2 text-sm text-zinc-400">Your placed orders will appear here.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600"
        >
          Order now
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 pb-24 pt-6">
      <h1 className="text-2xl font-bold text-white">Orders</h1>
      <p className="mt-1 text-sm text-zinc-400">Your recent food orders</p>

      <div className="mt-5 flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-md">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">Order placed</p>
                <p className="mt-1 text-sm text-zinc-400">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                Delivered
              </span>
            </div>

            <div className="mt-4 border-t border-zinc-800 pt-3">
              <p className="text-base font-semibold text-white">
                {order.restaurantNames.length > 0 ? order.restaurantNames.join(', ') : 'Food order'}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.id}`} className="flex justify-between gap-3">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
              <span className="text-sm text-zinc-400">{order.totalCount} items</span>
              <span className="text-lg font-bold text-orange-400">₹{order.totalPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
