import { Link, useNavigate } from 'react-router-dom'
import useCarritoStore from '../store/carritoStore'
import { formatearPrecio } from '../utils/formato'

function Carrito() {
  const { items, eliminarItem, actualizarCantidad, totalPrecio } = useCarritoStore()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <p className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</p>
        <p className="text-sm text-gray-400 mb-8">Agregá productos para continuar</p>
        <Link
          to="/productos"
          className="bg-black text-white px-6 py-3 rounded-2xl font-medium"
        >
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-40">

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tu carrito</h1>

      {/* Lista de items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.producto_id}-${item.talle}`}
            className="bg-white rounded-2xl shadow-sm p-4 flex gap-4"
          >
            {/* Imagen */}
            <img
              src={item.imagen}
              alt={`${item.marca} ${item.modelo}`}
              className="w-20 h-20 object-cover rounded-xl bg-gray-100 shrink-0"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 uppercase">{item.marca}</p>
              <p className="font-semibold text-gray-900 truncate">{item.modelo}</p>
              <p className="text-xs text-gray-500 mt-0.5">Talle: {item.talle}</p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {formatearPrecio(item.precio_final)}
              </p>

              {/* Cantidad */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => actualizarCantidad(item.producto_id, item.talle, item.cantidad - 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 text-sm font-bold flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-sm font-semibold">{item.cantidad}</span>
                <button
                  onClick={() => actualizarCantidad(item.producto_id, item.talle, item.cantidad + 1)}
                  className="w-7 h-7 rounded-full border border-gray-300 text-sm font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal y eliminar */}
            <div className="flex flex-col items-end justify-between shrink-0">
              <button
                onClick={() => eliminarItem(item.producto_id, item.talle)}
                className="text-gray-300 text-xl leading-none"
              >
                ×
              </button>
              <p className="text-sm font-bold text-gray-900">
                {formatearPrecio(item.precio_final * item.cantidad)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen fijo abajo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600 font-medium">Total</span>
          <span className="text-xl font-bold text-gray-900">
            {formatearPrecio(totalPrecio())}
          </span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-black text-white py-4 rounded-2xl text-base font-bold active:scale-95 transition-all"
        >
          Continuar con la compra
        </button>
      </div>

    </div>
  )
}

export default Carrito