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

