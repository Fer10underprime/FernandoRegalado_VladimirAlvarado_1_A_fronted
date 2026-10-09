// js/controllers/api-controller.js

// Importar el Service
import { obtenerReservas, crearReservas, actualizarReservas, eliminarReservas } from '../services/reservasService';
import { obtenerVehiculo, obtenerVehiculoId} from '../services/vehiculoService';


const from = document.getElementById("txtEmail");
const exampleModal = document.getElementById("exampleModal");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const txtEmail = document.getElementById("txtEmail");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtTelefeno = document.getElementById("txtTelefeno");
const btnCancelar = document.getElementById("btnCancelar");
const txtDias = document.getElementById("txtDias");

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
        <td> ${txtCompleto.id}</td>
        <td> ${txtVehiculo.id}</td>
        <td> ${txtFecha.id}</td>
        <td> ${txtPasajeros.id}</td>
        <td> ${txtDias.id}</td>
        <td> ${txtPagar.id}</td>
        <td> ${txtestadoActual.id}</td>
        <td> ${btnCancelar.id}</td>
        <td> ${btnAgregarReservas.id}</td>
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
        txtCompleto: txtCompletoInput.value,
        txtVehiculo: txtVehiculoInput.value,
        txtFecha: txtFechaInput.value,
        txtPasajeros: txtPasajeros.value,
        txtDias: txtDiasInput.value,
        txtPagar: txtPagarInput.value,
        txtestadoActual: txtestadoActual.value
    };
});

btnCancelar.addEventListener("click", limpiarFormulario);

renderTabla.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if(!id) return;

    if(id.target.classList.contains("btnEditar")){
        const email = await obtenerReservas();
        const clientes = clientes.find((r) => String (r.id) === String(rd));

        if(id.target.classList. contains("btnEditar")){
            txtCompleto.value = reservar.txtCompleto;
            txtVehiculo.value = reservar.txtVehiculo;
            txtApellidoapellidoInput.value = reservar.txtApellido;
            txttelefonoInput.value = reservar.txtTelefeno;
            txtDias.value = reservar.txtDias;
            txtPagar.value = reservar.txtPagar;
        }
    }
})

if(e.target.classList.contains("btnEliminar")){
    if(!confirm ("Eliminar esta reserva")) return;
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