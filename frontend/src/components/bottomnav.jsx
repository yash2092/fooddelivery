import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalCount } = useCart()

  const itemClass = (path) =>
    `flex h-16 w-16 flex-col items-center justify-center text-xs transition-colors ${
      location.pathname === path ? "text-orange-500 font-semibold" : "text-zinc-400 hover:text-white"
    }`

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800/80 bg-zinc-900/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-around">
        <button type="button" className={itemClass("/")} onClick={() => navigate("/")}>
          <span className="text-xl">🏠</span>
          <span className="mt-1">Home</span>
        </button>

        <button type="button" className={itemClass("/search")} onClick={() => navigate("/search")}>
          <span className="text-xl">🔍</span>
          <span className="mt-1">Search</span>
        </button>

        <button type="button" className={itemClass("/cart")} onClick={() => navigate("/cart")}>
          <span className="relative text-xl">
            🛒
            {totalCount > 0 && (
              <span className="absolute -right-2 -top-1 rounded-full bg-orange-500 px-1.5 text-[10px] font-bold leading-4 text-white shadow-sm">
                {totalCount}
              </span>
            )}
          </span>
          <span className="mt-1">Cart</span>
        </button>

        <button type="button" className={itemClass("/orders")} onClick={() => navigate("/orders")}>
          <span className="text-xl">📋</span>
          <span className="mt-1">Orders</span>
        </button>

        <button
          type="button"
          className={itemClass("/profile")}
          onClick={() => navigate("/profile")}
        >
          <span className="text-xl">👤</span>
          <span className="mt-1">Profile</span>
        </button>
      </div>
    </nav>
  )
}

export default BottomNav
