/* "use client";
import Image from "next/image";
import { useState } from "react";
import Detalle from "../components/Detalle";
import imagen from "../../../public/dsc.jpg";
import imagen3 from "../../../public/dsc3.jpg";
import imagen4 from "../../../public/dsc4.jpg";
import imagen5 from "../../../public/dsc5.jpg";
import imagen2 from "../../../public/dsc2.jpg";
import imagen7 from "../../../public/dsc7.jpg";
import imagen8 from "../../../public/dsc8.jpg";
import marca from "../../../public/buscabien2-3.png";

const Galeria = () => {
  const [detalle, setDetalle] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());

  const detalleOpen = () => {
    setDetalle(true);
    console.log("Detalle abierto");
  };

  const detalleClose = () => {
    setDetalle(false);
    setSelectedImage(null);
    console.log("Detalle cerrado");
  };

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

  const images = [imagen, imagen3, imagen4, imagen5, imagen2, imagen7, imagen8];

  return (
    <div>
      <h1 className="text-6xl text-center">
        CHAPADMALAL - 15 de febrero 2024 - FIN DE TARDE
      </h1>

      {detalle && (
        <div onClick={() => detalleClose()}>
          <Detalle />
        </div>
      )}

      <div className="bg-gray-800 grid grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative rounded-xl m-5">
            <Image
              onClick={() => detalleOpen()}
              src={img}
              alt="imagen"
              className="w-full h-full rounded-xl object-cover cursor-pointer"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white opacity-50">
            <Image src={marca} alt="marca-de-agua" className="w-[16rem]"/>
            </div>
            

            {/* Círculo de selección *//*} /*
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleCircleClick(index);
              }}
              className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 cursor-pointer ${
                selectedImages.has(index) ? "bg-white" : "bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>

    <a href="/checkout">
      <button className="fixed bottom-5 right-3 bg-green-500 text-white p-5 rounded-3xl text-xl hover:bg-green-600">
        TERMINAR ⮕
      </button>
      </a>
    </div>
  );
};

export default Galeria;
 */



/* OTRO */

/* "use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageFetcher from "@/app/components/ImageFetcher";
import handler from "../../../../../pages/api/firebase/getGaleria";


const Galeria = ({ fotos }: { fotos: { path: string }[] }) => {
  const router = useRouter();
  const { params } = router; // Obtén los parámetros dinámicos

  const lugar = params?.lugar || ""; // Asegúrate de manejar valores undefined
  const fecha = params?.fecha || "";
  const horario = params?.horario || "";

  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await handler(lugar,fecha,horario);
        const data = await response;
        console.log(response)

        /* if (response.ok) {
          setImagenes(data.fotos);
        } else {
          console.error("Error:", data.message);
        } */ /*
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lugar && fecha && horario) {
      fetchImages();
    }
  }, [lugar, fecha, horario]);

  if (loading) {
    return <p>Cargando imágenes...</p>;
  }

  if (imagenes.length === 0) {
    return <p>No se encontraron imágenes para esta galería.</p>;
  }

  useEffect(() => {
    console.log("Fotos obtenidas:", imagenes);
  }, [imagenes]);
  console.log("Fotos obtenidas:", imagenes)
  alert(fotos)
  return (
    <div>
      <h1 className="text-6xl text-center">
        {lugar.toUpperCase()} - {fecha} - {horario.toUpperCase()}
      </h1>
      <div className="bg-gray-800 grid grid-cols-3 gap-4">
        
         <div className="galeria">
      {fotos.map((foto: { path: any; }, index: any) => (
        <ImageFetcher path={foto.path} />
      ))}
    </div>

      </div>
    </div>
  );
};

export default Galeria;
 */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageFetcher from "@/app/components/ImageFetcher";
import { getGaleria } from "../../../../../pages/api/firebase/getGaleria";

type Foto = {
  ubicacion: string;
  fecha: string;
  turno: string;
  path: string;
  id: string;
};

const Galeria = () => {
  const { lugar, fecha, horario } = useParams() as {
    lugar: string;
    fecha: string;
    horario: string;
  };

  const [imagenes, setImagenes] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("Llamando a getGaleria con:", { lugar, fecha, horario });
        const fotos = await getGaleria(lugar, fecha, horario);
        setImagenes(fotos);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (lugar && fecha && horario) {
      fetchImages();
    }
  }, [lugar, fecha, horario]);

  if (loading) {
    return <p>Cargando imágenes...</p>;
  }

  if (imagenes.length === 0) {
    return <p>No se encontraron imágenes para esta galería.</p>;
  }

  return (
    <div>
      <h1 className="text-6xl text-center">
        {lugar.toUpperCase()} - {fecha} - {horario.toUpperCase()}
      </h1>
      <div className="bg-gray-800 grid grid-cols-3 gap-4">
        <div className="galeria">
          {imagenes.map((foto: { path: string }, index: number) => (
            <ImageFetcher key={index} path={foto.path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Galeria;
