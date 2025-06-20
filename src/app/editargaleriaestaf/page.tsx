"use client";
import { useState } from "react";
import Image from "next/image";
import { FileDrop } from "react-file-drop";
import imagen from "../../../public/image2.jpg";

const Galeria = () => {
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [hiddenImages, setHiddenImages] = useState<Set<number>>(new Set());
  const [isDragAreaVisible, setIsDragAreaVisible] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
const [uploadComplete, setUploadComplete] = useState(false);

  const handleCircleClick = (index: number) => {
    setSelectedImages((prev) => {
      const updated = new Set(prev);
      updated.has(index) ? updated.delete(index) : updated.add(index);
      return updated;
    });
  };

  const toggleDragArea = () => setIsDragAreaVisible((prev) => !prev);

  const handleDrop = (files: any) => {
    setDroppedFiles(files);
    console.log("Archivos soltados:", files);
  
    setIsUploading(true);
    setUploadComplete(false);
  
    // Simular subida falsa de 20 segundos
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
    }, 20000);
  };

  const handleDelete = () => {
    if (selectedImages.size === 0) {
      alert("No hay imágenes seleccionadas.");
      return;
    }

    alert("Las imágenes seleccionadas serán eliminadas.");
    setHiddenImages((prev) => new Set([...prev, ...selectedImages]));
    setSelectedImages(new Set()); // Limpiar selección después
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <h1 className="text-4xl md:text-6xl font-bold text-center p-6 text-indigo-700">
        Estafeta - 16 de febrero 2024 - MAÑANA
      </h1>

      {/* Drag & Drop */}
      {isDragAreaVisible && (
        <div className="p-4">
          <FileDrop
            onDrop={handleDrop}
            className="w-full h-64 border-4 border-dashed border-indigo-400 rounded-xl flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <p className="text-indigo-600 text-lg font-medium">
              Arrastra imágenes aquí o haz clic para seleccionar
            </p>
          </FileDrop>
        </div>
      )}

      {isUploading && (
        <div className="w-full bg-gray-300 rounded-full h-4 mt-4 animate-pulse overflow-hidden">
          <div className="bg-indigo-600 h-full w-full animate-pulse text-center text-white text-sm leading-4">
            Subiendo las imágenes...
          </div>
        </div>
      )}

      {uploadComplete && (
        <div className="mt-4 text-green-600 font-semibold text-center">
          ✅ Imágenes subidas exitosamente
        </div>
      )}

      {/* Galería */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-gray-100">
        {[...Array(12)].map((_, index) => {
          if (hiddenImages.has(index)) return null; // Ocultar imagen
          return (
            <div key={index} className="relative overflow-hidden rounded-xl shadow-md">
              <Image
                src={imagen}
                alt="Imagen"
                className="object-cover w-full h-64 transition-transform duration-300 hover:scale-105"
              />
              <p className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold bg-black bg-opacity-30">
                ElQueBuscaEncuentra
              </p>
              <div
                onClick={() => handleCircleClick(index)}
                className={`absolute top-3 right-3 w-6 h-6 border-2 border-white rounded-full cursor-pointer ${
                  selectedImages.has(index) ? "bg-white" : "bg-transparent"
                } transition-colors duration-200`}
                title="Seleccionar"
              ></div>
            </div>
          );
        })}
      </div>

      {/* Botones flotantes */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <button
          onClick={toggleDragArea}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl"
          title="Agregar imagen"
        >
          +
        </button>
        <button
          onClick={handleDelete}
          className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center text-xl"
          title="Eliminar imágenes"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Galeria;
