import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductos, getProductosDescuento } from '../api/productos'; 
import ProductoCard from '../components/ProductoCard';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const Home = () => {
  const { 
    data: dataDescuentos, 
    isLoading: isLoadingDescuentos, 
    isError: isErrorDescuentos 
  } = useQuery({
    queryKey: ['productosDescuentos'],
    queryFn: () => getProductosDescuento()
  });

  const { 
    data: dataRecomendados, 
    isLoading: isLoadingRecomendados, 
    isError: isErrorRecomendados 
  } = useQuery({
    queryKey: ['productosRecomendados'],
    queryFn: () => getProductos()
  });

  const productosEnPromo = dataDescuentos?.data || [];
  const productosRecomendados = dataRecomendados?.data?.slice(0, 8) || [];

  return (
    <div className="flex flex-col bg-white">
      
      {/* 1. SECCIÓN PROMOCIONAL (Hero / Banner Principal) */}
      <section className="relative w-full h-[60vh] min-h-[300px] bg-black flex items-center justify-center text-center overflow-hidden">
        <img 
          src={heroImg} 
          alt="Boyz in the Sneaker Promoción" 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
        />
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-4 shadow-sm">
            Official Store
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic drop-shadow-lg tracking-tight">
            Boyz in the Sneaker
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-200 font-medium drop-shadow-md">
            Encontrá tu estilo entre las mejores marcas del mundo
          </p>
        </div>
      </section>

      {/* 2. SECCIÓN ÚLTIMOS DESCUENTOS */}
      <section className="py-14 w-full bg-gray-50 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          
          <div className="px-4 md:px-8 flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-gray-900">
              Últimos descuentos
            </h2>
            <Link to="/productos" className="text-xs md:text-sm text-gray-500 hover:text-black underline font-medium">
              Ver todos
            </Link>
          </div>

          {isLoadingDescuentos && (
            <div className="flex gap-4 overflow-x-auto px-4 md:px-8 py-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex-none w-[170px] md:w-[240px] h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
              ))}
            </div>
          )}

          {!isLoadingDescuentos && !isErrorDescuentos && (
            <div 
              className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-6 pt-2 snap-x snap-mandatory scroll-smooth custom-scrollbar"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <style>{`.custom-scrollbar::-webkit-scrollbar { display: none; } .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
              
              {productosEnPromo.map((producto) => (
                <div key={producto.id} className="flex-none w-[170px] md:w-[240px] snap-start">
                  <ProductoCard producto={producto} />
                </div>
              ))}
              
              {productosEnPromo.length > 0 && (
                <div className="flex-none w-1 md:w-4 border-transparent"></div>
              )}

              {productosEnPromo.length === 0 && (
                <p className="text-sm text-gray-400 italic py-10 w-full text-center pr-4">
                  No hay descuentos activos en este momento.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. SECCIÓN RECOMENDADOS */}
      <section className="py-14 w-full bg-white max-w-screen-xl mx-auto">
        <div className="px-4 md:px-8 flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-gray-900">
            Recomendados para vos
          </h2>
        </div>

        {isLoadingRecomendados && (
          <div className="flex gap-4 overflow-x-auto px-4 md:px-8 py-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex-none w-[170px] md:w-[240px] h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        )}

        {!isLoadingRecomendados && !isErrorRecomendados && (
          <div 
            className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-6 pt-2 snap-x snap-mandatory scroll-smooth custom-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {productosRecomendados.map((producto) => (
              <div key={producto.id} className="flex-none w-[170px] md:w-[240px] snap-start">
                <ProductoCard producto={producto} />
              </div>
            ))}

            {productosRecomendados.length > 0 && (
              <div className="flex-none w-1 md:w-4 border-transparent"></div>
            )}
          </div>
        )}

        {/* Botón hacia el catálogo completo */}
        <div className="mt-8 flex justify-center px-4">
          <Link 
            to="/productos" 
            className="bg-black text-white text-sm md:text-base font-bold uppercase px-10 py-4 rounded-2xl active:scale-95 transition-transform hover:bg-gray-800 shadow-md"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;