"use client";

import Image from "next/image";
import { useState } from "react";
import marca from "../../../public/buscabien2-3.png"; // Marca de agua

const Galeria = () => {
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/dsc.jpg",
    "/dsc2.jpg",
    "/dsc3.jpg",
    "/dsc4.jpg",
    "/dsc5.jpg",
    "/dsc8.jpg",
  ];

  // Abrir el detalle de la imagen
  const openDetail = (image: string) => {
    setSelectedImage(image);
    setIsDetailOpen(true);
  };

  // Cerrar el detalle de la imagen
  const closeDetail = () => {
    setSelectedImage(null);
    setIsDetailOpen(false);
  };

  // Manejo de la selección de imágenes
  const handleCircleClick = (index: number) => {
    setSelectedImages((prevSelectedImages) => {
      const newSelectedImages = new Set(prevSelectedImages);
      if (newSelectedImages.has(index)) {
        newSelectedImages.delete(index);
      } else {
        newSelectedImages.add(index);
      }
      return newSelectedImages;
    });
  };

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-center my-8 font-semibold">
        Hotel 5 - 15 de febrero 2024 - FIN DE TARDE
      </h1>

      {/* Modal de detalle */}
      {isDetailOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeDetail}
        >
          <div className="relative w-10/12 sm:w-1/2 bg-white p-6 rounded-lg">
            <Image
              src={selectedImage}
              alt="Detalle"
              className="w-full h-auto rounded-lg object-contain"
              layout="intrinsic"
              width={800}  // Ajusta el tamaño de la imagen
              height={600}
              loading="lazy" // Cargar la imagen solo cuando esté visible
  placeholder="blur"
            />
            {/* Marca de agua sobre la imagen ampliada */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60">
              <Image src={marca} alt="Marca de agua" className="w-[16rem]" />
            </div>

            {/* Botón de cerrar */}
            <button
              onClick={closeDetail}
              className="absolute top-2 right-2 text-white text-2xl bg-black rounded-full p-2"
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Galería de imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-800 p-4">
        {images.map((img, index) => (
          <div key={index} className="relative rounded-xl group overflow-hidden">
            {/* Imagen */}
            <Image
              src={img}
              alt={`Galería ${index}`}
              width={300}
              height={300}
              className="w-full h-full object-cover cursor-pointer transition-all duration-300 ease-in-out group-hover:scale-105"
              onClick={() => openDetail(img)} // Abrir imagen al hacer clic
            />

            {/* Marca de agua sobre la miniatura */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60">
              <Image src={marca} alt="Marca de agua" className="w-[16rem]" />
            </div>

            {/* Círculo de selección */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleCircleClick(index);
              }}
              className={`absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-white cursor-pointer flex items-center justify-center bg-opacity-50 ${
                selectedImages.has(index) ? "bg-white" : "bg-transparent"
              }`}
            >
              {selectedImages.has(index) && (
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón de finalizar pedido */}
      <a href="/checkout">
        <button className="fixed bottom-5 right-3 bg-green-500 text-white p-5 rounded-3xl text-xl hover:bg-green-600 transition-all duration-200">
          TERMINAR ⮕
        </button>
      </a>
    </div>
  );
};

export default Galeria;