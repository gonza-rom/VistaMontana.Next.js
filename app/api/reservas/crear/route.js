import { supabase } from "@/lib/supabase-server";

export async function POST(req) {
  const body = await req.json();

  const {
    alojamiento_id,
    fecha_entrada,
    fecha_salida,
    nombre,
    email,
    telefono,
    cantidad_personas,
  } = body;

  // 1️⃣ Obtener alojamiento
  const { data: alojamiento } = await supabase
    .from("alojamientos")
    .select("*")
    .eq("id", alojamiento_id)
    .single();

  if (!alojamiento) {
    return Response.json({ error: "Alojamiento no encontrado" }, { status: 404 });
  }

  // 2️⃣ Determinar IDs a bloquear
  let idsBloqueados = [];

  if (alojamiento.tipo === "casa") {
    const { data: hijos } = await supabase
      .from("alojamientos")
      .select("id")
      .eq("padre_id", alojamiento.id);

    idsBloqueados = [alojamiento.id, ...hijos.map((h) => h.id)];
  } else {
    idsBloqueados = [alojamiento.id, alojamiento.padre_id];
  }

  // 3️⃣ Verificar disponibilidad
    const { data: reservasExistentes, error: errorReservas } = await supabase
    .from("reservas")
    .select("id")
    .in("alojamiento_id", idsBloqueados)
    .neq("estado", "cancelada")
    .lt("fecha_entrada", fecha_salida)
    .gt("fecha_salida", fecha_entrada);

    if (errorReservas) {
    console.error("Error verificando reservas:", errorReservas);
    return Response.json({ error: "Error verificando disponibilidad" }, { status: 500 });
    }

    if (reservasExistentes && reservasExistentes.length > 0) {
    return Response.json(
        { error: "No disponible en esas fechas" },
        { status: 409 }
    );
    }

  // 4️⃣ Calcular total
  const noches =
    (new Date(fecha_salida) - new Date(fecha_entrada)) /
    (1000 * 60 * 60 * 24);

  const total = noches * alojamiento.precio_por_noche;

  // 5️⃣ Crear reserva
  const { data: reserva, error } = await supabase
    .from("reservas")
    .insert({
      alojamiento_id,
      nombre_cliente: nombre,
      email_cliente: email,
      telefono_cliente: telefono,
      fecha_entrada,
      fecha_salida,
      cantidad_personas,
      total,
      estado: "pendiente",
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({
    ok: true,
    reserva_id: reserva.id,
    total,
  });
}
