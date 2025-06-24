"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img1 from "../../../public/dsc3.jpg";
import img2 from "../../../public/dsc4.jpg";
import img3 from "../../../public/dsc5.jpg";
import img4 from "../../../public/dsc2.jpg";
import { useRouter } from "next/navigation"; // Cambié la importación de useRouter

const PhotoGallery = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false); // Para asegurar que el código solo corra en el cliente
  const router = useRouter();

  // Asegurarse de que el código solo se ejecute en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = () => {
    // Guardamos los datos en el localStorage (o podrías pasarlos por la URL)
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    
    // Redirigimos a la página de confirmación
    router.push("/fintransaccion");
  };

  if (!isClient) {
    return null; // Prevenir el renderizado del código que depende de router en el servidor
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-black mb-8 mt-5">Confirmar Selección</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Image src={img1} alt="Foto 1" className="w-full h-full object-cover" loading="lazy" placeholder="blur"/>
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Image src={img2} alt="Foto 2" className="w-full h-full object-cover" loading="lazy" placeholder="blur" />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Image src={img3} alt="Foto 3" className="w-full h-full object-cover" loading="lazy" placeholder="blur" />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>
        </div>
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <Image src={img4} alt="Foto 4" className="w-full h-full object-cover" loading="lazy" placeholder="blur" />
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-80">
              ElQueBuscaEncuentra
            </p>
        </div>
      </div>

      <input
        id="name"
        type="text"
        className="w-[50%] text-black mb-5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        id="email"
        type="text"
        className="w-[50%] text-black mb-5 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Correo electronico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <button
        onClick={handleSubmit}
        className="bg-blue-500 mb-5 w-[80%] text-white px-6 py-3 rounded-lg text-2xl font-semibold hover:bg-blue-600 transition"
      >
        Confirmar
      </button>
    </div>
  );
};

export default PhotoGallery;
