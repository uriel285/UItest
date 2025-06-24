"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PedidosPage = () => {
  const [activeMenu, setActiveMenu] = useState("pedidos");

  const [orders, setOrders] = useState([
    {
      id: "1",
      description: "#00002, Uriel",
      imageUrl: "/dsc.jpg",
    },
    {
      id: "2",
      description: "#00003, Cliente2",
      imageUrl: "/dsc2.jpg",
    },
    {
      id: "3",
      description: "#00004, Cliente3",
      imageUrl: "/dsc3.jpg",
    },
    {
      id: "4",
      description: "#00005, Cliente4",
      imageUrl: "/dsc.jpg",
    },
  ]);

  const handleAcceptOrder = (id: string) => {
    alert(`El cliente recibirá las imágenes por mail`);
    console.log(`Pedido ${id} aceptado.`);
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const handleRejectOrder = (id: string) => {
    alert("Pedido rechazado");
    console.log(`Pedido ${id} rechazado.`);
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Barra lateral */}
      <div className="lg:w-64 w-full bg-indigo-700 text-white p-6 lg:absolute lg:top-0 lg:left-0 lg:h-full lg:bottom-auto bottom-0 lg:relative">
        <h2 className="text-3xl font-semibold text-center mb-8">Panel de Administración</h2>
        <ul>
          <li
            className="mb-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-600"
            onClick={() => (window.location.href = "/panel")}
          >
            Subir Galería
          </li>
          <li
            className="mb-4 py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-600"
            onClick={() => (window.location.href = "/editar")}
          >
            Editar Galería
          </li>
          <li
            className="mb-4 py-2 px-4 rounded-lg bg-indigo-600 cursor-pointer"
            onClick={() => (window.location.href = "/pedidos")}
          >
            Pedidos
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <main className="flex-1 p-8">
  {activeMenu === "pedidos" && (
    <>
      <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">Pedidos</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Seleccionar Pedido</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-20 text-xl font-medium">
            No hay pedidos pendientes.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 rounded-xl p-6 w-full max-w-xs mx-auto shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="text-center mb-4">
                  <p className="text-xl text-white font-semibold">{order.description}</p>
                </div>

                <div className="mb-4">
                  <Image
                    src={order.imageUrl}
                    alt={`Pedido ${order.id}`}
                    width={300}
                    height={200}
                    className="rounded-lg mx-auto"
                  />
                </div>

                {/* Los botones siempre apilados (uno encima del otro) */}
                <div className="flex flex-col gap-4 mt-4 justify-center">
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 w-full"
                  >
                    <FaCheckCircle /> Aceptar
                  </button>
                  <button
                    onClick={() => handleRejectOrder(order.id)}
                    className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 w-full"
                  >
                    <FaTimesCircle /> Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )}
</main>


    </div>
  );
};

export default PedidosPage;
