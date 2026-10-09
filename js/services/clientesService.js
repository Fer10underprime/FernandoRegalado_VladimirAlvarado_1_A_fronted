//Import del url
//FALTA
const API_URL = "localhost:8080/api/clientes";



//GET
export const crearPost      = (data)        => req(BASE, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});


  //POST
  async function crearCliente() {
    const response = await fetch('localhost:8080/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  // le decimos al servidor que enviamos JSON
      },
      body: JSON.stringify({ email, nombre, apellido, telefono }) // convertimos el objeto a texto JSON
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  
    const nuevoCliente = await response.json();
    console.log('Creado con ID:', nuevoCliente.id);
    return nuevoCliente;
  }

// UPDATE — PUT (reemplazo completo)
export const actualizarCliente = (id, data)    => req(`${BASE}/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});


  //DELETE
  async function eliminarCliente(id) {
    const response = await fetch(`localhost:8080/api/clientes/${id}`, {
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
  
    const clienteEliminado = await response.json();
    return clienteEliminado;
  }
  
  eliminarCliente();