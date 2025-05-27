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
- **env.example**: Archivo de configuración para variables de entorno.
- **ico.png**: Icono utilizado en la interfaz.

## Instalación y Configuración en Linux desde la Terminal

1. **Instala Node.js y npm**  
    Ejecuta en la terminal:
    ```bash
    sudo apt update
    sudo apt install nodejs npm
    ```
    Verifica la instalación:
    ```bash
    node -v
    npm -v
    ```

2. **Clona el repositorio y accede al directorio del proyecto**  
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd Prueba
    ```

3. **Instala las dependencias**  
    ```bash
    npm install
    ```

4. **Configura las variables de entorno**  
    Copia el archivo de ejemplo y edítalo si es necesario:
    ```bash
    cp env.example .env
    nano .env
    ```

5. **Inicia el servidor**  
    ```bash
    node backend_descargas.js
    ```
    La aplicación estará disponible en `http://127.0.0.1:3001`.

Si tienes problemas, revisa que las versiones de Node.js y npm sean compatibles y que todas las dependencias estén correctamente instaladas.

## Uso

- Accede a la aplicación en `http://127.0.0.1:3001`.
- Utiliza la interfaz para descargar archivos y enviar formularios de contacto.

## Dependencias

- **Express**: Framework para construir el servidor backend.
- **dotenv**: Para manejar variables de entorno.

## Autor
Este proyecto fue desarrollado por N1NJ45P0RT. Si tienes preguntas o sugerencias, no dudes en contactarme.