import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProductos, getCategorias, getMarcas } from '../api/productos'
import ProductoCard from '../components/ProductoCard'

function Catalogo() {
  const [filtros, setFiltros] = useState({
    busqueda: '',
    categoria_id: '',
    marca: '',
    page: 1,
  })

  const [inputBusqueda, setInputBusqueda] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['productos', filtros],
    queryFn: () => getProductos(filtros),
  })

  const { data: categoriasData } = useQuery({
    queryKey: ['categorias'],
    queryFn: getCategorias,
    staleTime: Infinity,
  })

  const { data: marcasData } = useQuery({
    queryKey: ['marcas'],
    queryFn: getMarcas,
    staleTime: Infinity,
  })

  const handleBusqueda = (e) => {
    e.preventDefault()
    setFiltros((f) => ({ ...f, busqueda: inputBusqueda, page: 1 }))
  }

  const handleFiltro = (campo, valor) => {
    setFiltros((f) => ({ ...f, [campo]: valor, page: 1 }))
  }

  const handlePagina = (pagina) => {
    setFiltros((f) => ({ ...f, page: pagina }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">

      {/* Búsqueda */}
      <form onSubmit={handleBusqueda} className="flex gap-2 mb-4">
        <input type="text" placeholder="Buscar zapatillas..." value={inputBusqueda} onChange={(e) => setInputBusqueda(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"/>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium">
          Buscar
        </button>
      </form>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {/* Categorías */}
        <select value={filtros.categoria_id} onChange={(e) => handleFiltro('categoria_id', e.target.value)}
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none shrink-0">
          <option value="">Todas las categorías</option>
          {categoriasData?.data?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>

        {/* Marcas */}
        <select value={filtros.marca} onChange={(e) => handleFiltro('marca', e.target.value)}
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none shrink-0">
          <option value="">Todas las marcas</option>
          {marcasData?.data?.map((marca) => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>

        {/* Limpiar filtros */}
        {(filtros.categoria_id || filtros.marca || filtros.busqueda) && (
          <button 
            onClick={() => {
              setFiltros({ busqueda: '', categoria_id: '', marca: '', page: 1 })
              setInputBusqueda('')
            }}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white shrink-0 text-red-500">
            Limpiar
          </button>
        )}
      </div>

      {/* Estados */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-10 text-red-500">
          Error al cargar los productos. Verificá tu conexión.
        </div>
      )}

      {/* Grilla de productos */}
      {!isLoading && !isError && (
        <>
          <p className="text-sm text-gray-400 mb-3"> {data?.meta?.total} productos encontrados </p>

          {data?.data?.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No se encontraron productos.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {data?.data?.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} />
              ))}
            </div>
          )}

          {/* Paginación */}
          {data?.meta?.last_page > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(data.meta.last_page)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePagina(i + 1)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    filtros.page === i + 1
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default Catalogo