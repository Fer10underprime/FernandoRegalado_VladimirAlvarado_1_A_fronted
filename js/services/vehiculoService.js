import { peticion } from "./apiClient.js";

// GET
export async function obtenerVehiculo() {
  return await peticion("/vehiculos");
}

// GET por id
export async function obtenerVehiculoId(id) {
  return await peticion(`/vehiculos/${id}`);
}
