// Utilidad común de los Services: única que hace fetch. No toca el DOM.
export const API_URL = "http://localhost:8080/api";

export const opcionesJson = (method, data) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});

// Devuelve el ApiResponse { success, status, message, data }.
// Si la API responde con error lanza un Error con el mensaje legible del servidor.
export async function peticion(ruta, opciones = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${ruta}`, opciones);
  } catch (error) {
    throw new Error("No se pudo conectar con el servidor. Verifique que la API esté encendida.");
  }

  let cuerpo = null;
  try {
    cuerpo = await response.json();
  } catch (error) {
    // respuesta sin JSON
  }

  if (!response.ok) {
    throw new Error(cuerpo?.message ?? `Error HTTP ${response.status}`);
  }
  return cuerpo;
}
