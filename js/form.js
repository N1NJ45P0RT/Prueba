import { showToast } from './toast.js';

function enviarSugerencia(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        showToast('Por favor, escribe un correo real para poder responderte.');
        document.getElementById('correo').focus();
        return;
    }

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

const correoInput = document.getElementById('correo');
// Eliminar la visualización del mensaje al cargar la página
correoInput.setCustomValidity('');
correoInput.addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Mostrar el mensaje desde la primera letra
    if (correoInput.value.length === 0 || !emailRegex.test(correoInput.value)) {
        correoInput.setCustomValidity('Por favor, escribe un correo real para poder responderte.');
        if (correoInput.value.length > 0) {
            correoInput.reportValidity();
        }
    } else {
        correoInput.setCustomValidity('');
    }
});
// Forzar mostrar el mensaje al escribir la primera letra
correoInput.addEventListener('invalid', function() {
    correoInput.reportValidity();
});

// Exportar la función como módulo
export { enviarSugerencia };
window.enviarSugerencia = enviarSugerencia;