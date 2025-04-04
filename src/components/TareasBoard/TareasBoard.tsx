import { ISprint } from "../../types/ISprint"
import TareaEntry from "../TareaEntry/TareaEntry";
import styles from "./TareasBoard.module.css"

interface ITareasBoardProps{
  sprint:ISprint | null;
}

export default function TareasBoard({sprint}:ITareasBoardProps) {
  return (
    <div className={styles.mainDiv}>

      <div className={styles.tareasPendientes}>
        <div className={styles.textBoxPendiente}>
          <h1>Pendiente</h1>
          {sprint?.tareas[0].estado == "pendiente" && <TareaEntry tarea={sprint.tareas[0]}/>}
        </div>
      </div>

      <div className={styles.tareasEnProgreso}>
        <div className={styles.textBoxProgreso}>
        <h1>En progreso</h1>
        </div>
      </div>

      <div className={styles.tareasTerminadas}>
        <div className={styles.textBoxTerminada}>
        <h1>Terminadas</h1>
        </div>
      </div>
    </div>
  )
}
