// Controller de Reservas (index.html): maneja el DOM y consume los Services
import { obtenerReservas, crearReserva, actualizarReserva, eliminarReserva } from "../services/reservasService.js";
import { obtenerClientes } from "../services/clientesService.js";
import { obtenerVehiculo } from "../services/vehiculoService.js";
import { mostrarAlerta, limpiarAlerta, escapeHtml } from "./ui.js";

const exampleModal = document.getElementById("exampleModal");
const exampleModalLabel = document.getElementById("exampleModalLabel");
const formReserva = document.getElementById("formReserva");
const txtCompleto = document.getElementById("txtCompleto");
const txtVehiculo = document.getElementById("txtVehiculo");
const txtNombreReserva = document.getElementById("txtNombreReserva");
const txtFecha = document.getElementById("txtFecha");
const txtPasajeros = document.getElementById("txtPasajeros");
const txtDias = document.getElementById("txtDias");
const txtPagar = document.getElementById("txtPagar");
const txtestadoActual = document.getElementById("txtestadoActual");
const btnNuevo = document.getElementById("btnNuevo");
const btnAgregarReservas = document.getElementById("btnAgregarReservas");
const tbReservas = document.getElementById("tbReservas");

const modal = bootstrap.Modal.getOrCreateInstance(exampleModal);
let reservas = [];
let idEditando = null;

// Llena los <select> de cliente y vehículo desde la API
async function cargarSelects() {
  try {
    const [resClientes, resVehiculos] = await Promise.all([obtenerClientes(), obtenerVehiculo()]);

    txtCompleto.innerHTML = '<option value="">Seleccione un cliente</option>' +
      resClientes.data.map((c) =>
        `<option value="${c.idCliente}">${escapeHtml(c.nombre + " " + c.apellido)}</option>`).join("");

    txtVehiculo.innerHTML = '<option value="">Seleccione un vehículo</option>' +
      resVehiculos.data.map((v) =>
        `<option value="${v.idVehiculo}">${escapeHtml(`${v.marca} ${v.modelo} (${v.placa}) - cap. ${v.capacidad} - $${Number(v.precioDia).toFixed(2)}/día`)}</option>`).join("");
  } catch (error) {
    mostrarAlerta("alertas", error.message, "danger");
  }
}

async function cargarReservas() {
  try {
    const respuesta = await obtenerReservas();
    reservas = respuesta.data;
    renderTabla(reservas);
  } catch (error) {
    mostrarAlerta("alertas", error.message, "danger");
  }
}

function renderTabla(lista) {
  tbReservas.innerHTML = "";
  lista.forEach((r) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${r.idReserva}</td>
      <td>${escapeHtml(r.nombreCliente)}</td>
      <td>${escapeHtml(r.vehiculo)}</td>
      <td>${escapeHtml(r.fechaReserva)}</td>
      <td>${r.cantidadPasajeros}</td>
      <td>${r.cantidadDias}</td>
      <td>$${Number(r.totalPago).toFixed(2)}</td>
      <td>${escapeHtml(r.estado)}</td>
      <td>
        <button class="btn btn-sm btn-warning btn-editar" data-id="${r.idReserva}">Editar</button>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${r.idReserva}">Eliminar</button>
      </td>`;
    tbReservas.appendChild(fila);
  });
}

function limpiarFormulario() {
  formReserva.reset();
  idEditando = null;
  txtPagar.value = "";
  // Al crear, la API siempre la deja CONFIRMADA
  txtestadoActual.value = "CONFIRMADA";
  txtestadoActual.disabled = true;
  exampleModalLabel.textContent = "Agrega reservas";
  btnAgregarReservas.textContent = "Agregar reservas";
  limpiarAlerta("alertaModal");
}

async function guardar() {
  if (!formReserva.reportValidity()) return;

  const reserva = {
    idCliente: Number(txtCompleto.value),
    idVehiculo: Number(txtVehiculo.value),
    nombreReserva: txtNombreReserva.value.trim(),
    fechaReserva: txtFecha.value,
    cantidadPasajeros: Number(txtPasajeros.value),
    cantidadDias: Number(txtDias.value)
  };
  if (!reserva.nombreReserva) {
    mostrarAlerta("alertaModal", "El nombre de la reserva es obligatorio", "warning");
    return;
  }
  if (reserva.cantidadPasajeros < 1 || reserva.cantidadDias < 1) {
    mostrarAlerta("alertaModal", "Pasajeros y días deben ser al menos 1", "warning");
    return;
  }

  try {
    let respuesta;
    if (idEditando) {
      reserva.estado = txtestadoActual.value;
      respuesta = await actualizarReserva(idEditando, reserva);
    } else {
      respuesta = await crearReserva(reserva);
    }
    modal.hide();
    mostrarAlerta("alertas", respuesta.message, "success");
    await cargarReservas();
  } catch (error) {
    mostrarAlerta("alertaModal", error.message, "danger");
  }
}

function editar(id) {
  const r = reservas.find((x) => String(x.idReserva) === String(id));
  if (!r) return;
  limpiarFormulario();
  idEditando = r.idReserva;
  txtCompleto.value = r.idCliente;
  txtVehiculo.value = r.idVehiculo;
  txtNombreReserva.value = r.nombreReserva;
  txtFecha.value = r.fechaReserva;
  txtPasajeros.value = r.cantidadPasajeros;
  txtDias.value = r.cantidadDias;
  txtPagar.value = Number(r.totalPago).toFixed(2);
  txtestadoActual.disabled = false;
  txtestadoActual.value = r.estado;
  exampleModalLabel.textContent = "Editar reserva";
  btnAgregarReservas.textContent = "Guardar cambios";
  modal.show();
}

async function eliminar(id) {
  if (!confirm("¿Eliminar esta reserva?")) return;
  try {
    const respuesta = await eliminarReserva(id);
    mostrarAlerta("alertas", respuesta.message, "success");
    await cargarReservas();
  } catch (error) {
    mostrarAlerta("alertas", error.message, "danger");
  }
}

btnNuevo.addEventListener("click", limpiarFormulario);
btnAgregarReservas.addEventListener("click", guardar);

tbReservas.addEventListener("click", (e) => {
  const boton = e.target.closest("button");
  if (!boton) return;
  if (boton.classList.contains("btn-editar")) editar(boton.dataset.id);
  if (boton.classList.contains("btn-eliminar")) eliminar(boton.dataset.id);
});

limpiarFormulario();
cargarSelects();
cargarReservas();
