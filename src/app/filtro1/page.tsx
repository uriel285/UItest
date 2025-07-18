"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carrousel from "../components/Carrousel"
import Image from "next/image"
import imagen1 from '../../../public/dsc.jpg';
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

    // Función para alternar la visibilidad del cuadro de texto
    const toggleText = () => {
        setIsOpen(!isOpen);
      }
  return (
    <div className="bg-gray-100">
    <Header/>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Carrousel />
       <div className="w-[100vw] text-center m-0">
        <span className="text-black text-2xl">Galerias por dia y ubicacion</span>
       </div>

       <div className="w-full max-w-lg mx-auto mt-10 cursor-pointer text-black text-center" onClick={toggleText}>
            {/* Botón para mostrar/ocultar el cuadro de texto */}
                <h2 className="text-2xl font-semibold">Haz clic para ver la lista de precios</h2>

            {/* Cuadro de texto desplegable */}
            {isOpen && (
                <div className="mt-4 p-4 border  rounded-lg shadow-md w-full">
                    <p className="text-black text-xl">
                        Pack 10 fotos = 1$ <br/>
                        Pack 20 fotos = 2$ <br/>
                        Pack 30 fotos = 3$ <br/>
                        Pack 40 fotos = 4$ <br/>
                        Pack 50 fotos = 5$ <br/>
                    </p>
                </div>
            )}
        </div>

        <div className="bg-white shadow-lg text-gray-950 rounded-xl m-5 w-[40%] mx-auto">
                <a href="/galeria">
                <Image src={imagen1} alt="imagen" className='w-[100%] h-auto rounded-t-xl mx-auto'/>
                <div className="text-center">
                    <p className="text-xl">Hotel 5, 15/02/2024, Mañana</p>
                </div>
                </a>
            </div>
      </main>
    <Footer/>
    </div>
  );
}
