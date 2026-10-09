//Import del url
//FALTA
const API_URL = "";



//GET
async function obtenerClientes() {
    // Paso 1: esperar la respuesta del servidor
    const response = await fetch('https://api.ejemplo.com/usuarios');
  
    // Verificar que no hubo error HTTP (404, 500, etc.)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
  
    // Paso 2: convertir el JSON en un objeto de JavaScript
    const clientes = await response.json();
  
    console.log(clientes); // arreglo de objetos
    return clientes;
  }
  
  obtenerClientes();


  //POST
  async function crearCliente(email, nombre, apellido, telefono) {
    const response = await fetch('https://api.ejemplo.com/usuarios', {
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
  
  crearCliente();


  //PUT
  async function actualizarCliente(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
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
  
    const clienteActualizado = await response.json();
    console.log(clienteActualizado);
    return clienteActualizado;
  }
  
  actualizarCliente();


  //DELETE
  async function eliminarCliente(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
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