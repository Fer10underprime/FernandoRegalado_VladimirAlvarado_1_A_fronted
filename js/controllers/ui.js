// Ayudas de interfaz compartidas por los controllers

// Alerta de Bootstrap dentro del contenedor indicado
export function mostrarAlerta(idContenedor, mensaje, tipo = "success") {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${escapeHtml(mensaje)}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
}

export function limpiarAlerta(idContenedor) {
  document.getElementById(idContenedor).innerHTML = "";
}

// Evita que texto con < > & se interprete como HTML
export function escapeHtml(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
