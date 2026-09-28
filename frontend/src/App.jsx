import { Route, Routes } from 'react-router-dom'
import BottomNav from './components/bottomnav.jsx'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Orders from './pages/Orders.jsx'
import DishRestaurants from './pages/DishRestaurants'
import Profile from './pages/profile.jsx'
import Search from './pages/Search.jsx'
import Addresses from './pages/Addresses.jsx'

function App() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-zinc-950 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Menu />} />
        <Route path="/dish/:name" element={<DishRestaurants />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/search" element={<Search />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default App
