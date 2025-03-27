# ProyectoSGAClaseT92-G-3

# Sistema de Gestión de Vehículos

## Objetivo del Sistema

El objetivo de este sistema es permitir la gestión de vehículos a través de una interfaz web. A través de este sistema, los usuarios pueden visualizar, agregar, modificar y eliminar vehículos de una base de datos. El sistema se comunica con una API backend para realizar las operaciones CRUD sobre los datos de los vehículos. 

## Funcionalidades Implementadas

### 1. **Visualización de Vehículos**
   - Se muestra una lista de vehículos con los siguientes campos:
     - Marca
     - Modelo
     - Año
     - Precio
     - Disponibilidad
     - Descripción
   - Los vehículos se obtienen dinámicamente de una API backend a través de una solicitud HTTP.
   
### 2. **Lista de usuarios**
   -  Se muestra una lista de usuarios con los siguientes campos:
     - Nombre
     - Email
   - Los usuarios se obtienen dinámicamente de una API backend a través de una solicitud HTTP.


### 3. **Mensajes de Éxito y Error**
   - Se muestran mensajes de éxito cuando las operaciones (agregar, editar, eliminar) se realizan correctamente.
   - Se muestran mensajes de error cuando ocurre un problema al intentar realizar una operación, como un error en la conexión con la API o en la base de datos.

### 4. **Interfaz de Usuario Intuitiva**
   - La interfaz está diseñada para ser sencilla y fácil de usar. 
   - Los formularios están bien estructurados, y las acciones como agregar, editar y eliminar vehículos están claramente etiquetadas.


## Tecnologías Utilizadas

- **Frontend:**
  - Angular (versión 15 o superior)
  - HTML5, CSS3
  - Bootstrap (para estilos y diseño responsivo)

- **Backend:**
  - Node.js y Express (en caso de usar el mismo backend para la API)
  - Base de datos MySQL (para almacenar los datos de los vehículos)


## Detalles de la API Externa Utilizada

El sistema utiliza la API ExchangeRate-API para obtener tasas de cambio de divisas y realizar conversiones de moneda. Esto es útil para mostrar los precios de los vehículos en diferentes monedas según las tasas de cambio actuales.

               API: ExchangeRate-API
               URL: https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD

- Descripción: 
   La API proporciona tasas de cambio de divisas en tiempo real. Se usa para convertir los precios de los vehículos a diferentes monedas.

- Endpoints:

   Obtener tasas de cambio: GET /v6/YOUR_API_KEY/latest/HNL

   Descripción: Obtiene las tasas de cambio actuales basadas en el dólar estadounidense (USD).

   Requiere: Clave de API (debes registrarte en la plataforma para obtener una).

   

# Instrucciones para Instalar y Ejecutar el Proyecto

Asegúrate de tener las siguientes herramientas instaladas:

   - MySQL Workbench

   - Node.js y npm: Descargar Node.js

   - Angular CLI: Si aún no tienes Angular CLI, instala utilizando el siguiente comando:

                  npm install -g @angular/cli


## Backend (API)

1. Navega a la carpeta del backend del proyecto.

   - Instala las dependencias necesarias ejecutando:

                  npm install

2. Inicia el servidor de la API ejecutando:

                  nodemon app.js

   - El backend estará corriendo en http://localhost:3001.

## Frontend (Aplicación Angular)

1. Navega a la carpeta del frontend del proyecto.

   - Instala las dependencias necesarias ejecutando:

                  npm install

2. Inicia la aplicación Angular ejecutando:

                  ng serve

La aplicación estará disponible en http://localhost:4200.

Verificación
Accede a http://localhost:4200 desde tu navegador.

Si todo está bien configurado, deberías poder acceder a la página de login.

Ingresa con un nombre de usuario y contraseña válidos y verifica que la interfaz de vehículos funcione correctamente.