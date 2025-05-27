const fs = require('fs');
const path = require('path');

const COUNTS_FILE = path.join(__dirname, '../descargas.json');

// Inicializar archivo si no existe
if (!fs.existsSync(COUNTS_FILE)) {
    fs.writeFileSync(COUNTS_FILE, JSON.stringify({}), 'utf8');
}

const obtenerConteos = (req, res) => {
    try {
        const data = fs.readFileSync(COUNTS_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error al obtener conteos:', error);
        res.status(500).json({ error: 'Error al obtener conteos' });
    }
};

const incrementarConteo = (req, res) => {
    try {
        const { archivo } = req.body;
        if (!archivo) return res.status(400).json({ error: 'Archivo requerido' });

        let data = JSON.parse(fs.readFileSync(COUNTS_FILE, 'utf8'));
        data[archivo] = (data[archivo] || 0) + 1;
        fs.writeFileSync(COUNTS_FILE, JSON.stringify(data), 'utf8');

        res.json({ ok: true, total: data[archivo] });
    } catch (error) {
        console.error('Error al incrementar conteo:', error);
        res.status(500).json({ error: 'Error al incrementar conteo' });
    }
};

module.exports = { obtenerConteos, incrementarConteo };
