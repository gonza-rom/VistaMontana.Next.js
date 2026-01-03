"use client";

import Link from "next/link";
import { useState } from "react";

export default function AlquilerCard({ alquiler }) {
  const [imgError, setImgError] = useState(false);

  const SUPABASE_STORAGE_URL =
  "https://wevedxzldtanroyshimn.supabase.co/storage/v1/object/public/vistamontana";
  let imagenPrincipal =
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vistamontana/logo-montana.png`;

  if (alquiler.fotos) {
  try {
    const fotosArray =
      typeof alquiler.fotos === "string"
        ? JSON.parse(alquiler.fotos)
        : alquiler.fotos;

    if (Array.isArray(fotosArray) && fotosArray.length > 0) {
      imagenPrincipal = `${SUPABASE_STORAGE_URL}/${fotosArray[0]}`;
    }
  } catch (e) {
    console.error("Error parseando fotos:", e);
  }
}

  return (
    <Link
      href={`/alquileres/${alquiler.id}`}
      className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
    >
      {/* IMAGEN */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={imgError ? "/logo-montana.png" : imagenPrincipal}
          alt={alquiler.nombre}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>

      {/* CONTENIDO */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold mb-2">{alquiler.nombre}</h3>
        <p className="text-gray-600 mb-4">
          Capacidad máxima: {alquiler.capacidad_maxima} personas
        </p>
        <p className="text-xl font-bold text-green-600">${alquiler.precio}</p>
      </div>
    </Link>
  );
}
