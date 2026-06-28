# Boyz in the Sneaker 👟 — Frontend React

**Materia:** Aplicaciones Web  
**Integrantes:**
- Fernando Benitez
- Gaston Llampa

**Link del proyecto:** https://aplicaciones-web-react.vercel.app/  
**Repositorio Laravel (API):** https://github.com/Fernandob31/aplicaciones-web-laravel

---

## 📝 Introducción

Esta es la segunda parte del Proyecto de Cursado. Es una aplicación web orientada a los clientes de **Boyz in the Sneaker**, una tienda especializada en zapatillas. Permite a los usuarios explorar el catálogo de productos, configurar un carrito de compras y realizar el pago mediante MercadoPago.

La aplicación consume datos exclusivamente a través de la API REST provista por la aplicación Laravel, lo que refuerza la arquitectura de dos sistemas completamente independientes.

---

## 🛠️ Especificaciones Técnicas

- **Framework:** React 19 con Vite
- **Estilos:** Tailwind CSS (mobile-first)
- **Routing:** React Router DOM
- **Fetching:** TanStack Query
- **Estado global:** Zustand (carrito persistido en localStorage)
- **HTTP Client:** Axios
- **Despliegue:** Vercel

---

## 🚀 Instalación Local

1. Clonar el repositorio:
```bash
git clone https://github.com/GastonLlampa/aplicaciones-web-react.git
cd aplicaciones-web-react
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editá el `.env` y configurá:
VITE_API_URL=http://localhost:8000/api-public

4. Correr en desarrollo:
```bash
npm run dev
```

> ⚠️ Para que funcione correctamente necesitás tener el proyecto Laravel corriendo en `http://localhost:8000`

---

## 🔌 API REST — Documentación

La aplicación consume la API pública provista por el backend Laravel. La URL base en producción es:
https://boyz-in-the-sneaker-laravel.vercel.app/api-public

## 🔄 Flujo de compra
Catálogo → Detalle → [elige talle + cantidad] → Carrito
→ Checkout [nombre, apellido, email, teléfono, dirección]
→ Laravel crea preferencia MP y registra venta como "pendiente"
→ React redirige a MercadoPago
→ Cliente paga
→ MercadoPago llama al webhook de Laravel
→ Laravel actualiza estado a "pagado"
→ MercadoPago redirige a /pago/exitoso

---

## 📊 Auditoría Lighthouse

Resultados obtenidos en producción (mobile):

| Categoría | Puntaje |
|---|---|
| Performance | 89 |
| Accessibility | 95 |
| Best Practices | 100 |
| SEO | 83 |
