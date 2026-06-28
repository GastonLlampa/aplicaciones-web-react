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
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
        <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
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
    <div className="max-w-lg mx-auto pb-32">

      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-gray-500 px-4 pt-4 pb-2"
      >
        ← Volver
      </button>

      {/* Imagen principal */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={todasLasImagenes[imagenActiva]}
          alt={`${producto.marca} ${producto.modelo}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Galería miniaturas */}
      {todasLasImagenes.length > 1 && (
        <div className="flex gap-2 px-4 mt-3 overflow-x-auto">
          {todasLasImagenes.map((img, i) => (
            <button
              key={i}
              onClick={() => setImagenActiva(i)}
              className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 ${
                imagenActiva === i ? 'border-black' : 'border-transparent'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Info del producto */}
      <div className="px-4 mt-4">
        <p className="text-sm text-gray-400 uppercase tracking-wide">{producto.marca}</p>
        <h1 className="text-2xl font-bold text-gray-900">{producto.modelo}</h1>
        <p className="text-sm text-gray-500 mt-1">{producto.categoria.nombre}</p>

        {/* Precio */}
        <div className="mt-3">
          {producto.descuento > 0 ? (
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-red-500">
                {formatearPrecio(producto.precio_final)}
              </p>
              <p className="text-sm text-gray-400 line-through">
                {formatearPrecio(producto.precio)}
              </p>
              <span className="bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded-full">
                -{producto.descuento}%
              </span>
            </div>
          ) : (
            <p className="text-2xl font-bold text-gray-900">
              {formatearPrecio(producto.precio_final)}
            </p>
          )}
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
          {producto.descripcion}
        </p>

        {/* Selector de talle */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Seleccioná un talle:
          </p>
          <div className="flex flex-wrap gap-2">
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
                  className={`w-12 h-12 rounded-xl text-sm font-medium border-2 transition-all ${
                    sinStock
                      ? 'border-gray-200 text-gray-300 line-through cursor-not-allowed'
                      : seleccionado
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 text-gray-700 active:scale-95'
                  }`}
                >
                  {t.talle}
                </button>
              )
            })}
          </div>
          {talleSeleccionado && (
            <p className="text-xs text-gray-400 mt-2">
              Stock disponible: {stockTalleSeleccionado} unidades
            </p>
          )}
        </div>

        {/* Selector de cantidad */}
        {talleSeleccionado && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Cantidad:</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                aria-label="Disminuir cantidad"
                className="w-10 h-10 rounded-full border-2 border-gray-300 text-lg font-bold flex items-center justify-center active:scale-95"
              >
                −
              </button>
              <span className="text-lg font-semibold w-6 text-center">{cantidad}</span>
              <button
                onClick={() =>
                  setCantidad((c) => Math.min(stockTalleSeleccionado, c + 1))
                }
                aria-label="Aumentar cantidad"
                className="w-10 h-10 rounded-full border-2 border-gray-300 text-lg font-bold flex items-center justify-center active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Botón agregar al carrito — fijo abajo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 max-w-lg mx-auto">
        <button
          onClick={handleAgregarCarrito}
          disabled={!talleSeleccionado}
          className={`w-full py-4 rounded-2xl text-base font-bold transition-all ${
            agregado
              ? 'bg-green-500 text-white'
              : talleSeleccionado
              ? 'bg-black text-white active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {agregado ? '✓ Agregado al carrito' : 'Agregar al carrito'}
        </button>
      </div>

    </div>
  )
}

export default DetalleProd