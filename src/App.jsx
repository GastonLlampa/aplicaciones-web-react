import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import DetalleProd from './pages/DetalleProd'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import PagoExitoso from './pages/PagoExitoso'
import PagoFallido from './pages/PagoFallido'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/productos/:id" element={<DetalleProd />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pago/exitoso" element={<PagoExitoso />} />
          <Route path="/pago/fallido" element={<PagoFallido />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
