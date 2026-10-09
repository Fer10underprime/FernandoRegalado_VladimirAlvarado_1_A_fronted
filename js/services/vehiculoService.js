//Import del url
//FALTA
const API_URL = "";


//GET
async function obtenerVehiculo() {
    // Paso 1: esperar la respuesta del servidor
    const response = await fetch('https://api.ejemplo.com/usuarios');
  
    // Verificar que no hubo error HTTP (404, 500, etc.)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  
    // Paso 2: convertir el JSON en un objeto de JavaScript
    const vehiculo = await response.json();
  
    console.log(vehiculo); // arreglo de objetos
    return vehiculo;
  }
  
  obtenerVehiculo();


  async function obtenerVehiculoId(id) {
    try {
      const response = await fetch(`https://api.ejemplo.com/posts/${id}`);
  
      if (!response.ok) {
        // Error HTTP → lo lanzamos para que lo capture el catch
        throw new Error(`Error ${response.status}: recurso no encontrado`);
      }
  
      const post = await response.json();
      return post;
  
    } catch (error) {
      // Captura errores de red Y errores HTTP
      console.error('Falló la solicitud:', error.message);
    }
  }