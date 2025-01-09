"use client"
import Image from "next/image";
import filter from "../../../public/icons/filter.svg"
import logo from "../../../public/icono.png"
import { useState } from 'react';

const Header = () => {
  const [filters, setFilters] = useState({
    filter1: '',
    filter2: '',
    filter3: '',
  });

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log('Filtros seleccionados:', filters);
    // Aquí puedes manejar la lógica de búsqueda
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white text-black">
      <Image src={logo} alt="logo-icon" className="w-[6rem]"/>
      <div className="flex items-center space-x-4">
        <Image src={filter} alt="filter-icon" className="w-12 h-12"/>
        <select
          name="filter1"
          value={filters.filter1}
          onChange={handleChange}
          className="bg-black text-white p-2 rounded"
        >
          <option value="">Ubicacion</option>
          <option value="opcion1">Hotel 5</option>
          <option value="opcion2">Hotel 4</option>
          <option value="opcion3">Estafeta</option>
        </select>
        <select
          name="filter2"
          value={filters.filter2}
          onChange={handleChange}
          className="bg-black text-white p-2 rounded"
        >
          <option value="">Fecha</option>
          <option value="opcion1">Opción 1</option>
          <option value="opcion2">Opción 2</option>
          <option value="opcion3">Opción 3</option>
        </select>
        <select
          name="filter3"
          value={filters.filter3}
          onChange={handleChange}
          className="bg-black text-white p-2 rounded"
        >
          <option value="">Horario</option>
          <option value="opcion1">Mañana</option>
          <option value="opcion2">Mediodia</option>
          <option value="opcion3">Fin de tarde</option>
        </select>
        <a href="/filtro1">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
        >
          Buscar
        </button>
        </a>
      </div>
    </header>
  );
};

export default Header;
