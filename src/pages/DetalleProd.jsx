import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducto } from '../api/productos'
import useCarritoStore from '../store/carritoStore'
import { formatearPrecio } from '../utils/formato'

function DetalleProd() {
  const { id } = useParams()
  const navigate = useNavigate()
  const agregarItem = useCarritoStore((state) => state.agregarItem)

  const [imagenActiva, setImagenActiva] = useState(0)
  const [talleSeleccionado, setTalleSeleccionado] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['producto', id],
    queryFn: () => getProducto(id),
  })

  if (isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 aspect-square bg-gray-200 rounded-3xl animate-pulse" />
        <div className="md:w-1/2 space-y-4">
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-2/3" />
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-1/3" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-gray-500">
        Error al cargar el producto.
      </div>
    )
  }

  const producto = data.data
  const todasLasImagenes = [producto.imagen_principal, ...producto.imagenes]

  const stockTalleSeleccionado = talleSeleccionado
    ? producto.talles.find((t) => t.talle === talleSeleccionado)?.stock ?? 0
    : null

  const handleAgregarCarrito = () => {
    if (!talleSeleccionado) return
    agregarItem(producto, talleSeleccionado, cantidad)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-black mb-6 transition-colors"
      >
        ← Volver al catálogo
      </button>

      {/* Contenedor principal: Imagen a la izquierda, Info a la derecha en PC */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Lado izquierdo: Galería de imágenes */}
        <div className="md:w-1/2">
          <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
            <img
              src={todasLasImagenes[imagenActiva]}
              alt={`${producto.marca} ${producto.modelo}`}
              className="w-full h-full object-cover"
            />
          </div>

          {todasLasImagenes.length > 1 && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {todasLasImagenes.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImagenActiva(i)}
                  className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    imagenActiva === i ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lado derecho: Info del producto */}
        <div className="md:w-1/2 md:pt-4">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">{producto.marca}</p>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 mb-2 tracking-tight">{producto.modelo}</h1>
          <p className="text-sm text-gray-500">{producto.categoria.nombre}</p>

          <div className="mt-6">
            {producto.descuento > 0 ? (
              <div className="flex items-center gap-4">
                <p className="text-4xl font-black text-red-600">
                  {formatearPrecio(producto.precio_final)}
                </p>
                <p className="text-lg text-gray-400 line-through">
                  {formatearPrecio(producto.precio)}
                </p>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  -{producto.descuento}%
                </span>
              </div>
            ) : (
              <p className="text-4xl font-black text-gray-900">
                {formatearPrecio(producto.precio_final)}
              </p>
            )}
          </div>

          <p className="text-gray-600 mt-8 leading-relaxed text-lg">
            {producto.descripcion}
          </p>

          {/* Selector de talle */}
          <div className="mt-10">
            <p className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Seleccioná un talle</p>
            <div className="flex flex-wrap gap-3">
              {producto.talles.map((t) => {
                const sinStock = t.stock === 0
                const seleccionado = talleSeleccionado === t.talle
                return (
                  <button
                    key={t.talle}
                    onClick={() => {
                      if (sinStock) return
                      setTalleSeleccionado(t.talle)
                      setCantidad(1)
                    }}
                    disabled={sinStock}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl text-base font-bold border-2 transition-all ${
                      sinStock
                        ? 'border-gray-100 text-gray-300 line-through cursor-not-allowed'
                        : seleccionado
                        ? 'border-black bg-black text-white shadow-lg'
                        : 'border-gray-200 text-gray-700 hover:border-black'
                    }`}
                  >
                    {t.talle}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selector de cantidad y Botón (Layout PC más grande) */}
          <div className="mt-10 flex flex-col gap-6">
            {talleSeleccionado && (
              <div className="flex items-center gap-6">
                <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">Cantidad</p>
                <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-full px-2 py-1">
                  <button
                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                    aria-label="Disminuir cantidad"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 text-lg font-bold flex items-center justify-center hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold w-8 text-center">{cantidad}</span>
                  <button
                    onClick={() => setCantidad((c) => Math.min(stockTalleSeleccionado, c + 1))}
                    aria-label="Aumentar cantidad"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 text-lg font-bold flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAgregarCarrito}
              disabled={!talleSeleccionado}
              className={`w-full md:max-w-sm py-5 rounded-2xl text-lg font-black uppercase tracking-wider transition-all shadow-lg ${
                agregado
                  ? 'bg-green-600 text-white'
                  : talleSeleccionado
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {agregado ? '✓ Agregado' : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleProd