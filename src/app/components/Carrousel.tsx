"use client";
import { useEffect, useState } from 'react';
import Image from "next/image";
import image1 from "../../../public/image1.jpg";
import image2 from "../../../public/image2.jpg";

const images = [
  image1,
  image2,
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 300); // Duración de la transición
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Cambia la imagen cada 1.5 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="carousel">
        <div className={`image-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
        <Image src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className='w-[100vw] h-auto'/>
        </div>

    </div>
  );
};

export default Carousel;
