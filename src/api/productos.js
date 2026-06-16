import api from './config'

export const getProductos = async (filtros = {}) => {
  const { data } = await api.get('/productos', { params: filtros })
  return data
}

export const getProducto = async (id) => {
  const { data } = await api.get(`/productos/${id}`)
  return data
}

export const getCategorias = async () => {
  const { data } = await api.get('/categorias')
  return data
}

export const getMarcas = async () => {
  const { data } = await api.get('/marcas')
  return data
}