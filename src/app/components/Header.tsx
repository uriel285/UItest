"use client"
import Image from "next/image";
import filter from "../../../public/icons/filter.svg";
import logo from "../../../public/icono.png";
import { useState } from 'react';

const Header = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [filters, setFilters] = useState({
    filter1: '', // Ubicación
    filter2: '', // Fecha (No la usaremos para lógica, solo para recoger valor)
    filter3: '', // Horario
    date: '',    // Fecha seleccionada
  });

  const [showFilters, setShowFilters] = useState(false); // Controlar visibilidad de filtros

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [name]: value };
      onFilterChange(updatedFilters); // Notificar al componente principal
      return updatedFilters;
    });
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Filtros seleccionados:', filters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters); // Alternar visibilidad de filtros
  };

  return (
    <header className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-center p-4 bg-white text-black shadow-md">
      {/* Logo */}
      <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
        <Image src={logo} alt="logo-icon" className="w-[6rem]" />
      </div>

      {/* Filtros y botón para mostrar los filtros */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        {/* En pantallas pequeñas, mostrar la palabra "Filtros" */}
        <button 
          onClick={toggleFilters} 
          className="bg-blue-500 text-white p-2 rounded-md sm:hidden"
        >
          Filtros
        </button>

        {/* En pantallas grandes, siempre mostrar los filtros */}
        <div className="hidden sm:flex flex-row space-x-4">
          <Image
            src={filter}
            alt="filter-icon"
            className="w-10 h-10 cursor-pointer"
          />

          {/* Filtro de Ubicación */}
          <select
            name="filter1"
            value={filters.filter1}
            onChange={handleChange}
            className="bg-gray-100 text-black p-2 rounded-md w-full sm:w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Ubicación</option>
            <option value="Hotel 5">Hotel 5</option>
            <option value="Estafeta">Estafeta</option>
          </select>

          {/* Filtro de Fecha (Calendario) */}
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="bg-gray-100 text-black p-2 rounded-md w-full sm:w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />

          {/* Filtro de Horario */}
          <select
            name="filter3"
            value={filters.filter3}
            onChange={handleChange}
            className="bg-gray-100 text-black p-2 rounded-md w-full sm:w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Horario</option>
            <option value="Mañana">Mañana</option>
            <option value="Fin de tarde">Fin de tarde</option>
          </select>
        </div>

        {/* Filtros visibles solo en pantallas pequeñas */}
        {showFilters && (
          <div className="flex flex-col space-y-4 w-full sm:hidden mt-4">
            {/* Filtro de Ubicación */}
            <select
              name="filter1"
              value={filters.filter1}
              onChange={handleChange}
              className="bg-gray-100 text-black p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Ubicación</option>
              <option value="Hotel 5">Hotel 5</option>
              <option value="Estafeta">Estafeta</option>
            </select>

            {/* Filtro de Fecha (Calendario) */}
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="bg-gray-100 text-black p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />

            {/* Filtro de Horario */}
            <select
              name="filter3"
              value={filters.filter3}
              onChange={handleChange}
              className="bg-gray-100 text-black p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Horario</option>
              <option value="Mañana">Mañana</option>
              <option value="Fin de tarde">Fin de tarde</option>
            </select>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
