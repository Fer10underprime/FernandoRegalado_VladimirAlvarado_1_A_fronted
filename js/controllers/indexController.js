// js/controllers/api-controller.js

// Importar el Service
import { obtenerReservas, crearReservas, actualizarReservas, eliminarReservas } from '../services/clientesService';
import { obtenerVehiculo, obtenerVehiculoId} from '../services/vehiculoService';


const from = document.getElementById("txtEmail");
const exampleModal = document.getElementById("exampleModal");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const txtEmail = document.getElementById("txtCompleto");
const txtNombre = document.getElementById("txtVehiculo");
const txtApellido = document.getElementById("txtFecha");
const txtTelefeno = document.getElementById("txtPasajeros");
const txtDias = document.getElementById("txtDias");
const txtPagar = document.getElementById("txtPagar");
const txtestadoActual = document.getElementById("txtestadoActual");
const btnCancelar = document.getElementById("btnCancelar");
const btnAgregarReservas = document.getElementById("btnAgregarReservas");
const tbReservas = document.getElementById("tbReservas");

async function cargarReservas() {
  try {
    const posts = await
                obtenerReservas();
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

function renderTabla(reservar){
    tbReservas.innerHTML = "";
    reservar.forEach((reservar) => {
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
        txtestadoActual: txtestadoActual.value,
    };
});

btnCancelar.addEventListener("click", limpiarFormulario);

renderTabla.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if(!id) return;

    if(id.target.classList.contains("btnEditar")){
        const email = await obtenerReservas();
        const reservar = reservar.find((r) => String (r.id) === String(rd));

        if(id.target.classList. contains("btnEditar")){
            txtCompleto.value = reservar.txtCompleto;
            txtVehiculo.value = reservar.txtVehiculo;
            apellidoInput.value = reservar.txtApellido;
            telefonoInput.value = reservar.txtTelefeno;
            txtDias.value = renderTabla
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