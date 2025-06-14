"use client";
import React, { useState } from "react";
import { FileDrop } from "react-file-drop";
import { useRouter } from "next/navigation"; // Import router

const MyGalleryForm = () => {
  const [activeMenu, setActiveMenu] = useState("subir");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter(); // Hook de navegación

  const handleDrop: any = (droppedFiles: File[], event: React.DragEvent) => {
    setFiles([...files, ...droppedFiles]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert("Galería subida exitosamente");
      setLocation("");
      setDate("");
      setShift("");
      setFiles([]);
    }, 20000); // 20 segundos
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral */}
      <div className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Panel de Administración</h2>
        <ul>
          <li
            className={`mb-4 py-2 px-4 rounded-lg cursor-pointer ${activeMenu === "subir" ? "bg-indigo-600" : "hover:bg-indigo-600"}`}
            onClick={() => setActiveMenu("subir")}
          >
            <a>Subir Galería</a>
          </li>
          <li
            className="mb-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-600"
            onClick={() => router.push("/editar")}
          >
            <a>Editar Galería</a>
          </li>
          <li
            className="mb-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-600"
            onClick={() => router.push("/pedidos")}
          >
            <a>Pedidos</a>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-black mb-6">Subir Galería</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            {/* Campos del formulario */}
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
                <option value="">Selecciona el turno</option>
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
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
              {files.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-black mb-2">Imágenes seleccionadas:</h3>
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

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isUploading ? "Subiendo galería..." : "Subir Galería"}
            </button>

            {isUploading && (
              <div className="mt-4 text-indigo-700 font-medium animate-pulse">
                Subiendo galería... Esto puede tardar unos minutos.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyGalleryForm;
