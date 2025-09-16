To-Do List App
 Aplicación web para la gestión de tareas y sprints, desarrollada con React + TypeScript, Zustand para el manejo de estado y json-server como backend temporal. Ideal para equipos ágiles que buscan organizar sus tareas y sprints de forma visual y eficiente.

 <b>Características Principales<b/>
* Gestión completa de tareas y sprints (CRUD)

* Backlog centralizado para tareas pendientes

* Visualización de sprints en columnas

* Movimiento dinámico de tareas entre estados y entre backlog/sprint

* Filtro automático de tareas próximas a vencer (3 días) y resaltado de las mismas para advertir al usuario

* Notificaciones opcionales para tareas urgentes

 <b>Tecnologías Utilizadas<b/>
* React + TypeScript:	Frontend y lógica de la app
* Zustand:	Gestión de estado global
* CSS:	Estilos 
* json-server:	Backend temporal con API REST

 <b>Navegación de la App<b/> 
* Backlog
- Visualiza todas las tareas pendientes

- Crea, edita y elimina tareas

- Mueve tareas a sprints activos

* Sprint Board
- Visualización tipo kanban con columnas por estado

- Mueve tareas entre estados

- Devuelve tareas al backlog

- Crea, edita y elimina tareas dentro del sprint

* taskStore
Lista de tareas

Tarea activa

Filtro de tareas próximas a vencer

📱 Vista de Tareas Próximas a Vencer
Las tareas con fecha límite dentro de los próximos 3 días se resaltan automáticamente en la interfaz. Opcionalmente, se puede activar un sistema de notificaciones visuales para alertar al usuario.

📷 Capturas de Pantalla
(Agregá aquí screenshots de la app si querés mostrar el diseño visual)

* Cómo Ejecutar el Proyecto
bash
# Instalar dependencias
npm install

# Ejecutar frontend
npm run dev

# Ejecutar backend temporal
npx json-server --watch db.json --port 3000

* Contribuciones
Este proyecto fue desarrollado como ejercicio práctico para aplicar conceptos de React, TypeScript y gestión de estado con Zustand. Se aceptan sugerencias para extender la funcionalidad.
