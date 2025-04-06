import { ISprint } from "../../types/ISprint"
import TareaEntry from "../TareaEntry/TareaEntry"
import styles from "./TareasBoard.module.css"

interface ITareasBoardProps {
  sprint: ISprint | null;
}

export default function TareasBoard({ sprint }: ITareasBoardProps) {
  const tareasPendientes = sprint?.tareas.filter(t => t.estado.toLowerCase() === "pendiente") ?? [];
  const tareasEnProgreso = sprint?.tareas.filter(t => t.estado.toLowerCase() === "en progreso") ?? [];
  const tareasTerminadas = sprint?.tareas.filter(t => t.estado.toLowerCase() === "terminada") ?? [];

  return (
    <div className={styles.mainDiv}>
      
      <div className={styles.tareasContainer}>
        <h1 className={styles.pendienteTitle}>Pendiente</h1>
        {tareasPendientes.map(tarea => (
          <TareaEntry key={tarea.id} tarea={tarea} variant="board" />
        ))}
      </div>

      <div className={styles.tareasContainer}>
        <h1 className={styles.enProgresoTitle}>En progreso</h1>
        {tareasEnProgreso.map(tarea => (
          <TareaEntry key={tarea.id} tarea={tarea} variant="board" />
        ))}
      </div>

      <div className={styles.tareasContainer}>
        <h1 className={styles.terminadasTitle}>Terminadas</h1>
        {tareasTerminadas.map(tarea => (
          <TareaEntry key={tarea.id} tarea={tarea} variant="board" />
        ))}
      </div>

    </div>
  )
}
