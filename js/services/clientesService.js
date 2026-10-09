import { peticion, opcionesJson } from "./apiClient.js";

// GET
export async function obtenerClientes() {
  return await peticion("/clientes");
}

// POST
export async function crearCliente(cliente) {
  return await peticion("/clientes", opcionesJson("POST", cliente));
}

// PUT
export async function actualizarCliente(id, cliente) {
  return await peticion(`/clientes/${id}`, opcionesJson("PUT", cliente));
}

// DELETE
export async function eliminarCliente(id) {
  return await peticion(`/clientes/${id}`, { method: "DELETE" });
}
