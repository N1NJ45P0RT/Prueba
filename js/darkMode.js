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

// Exportar la función como módulo
export { toggleDarkMode };
