import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400 py-12 px-6 text-center border-t border-gray-900 w-full mt-auto">
      <div className="max-w-screen-lg mx-auto space-y-8">
        
        {/* Nombre y Dirección */}
        <div className="space-y-2">
          <h3 className="text-lg font-black text-white tracking-widest uppercase italic">
            Boyz in the Sneaker
          </h3>
          <p className="text-sm leading-relaxed text-gray-500">
            Belgrano 504, U9100 Trelew, Chubut
          </p>
        </div>

        {/* Medios de Pago */}
        <div className="border-t border-gray-800 pt-8">
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">
            Medios de pago disponibles
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-[10px] font-extrabold bg-[#009EE3] text-white px-3 py-1.5 rounded tracking-wider">
              MERCADO PAGO
            </span>
            <span className="text-[10px] font-extrabold bg-blue-900 text-white px-3 py-1.5 rounded tracking-wider">
              VISA
            </span>
            <span className="text-[10px] font-extrabold bg-orange-600 text-white px-3 py-1.5 rounded tracking-wider">
              MASTERCARD
            </span>
            <span className="text-[10px] font-extrabold bg-gray-800 text-white px-3 py-1.5 rounded tracking-wider">
              EFECTIVO
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Boyz in the Sneaker. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;