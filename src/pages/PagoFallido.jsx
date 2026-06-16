import { Link, useNavigate } from 'react-router-dom'

function PagoFallido() {
  const navigate = useNavigate()

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <p className="text-7xl mb-6">😔</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">El pago no se completó</h1>
      <p className="text-sm text-gray-500 mb-10">
        Hubo un problema al procesar tu pago. Tu carrito sigue guardado, podés intentarlo de nuevo.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate('/checkout')}
          className="bg-black text-white px-8 py-3 rounded-2xl font-medium"
        >
          Reintentar pago
        </button>
        <Link
          to="/productos"
          className="text-gray-500 text-sm underline"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  )
}

export default PagoFallido