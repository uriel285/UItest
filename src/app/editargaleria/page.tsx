"use client";
import { useState } from "react";
import Image from "next/image";
import imagen from '../../../public/image2.jpg';
import { FileDrop } from "react-file-drop";

const Galeria = () => {
  const image = imagen;

  // Estado para almacenar si el círculo está marcado o no
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());

  const handleCircleClick = (index: number) => {
    setSelectedImages((prevSelectedImages) => {
      const newSelectedImages = new Set(prevSelectedImages);
      if (newSelectedImages.has(index)) {
        newSelectedImages.delete(index); // Si ya estaba seleccionado, desmarcar
      } else {
        newSelectedImages.add(index); // Si no estaba, marcar
      }
      return newSelectedImages;
    });
  };

  // Estado para manejar la visibilidad del área de drag and drop
  const [isDragAreaVisible, setIsDragAreaVisible] = useState(false);
  const [droppedFiles, setDroppedFiles]: any = useState<File[]>([]);

  // Función para cambiar la visibilidad del área de Drag and Drop
  const toggleDragArea = () => setIsDragAreaVisible((prev) => !prev);

  // Función que maneja los archivos soltados
  const handleDrop: any = (files: File[], event: React.DragEvent) => {
    setDroppedFiles(files);
    console.log("Archivos soltados:", files);
  };

  return (
    <div>
      <h1 className="text-6xl text-center">CHAPADMALAL  -  15 de febrero 2024  -  FIN DE TARDE</h1>

      <div className="flex justify-between items-center p-4 px-8 rounded-lg shadow-md">
        {/* Botón rojo con ícono de tacho de basura */}
        <button className="flex items-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">
          <i className="fas fa-trash-alt mr-2"></i> {/* Ícono de tacho de basura */}
          Eliminar
        </button>

        {/* Botón verde con ícono de "+" */}
        <button onClick={toggleDragArea} className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          <i className="fas fa-plus mr-2"></i> {/* Ícono de "+" */}
          Agregar
        </button>
      </div>

      {/* Área de Drag and Drop */}
      {isDragAreaVisible && (
        <FileDrop
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}  // Prevenir comportamiento por defecto
          onDragLeave={(e) => e.preventDefault()} // Prevenir comportamiento por defecto
          className="w-full h-64 border-4 border-dashed border-indigo-600 rounded-xl flex justify-center items-center bg-indigo-50 hover:bg-indigo-100"
        >
          <p className="text-center text-indigo-600">
            Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.
          </p>
        </FileDrop>
      )}

      <div className="bg-gray-800 grid grid-cols-3 gap-4">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="relative rounded-xl m-5">
            <Image
              src={image}
              alt="imagen"
              className="w-full h-full rounded-xl object-cover cursor-pointer"
            />
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>

            {/* Círculo vacío en la esquina superior derecha */}
            <div
              onClick={() => handleCircleClick(index)}
              className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 cursor-pointer ${selectedImages.has(index) ? "bg-white" : "bg-transparent"}`}
            ></div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Galeria;
