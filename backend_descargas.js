// backend_descargas.js
// Backend Node.js para conteo global de descargas y recepción de formularios de contacto

const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3001;
const COUNTS_FILE = path.join(__dirname, 'descargas.json');

app.use(express.json());
app.use(express.static(__dirname));

// Inicializar archivo si no existe
if (!fs.existsSync(COUNTS_FILE)) {
    fs.writeFileSync(COUNTS_FILE, JSON.stringify({}), 'utf8');
}

// Obtener conteos
app.get('/2smr/api/descargas', (req, res) => {
    const data = fs.readFileSync(COUNTS_FILE, 'utf8');
    res.json(JSON.parse(data));
});

// Incrementar conteo
app.post('/2smr/api/descargas', (req, res) => {
    const { archivo } = req.body;
    if (!archivo) return res.status(400).json({ error: 'Archivo requerido' });
    let data = JSON.parse(fs.readFileSync(COUNTS_FILE, 'utf8'));
    data[archivo] = (data[archivo] || 0) + 1;
    fs.writeFileSync(COUNTS_FILE, JSON.stringify(data), 'utf8');
    res.json({ ok: true, total: data[archivo] });
});

// --- FORMULARIO DE CONTACTO ---
// Configura aquí tu email y contraseña de aplicación
const EMAIL_TO = process.env.EMAIL_TO; 
const EMAIL_FROM = process.env.EMAIL_FROM; 
const EMAIL_PASS = process.env.EMAIL_PASS; 

const transporter = nodemailer.createTransport({
    service: 'gmail', // O el servicio que uses
    auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PASS
    }
});

app.post('/2smr/api/contacto', async (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    if (!nombre || !correo || !mensaje) {
        return res.status(400).json({ error: 'Faltan campos' });
    }
    try {
        await transporter.sendMail({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: `Nuevo mensaje de contacto de ${nombre}`,
            text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`
        });
        res.json({ ok: true });
    } catch (e) {
        console.error('Error al enviar el correo:', e); // Log detallado
        res.status(500).json({ error: 'Error enviando el correo', detalles: e.message });
    }
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor escuchando en http://127.0.0.1:${PORT}`);
});
