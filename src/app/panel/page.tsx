"use client"
import React, { useState } from "react";
//import { Link } from "react-router-dom";
import { FileDrop } from "react-file-drop";
import Image from "next/image";
import imagen1 from '../../../public/dsc.jpg';
import imagen2 from '../../../public/dsc2.jpg';
import imagen3 from '../../../public/dsc3.jpg';
//import { createFoto } from "../../lib/firebase"; // Importa tu función de creación de foto
import axios from "axios";
import MyGalleryForm from "../components/MyGalleryForm";

const Panel = () => {
  const [activeMenu, setActiveMenu] = useState("subir");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [files, setFiles] = useState<File[]>([]);
   const [selectedGallery, setSelectedGallery] = useState<string | null>(null);

  // Datos simulados para la galería
  const galleryItems = [
    {
      id: "1",
      imageUrl: imagen1,
      description: "Hotel 5, 15/02/2024, fin de tarde",
    },
    {
      id: "2",
      imageUrl: imagen2,
      description: "Estafeta, 16/02/2024, mañana",
    },
    {
      id: "3",
      imageUrl: imagen3,
      description: "Acantilados, 04/12/2024, tarde",
    },
    // Agrega más items según sea necesario
  ];

  const handleSelectGallery = (id: string) => {
    setSelectedGallery(id); // Establecer la galería seleccionada
  };

  // Manejo de archivos arrastrados
  const handleDrop: any = (files: File[], event: React.DragEvent) => {
    setFiles([...files, ...files]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación de campos
    if (!location || !date || !shift || files.length === 0) {
      alert("Por favor, completa todos los campos y agrega al menos una imagen.");
      return;
    }

    console.log("Formulario enviado:");
    console.log("Ubicación:", location);
    console.log("Fecha:", date);
    console.log("Turno:", shift);
    console.log("Archivos:", files);

    // Resetear formulario
    setLocation("");
    setDate("");
    setShift("");
    setFiles([]);
  };

  const orders = [
    {
      id: "1",
      description: "#00002, Uriel",
      imageUrl: "/path/to/image1.jpg",
    },
    {
      id: "2",
      description: "#00003, Cliente2",
      imageUrl: "/path/to/image2.jpg",
    },
    {
      id: "3",
      description: "#00004, Cliente3",
      imageUrl: "/path/to/image3.jpg",
    },
    // Agrega más pedidos si es necesario
  ];

  const handleAcceptOrder = (id: string) => {
    console.log(`Pedido ${id} aceptado.`);
    alert("El cliente recibira las imagenes por mail")
  };

  const handleRejectOrder = (id: string) => {
    console.log(`Pedido ${id} rechazado.`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral de navegación */}
      <div className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Panel de Administración</h2>
        <ul>
          <li
            onClick={() => setActiveMenu("subir")}
            className={`mb-4 py-2 px-4 rounded-lg cursor-pointer ${activeMenu === "subir" ? "bg-indigo-600" : "hover:bg-indigo-600"}`}
          >
            <a>Subir Galería</a>
          </li>
          <li
            onClick={() => setActiveMenu("editar")}
            className={`mb-4 py-2 px-4 rounded-lg cursor-pointer ${activeMenu === "editar" ? "bg-indigo-600" : "hover:bg-indigo-600"}`}
          >
            <a>Editar Galería</a>
          </li>
          <li
            onClick={() => setActiveMenu("pedidos")}
            className={`mb-4 py-2 px-4 rounded-lg cursor-pointer ${activeMenu === "pedidos" ? "bg-indigo-600" : "hover:bg-indigo-600"}`}
          >
            <a>Pedidos</a>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      {activeMenu === "subir" && (
      /* <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-black mb-6">Subir Galería</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-black mb-2">
                Ubicación
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingresa la ubicación"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-black mb-2">
                Fecha
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="shift" className="block text-sm font-medium text-black mb-2">
                Turno
              </label>
              <select
                id="shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option  className="text-black"value="">Selecciona el turno</option>
                <option className="text-black" value="mañana">Mañana</option>
                <option className="text-black" value="tarde">Tarde</option>
                <option className="text-black" value="noche">Noche</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black mb-2">
                Imágenes
              </label>
              <FileDrop
                onDrop={handleDrop}
                className="border-2 border-dashed border-gray-300 p-6 text-center rounded-md cursor-pointer hover:bg-gray-50"
              >
                <p className="text-gray-500">Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar</p>
              </FileDrop>
              <div className="mt-4">
                {files.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-black b-2">Imágenes seleccionadas:</h3>
                    <ul>
                      {files.map((file, index) => (
                        <li key={index} className="text-black">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Subir Galería
            </button>
          </form>
        </div>
      </div> */
      <MyGalleryForm/>
      )}

      {activeMenu === "editar" && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Galería</label>
                {/* Contenedor con scroll vertical */}
                <div className="flex overflow-x-auto max-h-[400px] scrollbar-thin scrollbar-thumb-indigo-600">
                  {galleryItems.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-gray-800 rounded-xl m-5 cursor-pointer ${
                        selectedGallery === item.id ? "border-4 border-indigo-500" : ""
                      }`}
                      onClick={() => handleSelectGallery(item.id)}
                    >
                      <a href="/editargaleria">
                      <Image
                        src={item.imageUrl}
                        alt="imagen"
                        className="w-full h-auto rounded-t-xl mx-auto"
                        width={300} // Ajusta según el tamaño de tus imágenes
                        height={200} // Ajusta según el tamaño de tus imágenes
                      />
                      <div className="text-center py-2">
                        <p className="text-xl text-white">{item.description}</p>
                      </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

{activeMenu === "pedidos" && (
  <>
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Pedido</label>
        {/* Contenedor con scroll horizontal */}
        <div className="flex overflow-x-auto space-x-4 py-4 scrollbar-thin scrollbar-thumb-indigo-600">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-800 rounded-xl p-4 w-72 cursor-pointer">
              <div className="text-center py-2">
                <p className="text-lg text-white">{order.description}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleAcceptOrder(order.id)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleRejectOrder(order.id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
)}

    </div>
  );
};

export default Panel;
