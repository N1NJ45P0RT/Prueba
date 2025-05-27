document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons button');
    const lists = document.querySelectorAll('.download-list');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetList = document.getElementById(button.dataset.target);
            lists.forEach(list => {
                if (list === targetList) {
                    list.classList.toggle('hidden');
                    button.setAttribute('aria-expanded', !list.classList.contains('hidden'));
                } else {
                    list.classList.add('hidden');
                    document.querySelector(`button[data-target="${list.id}"]`).setAttribute('aria-expanded', false);
                }
            });
        });
    });
});

// Al cargar la página, verifica si el modo oscuro está activado en localStorage
window.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});

// Exponer la función toggleDarkMode al ámbito global
window.toggleDarkMode = function() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
};

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2000);
}

function copyEmail(email) {
    navigator.clipboard.writeText(email).then(function() {
        showToast('Correo copiado: ' + email);
    }, function(err) {
        console.error('Error al copiar el correo: ', err);
    });
}

function copyAllEmails() {
    const emailLinks = document.querySelectorAll(".email-list a");
    const emails = Array.from(emailLinks).map(link => link.textContent.trim());
    if (emails.length === 0) {
        showToast("No hay correos para copiar");
        return;
    }
    navigator.clipboard.writeText(emails.join(", ")).then(() => {
        showToast("Todos los correos copiados");
    }).catch(err => {
        console.error("Error al copiar los correos: ", err);
        showToast("Error al copiar los correos");
    });
}

function generarIdSpan(archivo) {
    // Mapeo manual para asegurar que los IDs coincidan con los del HTML
    const mapeoIds = {
        'Windows-10.iso': 'descargas-w10',
        'Windows-11.iso': 'descargas-w11',
        'Windows-2019-Server.iso': 'descargas-w19',
        'ubuntu-24.04.1-desktop-amd64.iso': 'descargas-u24d',
        'ubuntu-24.04.1-live-server-amd64.iso': 'descargas-u24s',
        'ubuntu-20.04.6-desktop-amd64.iso': 'descargas-u20d',
        'ubuntu-20.04.6-live-server-amd64.iso': 'descargas-u20s',
        'drbl-live-xfce-2.5.1-16-amd64.iso': 'descargas-drbl',
        'Cisco-Packet-Tracer-6.0.1.exe': 'descargas-pt' // Actualización para coincidir con el HTML
    };
    return mapeoIds[archivo] || null;
}

async function incrementarDescargaGlobal(archivo, span) {
    try {
        console.log('Intentando registrar descarga para:', archivo); // Depuración
        const response = await fetch('/2smr/api/descargas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ archivo })
        });
        if (!response.ok) {
            console.error('Error en la respuesta del servidor:', response.status, response.statusText);
            showToast('Error al registrar descarga (servidor)');
            return;
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data); // Depuración
        if (data.ok) {
            const spanId = generarIdSpan(archivo);
            const spanDescargas = document.getElementById(spanId);
            if (spanDescargas) {
                spanDescargas.textContent = data.total;
            } else {
                console.warn('No se encontró el span para actualizar:', archivo); // Depuración
            }
        } else {
            console.warn('El servidor no devolvió un estado "ok":', data); // Depuración
        }
    } catch (e) {
        console.error('Error al intentar registrar descarga:', e); // Depuración
        showToast('Error al registrar descarga');
    }
}

async function cargarDescargasGlobales() {
    try {
        console.log('Cargando descargas globales...'); // Depuración
        const response = await fetch('/2smr/api/descargas');
        if (!response.ok) {
            console.error('Error en la respuesta del servidor al cargar descargas:', response.status, response.statusText);
            return;
        }
        const data = await response.json();
        console.log('Datos de descargas globales recibidos:', data); // Depuración

        Object.keys(data).forEach(archivo => {
            const spanId = generarIdSpan(archivo);
            const spanDescargas = document.getElementById(spanId);
            if (spanDescargas) {
                spanDescargas.textContent = data[archivo];
            } else {
                console.warn('No se encontró el span para el archivo:', archivo); // Depuración
            }
        });
    } catch (e) {
        console.error('Error al cargar las descargas globales:', e); // Depuración
    }
}

function incrementDownload(link) {
    const href = link.getAttribute('href');
    if (!href) {
        console.error('El enlace no tiene un atributo href:', link); // Depuración
        return;
    }
    const archivo = href.substring(href.lastIndexOf('/') + 1);
    console.log('Archivo detectado para incrementar descarga:', archivo); // Depuración
    const span = document.getElementById(`descargas-${archivo.replace(/\W/g, '').toLowerCase()}`);
    if (!span) {
        console.warn('No se encontró el span para el archivo:', archivo); // Depuración
    }
    incrementarDescargaGlobal(archivo, span);
}

window.onload = function() {
    cargarDescargasGlobales();
};

document.querySelectorAll('.buttons button').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = btn.dataset.target;
        if (!targetId) {
            console.warn('El botón no tiene un atributo data-target:', btn); // Depuración
            return;
        }
        const target = document.getElementById(targetId);
        if (target) {
            target.style.transition = 'all 0.4s';
        } else {
            console.warn('No se encontró el elemento con el ID especificado en data-target:', targetId); // Depuración
        }
    });
});

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

document.addEventListener("DOMContentLoaded", function() {
    const emailItems = document.querySelectorAll(".email-list li");
    let maxWidth = 0;

    emailItems.forEach(item => {
        const itemWidth = item.offsetWidth;
        if (itemWidth > maxWidth) {
            maxWidth = itemWidth;
        }
    });

    emailItems.forEach(item => {
        item.style.width = `${maxWidth}px`;
    });
});