import { peticion, opcionesJson } from "./apiClient.js";

// GET
export async function obtenerReservas() {
  return await peticion("/reservas");
}

// POST
export async function crearReserva(reserva) {
  return await peticion("/reservas", opcionesJson("POST", reserva));
}

// PUT
export async function actualizarReserva(id, reserva) {
  return await peticion(`/reservas/${id}`, opcionesJson("PUT", reserva));
}

// DELETE
export async function eliminarReserva(id) {
  return await peticion(`/reservas/${id}`, { method: "DELETE" });
}
