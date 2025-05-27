import { showToast } from './toast.js';

function enviarSugerencia(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    fetch('/2smr/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, mensaje })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) {
            showToast('¡Gracias por tu sugerencia!');
            document.getElementById('nombre').value = '';
            document.getElementById('correo').value = '';
            document.getElementById('mensaje').value = '';
        } else {
            showToast('Error al enviar el formulario');
        }
    })
    .catch(() => showToast('Error al enviar el formulario'));
}

// Exportar la función como módulo
export { enviarSugerencia };
