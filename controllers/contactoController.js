const nodemailer = require('nodemailer');
require('dotenv').config();

const EMAIL_TO = process.env.EMAIL_TO;
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PASS
    }
});

const enviarCorreo = async (req, res) => {
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
        console.error('Error al enviar el correo:', e);
        res.status(500).json({ error: 'Error enviando el correo', detalles: e.message });
    }
};

module.exports = { enviarCorreo };
