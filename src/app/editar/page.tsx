"use client";
import React, { useState } from "react";
import Image from "next/image";
import imagen1 from "../../../public/dsc.jpg";
import imagen2 from "../../../public/dsc2.jpg";
import imagen3 from "../../../public/dsc3.jpg";

const EditGalleryPage = () => {
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);

  const galleryItems = [
    {
      id: "1",
      description: "Hotel 5, 15/02/2024, fin de tarde",
      url: "/editargaleriachapad",
    },
    {
      id: "2",
      description: "Estafeta, 16/02/2024, mañana",
      url: "/editargaleriaestaf",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Barra lateral */}
      <div className="w-full lg:w-64 bg-indigo-700 text-white p-6 lg:h-full flex-shrink-0 lg:sticky lg:top-0">
        <h2 className="text-3xl font-semibold text-center mb-8">Panel de Administración</h2>
        <ul>
          <li
            className="mb-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-600"
            onClick={() => (window.location.href = "/panel")}
          >
            Subir Galería
          </li>
          <li
            className="mb-4 py-2 px-4 rounded-lg bg-indigo-600 cursor-pointer"
          >
            Editar Galería
          </li>
          <li
            className="mb-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-600"
            onClick={() => (window.location.href = "/pedidos")}
          >
            Pedidos
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-black mb-6">Editar Galería</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona una galería para editar
            </label>
            <div className="flex overflow-x-auto max-h-[400px] scrollbar-thin scrollbar-thumb-indigo-600">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-gray-800 rounded-xl m-5 cursor-pointer ${
                    selectedGallery === item.id ? "border-4 border-indigo-500" : ""
                  }`}
                  onClick={() => setSelectedGallery(item.id)}
                >
                  <a href={item.url}>
                    <div className="text-center p-2">
                      <p className="text-xl text-white">{item.description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barra lateral en pantallas pequeñas (footer) */}
      <div className="lg:hidden w-full bg-indigo-700 text-white p-4 flex justify-between">
        <ul className="flex w-full justify-around">
          <li
            className="py-2 px-4 cursor-pointer hover:bg-indigo-600"
            onClick={() => (window.location.href = "/panel")}
          >
            Subir Galería
          </li>
          <li
            className="py-2 px-4 bg-indigo-600 cursor-pointer"
          >
            Editar Galería
          </li>
          <li
            className="py-2 px-4 cursor-pointer hover:bg-indigo-600"
            onClick={() => (window.location.href = "/pedidos")}
          >
            Pedidos
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditGalleryPage;
