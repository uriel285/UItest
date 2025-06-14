/* "use client"
import React, { useEffect, useState } from 'react';

const ImageFetcher = ({ path }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Realiza la petición al API
        const response = await fetch('/api/backblaze/getImage');

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('No se pudo cargar la imagen desde el servidor.');
        }

        // Convierte la respuesta a un Blob
        const imageBlob = await response.blob();
        console.log('Tipo de contenido de la imagen:', imageBlob.type);

        // Verifica que se haya recibido un Blob de imagen
        if (imageBlob.type.startsWith('image/')) {
          // Crea una URL para el Blob
          const imageObjectUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageObjectUrl); // Establece la URL de la imagen en el estado
        } else {
          throw new Error('La respuesta no es una imagen.');
        }
      } catch (err) {
        console.error('Error al obtener la imagen:', err);
        setError('No se pudo cargar la imagen.');
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchImage(); // Llama a la función para obtener la imagen
  }, []);

  if (loading) return <p>Cargando imagen...</p>;
  if (error) return <p>{error}</p>;

  return imageUrl ? (
    <img src={imageUrl} alt="Imagen cargada" />
  ) : (
    <p>No se pudo cargar la imagen.</p>
  );
};

export default ImageFetcher;
 */
"use client";
import React, { useEffect, useState } from "react";

interface ImageFetcherProps {
  path: string; // Agregamos path como prop
}

const ImageFetcher: React.FC<ImageFetcherProps> = ({ path }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/backblaze/getImage?path=${encodeURIComponent(path)}`);

        if (!response.ok) {
          throw new Error("No se pudo cargar la imagen desde el servidor.");
        }

        const imageBlob = await response.blob();
        if (imageBlob.type.startsWith("image/")) {
          const imageObjectUrl = URL.createObjectURL(imageBlob);
          setImageUrl(imageObjectUrl);
        } else {
          throw new Error("La respuesta no es una imagen.");
        }
      } catch (err) {
        console.error("Error al obtener la imagen:", err);
        setError("No se pudo cargar la imagen.");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [path]); // Dependencia al path

  if (loading) return <p>Cargando imagen...</p>;
  if (error) return <p>{error}</p>;

  return imageUrl ? <img src={imageUrl} alt="Imagen cargada" /> : <p>No se pudo cargar la imagen.</p>;
};

export default ImageFetcher;
