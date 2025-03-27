import styles from "./TareasBoard.module.css"

export default function TareasBoard() {
  return (
    <div className={styles.mainDiv}>

      <div className={styles.tareasPendientes}>
        <div className={styles.textBoxPendiente}>
          <h1>Pendiente</h1>
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
