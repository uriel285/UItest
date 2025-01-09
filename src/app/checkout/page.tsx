import React from "react";
import Image from "next/image";
import img1 from "../../../public/dsc3.jpg";
import img2 from "../../../public/dsc4.jpg";
import img3 from "../../../public/dsc5.jpg";
import img4 from "../../../public/dsc2.jpg";

const PhotoGallery = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-black mb-8 mt-5">Confirmar Seleccion</h1>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Image src={img1} alt="Foto 1" className="w-full h-full object-cover" />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Image src={img2} alt="Foto 2" className="w-full h-full object-cover" />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Image src={img3} alt="Foto 3" className="w-full h-full object-cover" />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Image src={img4} alt="Foto 4" className="w-full h-full object-cover" />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>
        </div>
      </div>

      <input
                id="location"
                type="text"
                className="w-[50%] text-black mb-5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nombre"
              />

<input
                id="location"
                type="text"
                className="w-[50%] text-black mb-5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Correo electronico"
              />
      
      <a href="/fintransaccion">
      <button className="bg-blue-500 mb-5 w-[100%] text-white px-6 py-3 rounded-lg text-2xl font-semibold hover:bg-blue-600 transition">
        Confirmar
      </button>
      </a>
    </div>
  );
};

export default PhotoGallery;
