// Controller de Clientes: maneja el DOM y consume clientesService
import { obtenerClientes, crearCliente, actualizarCliente, eliminarCliente } from "../services/clientesService.js";
import { mostrarAlerta, limpiarAlerta, escapeHtml } from "./ui.js";

const exampleModal = document.getElementById("exampleModal");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const formCliente = document.getElementById("formCliente");
const txtEmail = document.getElementById("txtEmail");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtTelefeno = document.getElementById("txtTelefeno");
const txtDireccion = document.getElementById("txtDireccion");
const btnNuevo = document.getElementById("btnNuevo");
const btnAgregarCliente = document.getElementById("btnAgregarCliente");
const tbIndex = document.getElementById("tbIndex");

const modal = bootstrap.Modal.getOrCreateInstance(exampleModal);
let clientes = [];
let idEditando = null;

async function cargarClientes() {
  try {
    const respuesta = await obtenerClientes();
    clientes = respuesta.data;
    renderTabla(clientes);
  } catch (error) {
    mostrarAlerta("alertas", error.message, "danger");
  }
}

function renderTabla(lista) {
  tbIndex.innerHTML = "";
  lista.forEach((c) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${c.idCliente}</td>
      <td>${escapeHtml(c.email)}</td>
      <td>${escapeHtml(c.nombre)}</td>
      <td>${escapeHtml(c.apellido)}</td>
      <td>${escapeHtml(c.telefono)}</td>
      <td>${escapeHtml(c.direccion)}</td>
      <td>
        <button class="btn btn-sm btn-warning btn-editar" data-id="${c.idCliente}">Editar</button>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${c.idCliente}">Eliminar</button>
      </td>`;
    tbIndex.appendChild(fila);
  });
}

function limpiarFormulario() {
  formCliente.reset();
  idEditando = null;
  exampleModalLabel.textContent = "Agrega clientes";
  btnAgregarCliente.textContent = "Agregar cliente";
  limpiarAlerta("alertaModal");
}

// Validaciones antes de enviar; devuelve el mensaje de error o null
function validar(cliente) {
  if (!cliente.email || !cliente.nombre || !cliente.apellido || !cliente.telefono) {
    return "Email, nombre, apellido y teléfono son obligatorios";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
    return "El email no tiene un formato válido";
  }
  return null;
}

async function guardar() {
  const cliente = {
    email: txtEmail.value.trim(),
    nombre: txtNombre.value.trim(),
    apellido: txtApellido.value.trim(),
    telefono: txtTelefeno.value.trim(),
    direccion: txtDireccion.value.trim()
  };

  const errorValidacion = validar(cliente);
  if (errorValidacion) {
    mostrarAlerta("alertaModal", errorValidacion, "warning");
    return;
  }

  try {
    const respuesta = idEditando
      ? await actualizarCliente(idEditando, cliente)
      : await crearCliente(cliente);
    modal.hide();
    mostrarAlerta("alertas", respuesta.message, "success");
    await cargarClientes();
  } catch (error) {
    mostrarAlerta("alertaModal", error.message, "danger");
  }
}

function editar(id) {
  const c = clientes.find((x) => String(x.idCliente) === String(id));
  if (!c) return;
  limpiarFormulario();
  idEditando = c.idCliente;
  txtEmail.value = c.email;
  txtNombre.value = c.nombre;
  txtApellido.value = c.apellido;
  txtTelefeno.value = c.telefono;
  txtDireccion.value = c.direccion === "SIN ESPECIFICAR" ? "" : c.direccion;
  exampleModalLabel.textContent = "Editar cliente";
  btnAgregarCliente.textContent = "Guardar cambios";
  modal.show();
}

async function eliminar(id) {
  if (!confirm("¿Eliminar este cliente?")) return;
  try {
    const respuesta = await eliminarCliente(id);
    mostrarAlerta("alertas", respuesta.message, "success");
    await cargarClientes();
  } catch (error) {
    mostrarAlerta("alertas", error.message, "danger");
  }
}

btnNuevo.addEventListener("click", limpiarFormulario);
btnAgregarCliente.addEventListener("click", guardar);

tbIndex.addEventListener("click", (e) => {
  const boton = e.target.closest("button");
  if (!boton) return;
  if (boton.classList.contains("btn-editar")) editar(boton.dataset.id);
  if (boton.classList.contains("btn-eliminar")) eliminar(boton.dataset.id);
});

cargarClientes();
