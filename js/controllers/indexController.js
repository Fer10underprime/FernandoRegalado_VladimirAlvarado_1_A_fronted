// js/controllers/api-controller.js

// Importar el Service
import { obtenerClientes, crearCliente, actualizarCliente, eliminarCliente } from '../services/clientesService';
import { obtenerVehiculo, obtenerVehiculoId} from '../services/vehiculoService';


const from = document.getElementById("txtEmail")

async function cargarClientes() {
  try {
    const posts = await
                obtenerClientes();
    // Actualizar el DOM con los posts
    mostrarEnPagina(posts);
  } catch
                (error) {
    mostrarError(error.message);
  }
}

function mostrarEnPagina(posts)
                {
  const lista = document.getElementById('postsList');
  posts.forEach(post => {
    const div =
                document.createElement('div');
    div.textContent = post.title;
    lista.appendChild(div);
  });
} 

function renderTabla(clientes){
    tbIndex.innerHTML = "";
    clientes.forEach((clientes) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td> ${txtEmail.id}</td>
        <td> ${txtNombre.id}</td>
        <td> ${txtApellido.id}</td>
        <td> ${txtApellido.id}</td>
        <td>
        <button class = "btn btn-sm btn-warning" id="btnEditar" > Editar </button>
        <button class = "btn btn-sm btn-danger" id="btnEliminar" > Eliminar </button>
        </td>
        `;
        tbIndex.appendChild(fila)
    });
}