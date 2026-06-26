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
    // 1. Cambiamos max-w-lg por max-w-screen-xl para liberar el ancho en PC
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Cabecera, Búsqueda y Filtros */}
      {/* 2. En PC (md) se ponen en fila, en celular (flex-col) en columna */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        
        {/* Búsqueda */}
        <form onSubmit={handleBusqueda} className="flex gap-2 w-full md:max-w-md">
          <input 
            type="text" 
            placeholder="Buscar zapatillas..." 
            value={inputBusqueda} 
            onChange={(e) => setInputBusqueda(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button type="submit" className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
            Buscar
          </button>
        </form>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
          {/* Categorías */}
          <select value={filtros.categoria_id} onChange={(e) => handleFiltro('categoria_id', e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none shrink-0 cursor-pointer hover:border-gray-400">
            <option value="">Todas las categorías</option>
            {categoriasData?.data?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>

          {/* Marcas */}
          <select value={filtros.marca} onChange={(e) => handleFiltro('marca', e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none shrink-0 cursor-pointer hover:border-gray-400">
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
              className="border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white shrink-0 text-red-500 font-medium hover:bg-red-50 transition-colors">
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Estados de Carga (Skeletons) */}
      {isLoading && (
        // 3. Grilla dinámica: 2 cols en celular, 3 en tablet, 4 o 5 en monitor grande
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {/* Aumentamos a 10 items para que no se vea vacío en pantallas grandes */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-20 bg-red-50 rounded-2xl">
          <p className="text-red-500 font-medium">Error al cargar los productos. Verificá tu conexión.</p>
        </div>
      )}

      {/* Grilla de productos real */}
      {!isLoading && !isError && (
        <>
          <p className="text-sm text-gray-500 mb-4 font-medium"> 
            {data?.meta?.total} productos encontrados 
          </p>

          {data?.data?.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-500 font-medium">No se encontraron productos con esos filtros.</p>
              <button 
                onClick={() => {
                  setFiltros({ busqueda: '', categoria_id: '', marca: '', page: 1 })
                  setInputBusqueda('')
                }}
                className="mt-4 text-sm text-black underline"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            // Aplicamos la misma grilla dinámica aquí
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {data?.data?.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} />
              ))}
            </div>
          )}

          {/* Paginación */}
          {data?.meta?.last_page > 1 && (
            <div className="flex justify-center flex-wrap gap-2 mt-10">
              {[...Array(data.meta.last_page)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePagina(i + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${
                    filtros.page === i + 1
                      ? 'bg-black text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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