# Proyecto de Descargas y Contacto

Este proyecto es una aplicación web que permite gestionar descargas de archivos y recibir formularios de contacto. Está construido con Node.js en el backend y utiliza JavaScript en el frontend para la interacción del usuario.

## Estructura del Proyecto

### Archivos Principales

- **backend_descargas.js**: Archivo principal del backend que configura el servidor Express, define las rutas para descargas y formularios de contacto, y escucha en el puerto 3001.
- **index.html**: Archivo HTML principal que sirve como interfaz de usuario.
- **styles.css**: Archivo de estilos CSS para la interfaz de usuario.
- **script.js**: Archivo principal de JavaScript que importa y utiliza módulos para manejar la lógica del frontend.

### Carpetas

#### `controllers/`
- **contactoController.js**: Controlador para manejar la lógica del formulario de contacto.
- **descargasController.js**: Controlador para manejar la lógica de las descargas.

#### `routes/`
- **contacto.js**: Define las rutas relacionadas con el formulario de contacto.
- **descargas.js**: Define las rutas relacionadas con las descargas.

#### `js/`
- **buttons.js**: Maneja la lógica de los botones y las listas de descargas.
- **darkMode.js**: Contiene la lógica para habilitar y deshabilitar el modo oscuro.
- **downloads.js**: Maneja la lógica de generación de IDs y las descargas globales.
- **emailList.js**: Ajusta el ancho de los elementos de la lista de correos.
- **emails.js**: Funciones relacionadas con la copia de correos electrónicos.
- **form.js**: Maneja el envío del formulario de sugerencias.
- **toast.js**: Muestra notificaciones tipo "toast" al usuario.

### Otros Archivos
- **descargas.json**: Archivo JSON que almacena datos relacionados con las descargas.
- **env.env**: Archivo de configuración para variables de entorno.
- **ico.png**: Icono utilizado en la interfaz.

## Configuración de Node.js y npm

1. **Instalar Node.js y npm**:
   - Descarga e instala Node.js desde su [sitio oficial](https://nodejs.org/). Esto también instalará npm (Node Package Manager).
   - Verifica la instalación ejecutando los siguientes comandos en tu terminal:
     ```bash
     node -v
     npm -v
     ```
     Esto debería mostrar las versiones instaladas de Node.js y npm.

2. **Configurar el proyecto**:
   - Asegúrate de estar en el directorio raíz del proyecto.
   - Ejecuta el siguiente comando para instalar las dependencias necesarias:
     ```bash
     npm install
     ```

3. **Configurar variables de entorno**:
   - Crea un archivo `.env` en el directorio raíz del proyecto.
   - Copia el contenido del archivo `env.example` al archivo `.env` y ajusta los valores según sea necesario.

4. **Iniciar el servidor**:
   - Ejecuta el siguiente comando para iniciar el servidor:
     ```bash
     node backend_descargas.js
     ```
   - La aplicación estará disponible en `http://127.0.0.1:3001`.

Si encuentras problemas durante la configuración, asegúrate de que las versiones de Node.js y npm sean compatibles con el proyecto.

## Uso

- Accede a la aplicación en `http://127.0.0.1:3001`.
- Utiliza la interfaz para descargar archivos y enviar formularios de contacto.

## Dependencias

- **Express**: Framework para construir el servidor backend.
- **dotenv**: Para manejar variables de entorno.

## Autor
Este proyecto fue desarrollado por N1NJ45P0RT. Si tienes preguntas o sugerencias, no dudes en contactarme.