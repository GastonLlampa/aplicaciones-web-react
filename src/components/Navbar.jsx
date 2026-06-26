import { Link } from 'react-router-dom'
import useCarritoStore from '../store/carritoStore'

function Navbar() {
  const totalItems = useCarritoStore((state) =>
    state.items.reduce((acc, item) => acc + item.cantidad, 0)
  )

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      {/* Cambiamos max-w-lg por max-w-screen-xl para expandirlo en PC */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight hover:text-gray-300 transition-colors">
          Boyz in the Sneaker
        </Link>

        {/* Ícono carrito */}
        <Link to="/carrito" className="relative hover:scale-110 transition-transform">
          <span className="text-2xl md:text-3xl">🛒</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] md:text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center shadow-sm">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  )
}

export default Navbar