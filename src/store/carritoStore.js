import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCarritoStore = create(
  persist(
    (set, get) => ({
      items: [],

      agregarItem: (producto, talle, cantidad) => {
        const items = get().items
        const existente = items.find(
          (i) => i.producto_id === producto.id && i.talle === talle
        )

        if (existente) {
          set({
            items: items.map((i) =>
              i.producto_id === producto.id && i.talle === talle
                ? { ...i, cantidad: i.cantidad + cantidad }
                : i
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                producto_id: producto.id,
                marca: producto.marca,
                modelo: producto.modelo,
                imagen: producto.imagen_principal,
                precio_final: producto.precio_final,
                talle,
                cantidad,
              },
            ],
          })
        }
      },

      eliminarItem: (producto_id, talle) => {
        set({
          items: get().items.filter(
            (i) => !(i.producto_id === producto_id && i.talle === talle)
          ),
        })
      },

      actualizarCantidad: (producto_id, talle, cantidad) => {
        if (cantidad < 1) return
        set({
          items: get().items.map((i) =>
            i.producto_id === producto_id && i.talle === talle
              ? { ...i, cantidad }
              : i
          ),
        })
      },

      vaciarCarrito: () => set({ items: [] }),

      totalItems: () => get().items.reduce((acc, i) => acc + i.cantidad, 0),

      totalPrecio: () =>
        get().items.reduce((acc, i) => acc + i.precio_final * i.cantidad, 0),
    }),
    {
      name: 'carrito', // clave en localStorage
    }
  )
)

export default useCarritoStore