function generarIdSpan(archivo) {
    const mapeoIds = {
        'Windows-10.iso': 'descargas-w10',
        'Windows-11.iso': 'descargas-w11',
        'Windows-2019-Server.iso': 'descargas-w19',
        'ubuntu-24.04.1-desktop-amd64.iso': 'descargas-u24d',
        'ubuntu-24.04.1-live-server-amd64.iso': 'descargas-u24s',
        'ubuntu-20.04.6-desktop-amd64.iso': 'descargas-u20d',
        'ubuntu-20.04.6-live-server-amd64.iso': 'descargas-u20s',
        'drbl-live-xfce-2.5.1-16-amd64.iso': 'descargas-drbl',
        'Cisco-Packet-Tracer-6.0.1.exe': 'descargas-pt'
    };
    return mapeoIds[archivo] || null;
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
            const spanId = generarIdSpan(archivo);
            const spanDescargas = document.getElementById(spanId);
            if (spanDescargas) {
                spanDescargas.textContent = data.total;
            }
        }
    } catch (e) {
        showToast('Error al registrar descarga');
    }
}

async function cargarDescargasGlobales() {
    try {
        const response = await fetch('/2smr/api/descargas');
        if (!response.ok) {
            return;
        }
        const data = await response.json();
        Object.keys(data).forEach(archivo => {
            const spanId = generarIdSpan(archivo);
            const spanDescargas = document.getElementById(spanId);
            if (spanDescargas) {
                spanDescargas.textContent = data[archivo];
            }
        });
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
    cargarDescargasGlobales();
};

window.incrementDownload = incrementDownload;

export { generarIdSpan, incrementarDescargaGlobal, cargarDescargasGlobales, incrementDownload };
