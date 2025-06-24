"use client"
import Image from "next/image";
import Link from 'next/link';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carrousel from "./components/Carrousel"
import imagen1 from '../../public/dsc.jpg';
import imagen2 from '../../public/dsc2.jpg';
import { useState, useEffect } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar la visibilidad del cuadro de texto
  const toggleText = () => {
    setIsOpen(!isOpen);
  };

  const [filters, setFilters] = useState({
    filter1: '', // Ubicación
    filter2: '', // Fecha
    filter3: '', // Horario
    date: '',    // Fecha seleccionada
  });

  const [filteredGallery, setFilteredGallery] = useState<any[]>([]);

  const galleries = [
    { id: 'galeria1', name: 'Hotel 5', date: '2024-02-15', time: 'Mañana', image: imagen1 },
    { id: 'galeria2', name: 'Estafeta', date: '2024-02-16', time: 'Fin de tarde', image: imagen2 },
  ];

  // Función para actualizar los filtros
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const { filter1, filter3 } = filters;
    let filtered = galleries;

    // Filtrar por ubicación
    if (filter1) {
      filtered = filtered.filter(gallery => gallery.name === filter1);
    }

    // Filtrar por horario
    if (filter3) {
      filtered = filtered.filter(gallery => gallery.time === filter3);
    }

    // Si no hay resultados después de filtrar
    if (filtered.length === 0) {
      setFilteredGallery([{ message: "No se encontró esa galería." }]);
    } else {
      setFilteredGallery(filtered);
    }
  }, [filters]);

  return (
    <div className="bg-gray-100">
      <Header onFilterChange={handleFilterChange} />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Carrousel />

        {/* Botón sutil para ver la lista de precios */}
        <div className="w-full max-w-lg mx-auto mt-10 cursor-pointer text-black text-center">
          <h2
            className="text-xl font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            onClick={toggleText}
          >
            Haz clic para ver la lista de precios
          </h2>
        </div>

        {/* Pop-up de precios */}
        {isOpen && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] sm:w-[400px]">
              <h3 className="text-2xl font-semibold text-center mb-4">Lista de Precios</h3>
              <ul className="text-xl text-center space-y-2">
                <li>Pack 10 fotos = 1$</li>
                <li>Pack 20 fotos = 2$</li>
                <li>Pack 30 fotos = 3$</li>
                <li>Pack 40 fotos = 4$</li>
                <li>Pack 50 fotos = 5$</li>
              </ul>
              <button
                className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-md"
                onClick={toggleText}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <div className="w-full max-w-lg mx-auto mt-10 text-center">
          <span className="text-black text-2xl">Galerías por día y ubicación</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredGallery.length > 0 ? (
            filteredGallery.map((gallery) => (
              gallery.message ? (
                <div key="no-results" className="w-full text-center p-4">{gallery.message}</div>
              ) : (
                <div key={gallery.id} className="bg-white shadow-lg text-gray-950 rounded-xl m-5">
                  <a href={`/galeria${gallery.name.toLowerCase().replace(' ', '')}`}>
                    <Image src={gallery.image} alt="imagen" className="w-[100%] h-auto rounded-t-xl mx-auto" />
                    <div className="text-center">
                      <p className="text-xl">{gallery.name}, {gallery.date}, {gallery.time}</p>
                    </div>
                  </a>
                </div>
              )
            ))
          ) : (
            <div className="w-full bg-red-400 p-4 rounded-lg">
              <p className="text-white text-center text-xl font-semibold">No se encontraron galerías para los filtros seleccionados</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
