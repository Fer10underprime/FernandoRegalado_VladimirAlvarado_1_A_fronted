//Import del url
//FALTA
const API_URL = "localhost8080:/api/reservas";


//GET
async function obtenerReservas() {
    // Paso 1: esperar la respuesta del servidor
    const response = await fetch('localhost8080:/api/reservas');
  
    // Verificar que no hubo error HTTP (404, 500, etc.)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  
    // Paso 2: convertir el JSON en un objeto de JavaScript
    const reservas = await response.json();
  
    console.log(reservas); // arreglo de objetos
    return reservas;
  }
  
  obtenerReservas();


  //POST
  async function crearReservas(Completo, Vehiculo, Fecha, Pasajeros, Dias, Pagar, estadoActual) {
    const response = await fetch('localhost8080:/api/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  // le decimos al servidor que enviamos JSON
      },
      body: JSON.stringify({ Completo, Vehiculo, Fecha, Pasajeros, Dias, Pagar, estadoActual }) // convertimos el objeto a texto JSON
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    const crearReservas = await response.json();
    console.log('Creado con ID:', crearReservas.id);
    return crearReservas;
  }
  
  crearReservas();


  //PUT
  async function actualizarReservas(id) {
    const response = await fetch(`localhost8080:/api/reservas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
        title: 'Título completamente nuevo',
        body: 'Contenido completamente nuevo',
        userId: 1
      })
    });
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  
    const reservaActualizada = await response.json();
    console.log(reservaActualizada);
    return reservaActualizada;
  }
  
  actualizarReservas();


  //DELETE
  async function eliminarReservas(id) {
    const response = await fetch(`localhost8080:/api/reservas/${id}`, {
      method: 'DELETE'
      // DELETE no lleva headers ni body
    });
  
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  
    // 204 → éxito sin contenido; no llamamos .json()
    if (response.status === 204) {
      console.log(`Post ${id} eliminado.`);
      return null;
    }
  
    const reservaEliminada = await response.json();
    return reservaEliminada;
  }
  
  eliminarReservas();