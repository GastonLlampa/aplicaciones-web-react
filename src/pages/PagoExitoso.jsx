import { useLocation, Link } from 'react-router-dom'

function PagoExitoso() {
  const { state } = useLocation()

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <p className="text-7xl mb-6">🎉</p>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido confirmado!</h1>
      {state?.pedido_id && (
        <p className="text-sm text-gray-400 mb-2">
          Número de pedido: <span className="font-semibold text-gray-700">#{state.pedido_id}</span>
        </p>
      )}
      <p className="text-sm text-gray-500 mb-10">
        Te enviamos un email con los detalles de tu compra. ¡Gracias por elegirnos!
      </p>
      <Link
        to="/productos"
        className="bg-black text-white px-8 py-3 rounded-2xl font-medium"
      >
        Seguir comprando
      </Link>
    </div>
  )
}

export default PagoExitoso