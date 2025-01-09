"use client"
import React, { useState } from "react";
import Image from "next/image";
import instagram from "../../../public/icons/instagram.svg"

const PedidoExito = () => {
  const [copied, setCopied] = useState(false);

  const pedidoTexto = "Hola, mi numero de pedido es: #00002 Uriel";

  const handleCopy = () => {
    navigator.clipboard.writeText(pedidoTexto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Resetea el estado después de 2 segundos.
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Pedido Realizado con Éxito</h1>
      <h2 className="text-xl font-medium text-gray-700 mb-6">
        Notifica por Instagram tu pedido para hacer el pago
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md border flex items-center justify-between w-full max-w-lg">
        <p className="text-gray-800 text-lg">{pedidoTexto}</p>
        <button
  onClick={handleCopy}
  className="ml-4 text-gray-500 hover:text-green-600 transition"
  aria-label="Copiar texto"
>
  {copied ? "✔ Copiado" : "📋 Copiar"}
</button>

      </div>
      {copied && (
        <p className="mt-2 text-sm text-green-500">Texto copiado al portapapeles</p>
      )}

<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <Image src={instagram} alt="instagram-icon" className="w-[4rem] mt-5 text-white"/>
        </a>
        <a href="https://instagram.com" className="text-xl text-black mt-5">https://instagram.com/elquebuscaencuentra.surf</a>
    </div>
  );
};

export default PedidoExito;
