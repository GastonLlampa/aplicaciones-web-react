import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCarritoStore from '../store/carritoStore'
import { formatearPrecio } from '../utils/formato'
import api from '../api/config'

function Checkout() {
  const { items, totalPrecio, vaciarCarrito } = useCarritoStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  })

  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(false)
  const [errorApi, setErrorApi] = useState(null)

  useEffect(() => {
    if (items.length === 0) {
      navigate('/carrito')
    }
  }, [items, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrores({ ...errores, [e.target.name]: '' })
  }

  const validar = () => {
    const nuevosErrores = {}
    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio'
    if (!form.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio'
    if (!form.email.trim()) nuevosErrores.email = 'El email es obligatorio'
    else if (!/\S+@\S+\.\S+/.test(form.email)) nuevosErrores.email = 'Email inválido'
    if (!form.telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio'
    if (!form.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria'
    return nuevosErrores
  }

  const handleSubmit = async () => {
    const nuevosErrores = validar()
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    setCargando(true)
    setErrorApi(null)

    try {
      const payload = {
        ...form,
        items: items.map((i) => ({
          producto_id: i.producto_id,
          talle: i.talle,
          cantidad: i.cantidad,
        })),
      }

      const { data } = await api.post('/pedidos', payload)

      vaciarCarrito()
      window.location.href = data.mp_init_point
    } catch (error) {
      console.log('Error detalle:', error.response?.data)
      setErrorApi('Hubo un error al procesar el pedido. Intentá de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-40 md:pb-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        <div className="w-full lg:flex-1">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">
            Datos de envío
          </h1>

          <div className="space-y-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 md:p-8">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  errores.nombre ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errores.nombre && <p className="text-xs text-red-500 mt-1">{errores.nombre}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Apellido
              </label>
              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="García"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  errores.apellido ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errores.apellido && <p className="text-xs text-red-500 mt-1">{errores.apellido}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="juan@email.com"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  errores.email ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errores.email && <p className="text-xs text-red-500 mt-1">{errores.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="2804123456"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  errores.telefono ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errores.telefono && <p className="text-xs text-red-500 mt-1">{errores.telefono}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Dirección de envío
              </label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Av. Fontana 123, Trelew"
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  errores.direccion ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errores.direccion && <p className="text-xs text-red-500 mt-1">{errores.direccion}</p>}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[22rem] xl:w-[26rem] shrink-0">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-gray-50 rounded-3xl p-5 md:p-6 border border-gray-200">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                Resumen del pedido
              </h2>
              <div className="space-y-2 max-h-80 overflow-auto pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.producto_id}-${item.talle}`}
                    className="flex justify-between gap-3 text-sm text-gray-600"
                  >
                    <span className="truncate min-w-0">
                      {item.marca} {item.modelo} T.{item.talle} x{item.cantidad}
                    </span>
                    <span className="shrink-0 font-medium">
                      {formatearPrecio(item.precio_final * item.cantidad)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span>{formatearPrecio(totalPrecio())}</span>
              </div>
            </div>

            {errorApi && <p className="text-sm text-red-500 text-center">{errorApi}</p>}

            <div className="bg-white border border-gray-200 rounded-3xl p-4 shadow-sm">
              <button
                onClick={handleSubmit}
                disabled={cargando}
                className={`w-full py-4 rounded-2xl text-base font-bold transition-all ${
                  cargando
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white active:scale-95'
                }`}
              >
                {cargando ? 'Procesando...' : 'Confirmar pedido'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout