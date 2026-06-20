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
  <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-40 md:pb-12">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">Tu carrito</h1>
      <Link
        to="/productos"
        className="inline-flex items-center justify-center bg-black text-white px-5 py-3 rounded-2xl text-sm font-bold active:scale-95 transition-all shadow-sm"
      >
        Continuar comprando
      </Link>
    </div>

    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
      
      {/* LADO IZQUIERDO: Lista de productos */}
      <div className="w-full md:flex-1 space-y-4">
        {items.map((item) => (
          <div
            key={`${item.producto_id}-${item.talle}`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center"
          >
            <img
              src={item.imagen}
              alt={item.modelo}
              className="w-20 h-20 object-cover rounded-xl bg-gray-50 shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.marca}</p>
                  <p className="font-bold text-gray-900 truncate">{item.modelo}</p>
                  <p className="text-xs text-gray-500">Talle: {item.talle}</p>
                </div>
                <button
                  onClick={() => eliminarItem(item.producto_id, item.talle)}
                  className="text-gray-300 hover:text-red-500 text-xl px-1"
                >
                  ×
                </button>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => actualizarCantidad(item.producto_id, item.talle, item.cantidad - 1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 text-sm font-bold flex items-center justify-center active:bg-gray-200"
                  >
                    −
                  </button>
                  <span className="text-sm font-bold w-6 text-center">{item.cantidad}</span>
                  <button
                    onClick={() => actualizarCantidad(item.producto_id, item.talle, item.cantidad + 1)}
                    className="w-8 h-8 rounded-lg bg-gray-100 text-sm font-bold flex items-center justify-center active:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-black text-gray-900">
                  {formatearPrecio(item.precio_final * item.cantidad)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LADO DERECHO: Resumen de compra */}
      <div className="w-full md:w-80 lg:w-96 shrink-0">
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 md:sticky md:top-24">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Total</span>
            <span className="text-2xl font-black text-gray-900">
              {formatearPrecio(totalPrecio())}
            </span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-black text-white py-4 rounded-2xl text-base font-bold active:scale-95 transition-all shadow-lg"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  </div>
)
}

export default Carrito