async function obtenerMapeoIds() {
    try {
        const enlaces = document.querySelectorAll('a[href][download]'); // Seleccionar todos los enlaces de descarga
        const mapeoIds = {};
        enlaces.forEach(enlace => {
            const archivo = enlace.getAttribute('href').split('/').pop(); // Obtener el nombre del archivo
            const id = `descargas-${archivo.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`; // Reemplazar caracteres no alfanuméricos por guiones
            mapeoIds[archivo] = id;
        });
        return mapeoIds;
    } catch (e) {
        console.error('Error al obtener el mapeo de IDs:', e);
        return {};
    }
}

async function generarIdSpan(archivo) {
    if (!window.mapeoIds) {
        window.mapeoIds = await obtenerMapeoIds(); // Generar el mapeo dinámicamente
    }
    return window.mapeoIds[archivo] || null;
}

async function incrementarDescargaGlobal(archivo, span) {
    try {
        const response = await fetch('/2smr/api/descargas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ archivo })
        });
        if (!response.ok) {
            showToast('Error al registrar descarga (servidor)');
            return;
        }
        const data = await response.json();
        if (data.ok) {
            const spanId = await generarIdSpan(archivo); // Asegurarse de esperar el ID generado
            const spanDescargas = document.getElementById(spanId);
            if (spanDescargas) {
                spanDescargas.textContent = data.total; // Actualizar dinámicamente el número de descargas
            } else {
                console.warn(`No se encontró el elemento con ID: ${spanId}`);
            }
        }
    } catch (e) {
        showToast('Error al registrar descarga');
    }
}

async function cargarDescargasGlobales() {
    try {
        if (!window.mapeoIds) {
            window.mapeoIds = await obtenerMapeoIds(); // Generar el mapeo dinámicamente
        }

        const response = await fetch('/descargas.json'); // Asegurarse de usar la ruta correcta
        if (!response.ok) {
            console.error('Error al cargar las descargas globales');
            return;
        }
        const data = await response.json();
        for (const archivo in window.mapeoIds) {
            const spanId = window.mapeoIds[archivo];
            const spanDescargas = document.getElementById(spanId);
            if (spanDescargas) {
                spanDescargas.textContent = data[archivo] || 0; // Mostrar 0 si no hay descargas
            } else {
                console.warn(`No se encontró el elemento con ID: ${spanId}`);
            }
        }
    } catch (e) {
        console.error('Error al cargar las descargas globales:', e);
    }
}

function incrementDownload(link) {
    const href = link.getAttribute('href');
    if (!href) {
        return;
    }
    const archivo = href.substring(href.lastIndexOf('/') + 1);
    const span = document.getElementById(`descargas-${archivo.replace(/\W/g, '').toLowerCase()}`);
    incrementarDescargaGlobal(archivo, span);
}

window.onload = function() {
    cargarDescargasGlobales(); // Cargar los valores dinámicamente al cargar la página
};

window.incrementDownload = incrementDownload;

// Exportar las funciones como módulos
export { generarIdSpan, incrementarDescargaGlobal, cargarDescargasGlobales, incrementDownload };
