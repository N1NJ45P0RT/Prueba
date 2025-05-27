import { showToast } from './toast.js';

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
    });
}

export { copyEmail, copyAllEmails };
window.copyAllEmails = copyAllEmails;
