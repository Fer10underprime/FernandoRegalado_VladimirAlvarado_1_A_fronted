// js/controllers/api-controller.js

// Importar el Service
import { obtenerClientes, crearCliente, actualizarCliente, eliminarCliente } from './indexController.js';
import { obtenerVehiculo, obtenerVehiculoId} from '../services/vehiculoService.js';


const from = document.getElementById("txtEmail");
const exampleModal = document.getElementById("exampleModal");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const txtEmail = document.getElementById("txtCompleto");
const txtNombre = document.getElementById("txtVehiculo");
const txtApellido = document.getElementById("txtFecha");
const txtTelefeno = document.getElementById("txtPasajeros");
const txtDias = document.getElementById("txtDias");
const txtPagar = document.getAnimations("txtPagar");
const btnCancelar = document.getElementById("btnCancelar");
const btnAgregarCliente = document.getElementById("btnAgregarCliente");
const tbIndex = document.getElementById("tbIndex");
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
        <td> ${txtTelefeno.id}</td>
        <td>
        <button class = "btn btn-sm btn-warning" id="btnEditar" > Editar </button>
        <button class = "btn btn-sm btn-danger" id="btnEliminar" > Eliminar </button>
        </td>
        `;
        tbIndex.appendChild(fila)
    });
}

function limpiarFormulario(){
    from.reset();
    idInput.value = "";
}

from.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = {
        email: emailInput.value,
        nombre: nombreInput.value,
        apellido: nombreInput.value,
        telefono: nombreInput.value,
    };
});

btnCancelar.addEventListener("click", limpiarFormulario);

renderTabla.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if(!id) return;

    if(id.target.classList.contains("btnEditar")){
        const email = await obtenerClientes();
        const reservar = reservar.find((r) => String (r.id) === String(rd));

        if(id.target.classList. contains("btnEditar")){
            idInput.value = reservar.id;
            nombreInput.value = reservar.nombre;
            apellidoInput.value = reservar.apellido;
            telefonoInput.value = reservar.telefono;
        }
    }
})

if(e.target.classList.contains("btnEliminar")){
    if(!confirm ("Eliminar esta reserva"))
    try{
        await eliminarCliente(id);
        await cargarClientes();
    } catch (error){
        console.error(error);
        alert("No se puede eliminar la reserva");
    }
};

cargarClientes();

async function guardarCambios(email, nombre, apellido, telefono) {
    const postActualzado = await actualizarCliente(email, nombre, apellido, telefono);
    console.log('Guardado: ', postActualzado);
}

async function borrar(id) {
    await eliminarCliente(id);
    console.log(`Post ${id} eliminado de la API.`);
}

cargarClientes();