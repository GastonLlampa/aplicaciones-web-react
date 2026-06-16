import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductos } from '../api/productos'
import ProductoCard from '../components/ProductoCard'
import { formatearPrecio } from '../utils/formato'

function Home() {
  const { data: destacados, isLoading } = useQuery({
    queryKey: ['productos-destacados'],
    queryFn: () => getProductos({ per_page: 4 }),
    staleTime: 1000 * 60 * 5,
  })

  const { data: ofertas } = useQuery({
    queryKey: ['productos-ofertas'],
    queryFn: () => getProductos({ precio_max: 50000, per_page: 4 }),
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="max-w-lg mx-auto pb-10">

      {/* Hero */}
      <div className="bg-black text-white px-6 py-14 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
          Nueva colección
        </p>
        <h1 className="text-4xl font-black mb-4 leading-tight">
          Las mejores<br />zapatillas
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Encontrá tu estilo entre las mejores marcas del mundo
        </p>
        <Link
          to="/productos"
          className="bg-white text-black px-8 py-3 rounded-2xl font-bold text-sm inline-block active:scale-95 transition-all"
        >
          Ver catálogo
        </Link>
      </div>

      {/* Categorías rápidas */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Explorá por estilo</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Running', emoji: '🏃' },
            { label: 'Urbanas', emoji: '🏙️' },
            { label: 'Fútbol', emoji: '⚽' },
          ].map((cat) => (
            <Link
              key={cat.label}
              to={`/productos?categoria=${cat.label}`}
              className="bg-gray-100 rounded-2xl py-4 flex flex-col items-center gap-1 active:scale-95 transition-all"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs font-medium text-gray-700">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Productos destacados */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Destacados</h2>
          <Link to="/productos" className="text-sm text-gray-400 underline">
            Ver todos
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {destacados?.data?.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>

      {/* Banner promocional */}
      <div className="mx-4 bg-red-500 text-white rounded-2xl px-6 py-8 text-center mb-6">
        <p className="text-xs uppercase tracking-widest mb-2 opacity-80">Ofertas especiales</p>
        <p className="text-2xl font-black mb-1">Hasta 50% OFF</p>
        <p className="text-sm opacity-80 mb-4">En zapatillas seleccionadas</p>
        <Link
          to="/productos"
          className="bg-white text-red-500 px-6 py-2 rounded-xl font-bold text-sm inline-block"
        >
          Ver ofertas
        </Link>
      </div>

      {/* Productos en oferta */}
      {ofertas?.data?.length > 0 && (
        <div className="px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">En oferta</h2>
            <Link to="/productos" className="text-sm text-gray-400 underline">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ofertas.data.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Home