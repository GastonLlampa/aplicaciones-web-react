import { Link, useLocation } from 'react-router-dom'
import useCarritoStore from '../store/carritoStore'

function Navbar() {
  const totalItems = useCarritoStore((state) => state.totalItems)
  const location = useLocation()

  const enCarrito = location.pathname === '/carrito'

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight" >
          👟 Boyz in the Sneaker
        </Link>

        {/* Ícono carrito */}
        <Link to="/carrito" className="relative" aria-label="Ver carrito de compras">
          <span className="text-2xl" aria-hidden="true">🛒</span>
          {totalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems()}
            </span>
          )}
        </Link>

      </div>
    </nav>
  )
}

export default Navbar