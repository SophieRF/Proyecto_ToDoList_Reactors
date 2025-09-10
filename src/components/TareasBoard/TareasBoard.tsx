import { sprintStore } from "../../store/sprintStore";
import TareaEntry from "../TareaEntry/TareaEntry"
import styles from "./TareasBoard.module.css"


export default function TareasBoard() {
  const activeSprint=sprintStore((state) => state.sprintActiva);
  const tareasPendientes = activeSprint?.tareas.filter(t => t.estado.toLowerCase() === "pendiente") ?? [];
  const tareasEnProgreso = activeSprint?.tareas.filter(t => t.estado.toLowerCase() === "en progreso") ?? [];
  const tareasTerminadas = activeSprint?.tareas.filter(t => t.estado.toLowerCase() === "terminada") ?? [];
  return (
    <div className={styles.mainDiv}>
      {activeSprint ? <>
        <div className={styles.tareasContainer}>
        <h1 className={styles.estado}>Pendiente</h1>
        {tareasPendientes.length >0 ? tareasPendientes.map(tarea => (
          <TareaEntry key={tarea.id} tarea={tarea} variant="board" />
        )): <p>No hay tareas pendientes</p>}
      </div>

      <div className={styles.tareasContainer}>
        <h1 className={styles.estado}>En progreso</h1>
        {tareasEnProgreso.length > 0 ? tareasEnProgreso.map(tarea => (
          <TareaEntry key={tarea.id} tarea={tarea} variant="board" />
        )): <p>No hay tareas en progreso</p>}
      </div>

      <div className={styles.tareasContainer}>
        <h1 className={styles.estado}>Terminadas</h1>
        {tareasTerminadas.length > 0 ? tareasTerminadas.map(tarea => (
          <TareaEntry key={tarea.id} tarea={tarea} variant="board" />
        )): <p>No hay tareas terminadas</p>}
      </div>
      </>:<h1>No se ha seleccionado una Sprint</h1>}
    </div>
  )
}
