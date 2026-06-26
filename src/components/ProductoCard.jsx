import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato'

function ProductoCard({ producto }) {
  return (
    <Link to={`/productos/${producto.id}`} className="block">
<div className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden active:scale-95 transition-all hover:-translate-y-1 duration-300">
        
        {/* Imagen */}
        <div className="relative aspect-square bg-gray-100">
          <img
            src={producto.imagen_principal}
            alt={`${producto.marca} ${producto.modelo}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {producto.descuento > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{producto.descuento}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide">{producto.marca}</p>
          <p className="font-semibold text-gray-900 truncate">{producto.modelo}</p>

          {/* Precio */}
          <div className="mt-1">
            {producto.descuento > 0 ? (
              <>
                <p className="text-xs text-gray-400 line-through">
                  {formatearPrecio(producto.precio)}
                </p>
                <p className="text-base font-bold text-red-500">
                  {formatearPrecio(producto.precio_final)}
                </p>
              </>
            ) : (
              <p className="text-base font-bold text-gray-900">
                {formatearPrecio(producto.precio_final)}
              </p>
            )}
          </div>

          {/* Talles disponibles */}
          {producto.talles_disponibles?.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {producto.talles_disponibles.slice(0, 4).map((talle) => (
                <span
                  key={talle}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                >
                  {talle}
                </span>
              ))}
              {producto.talles_disponibles.length > 4 && (
                <span className="text-xs text-gray-400">
                  +{producto.talles_disponibles.length - 4}
                </span>
              )}
            </div>
          ) : (
            <p className="mt-2 text-xs text-red-400 font-medium">Sin stock</p>
          )}
        </div>

      </div>
    </Link>
  )
}

export default ProductoCard