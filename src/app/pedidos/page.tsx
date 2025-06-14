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
    // Eliminar pedido de la lista
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const handleRejectOrder = (id: string) => {
    alert("Pedido rechazado");
    console.log(`Pedido ${id} rechazado.`);
    // Eliminar pedido de la lista
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral */}
      <div className="w-64 bg-indigo-700 text-white p-6">
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
                <div className="flex overflow-x-auto gap-6 py-4 scrollbar-thin scrollbar-thumb-indigo-600">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gray-800 rounded-xl p-6 w-80 min-w-[18rem] shadow-lg hover:shadow-2xl transition duration-300"
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

                      <div className="flex justify-around gap-3">
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
                        >
                          <FaCheckCircle /> Aceptar
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order.id)}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
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

        {/* Podés agregar aquí el contenido para "subir" y "editar" si querés luego */}
      </main>
    </div>
  );
};

export default PedidosPage;
