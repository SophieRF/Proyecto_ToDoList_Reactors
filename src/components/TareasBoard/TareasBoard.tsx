import styles from "./TareasBoard.module.css"

export default function TareasBoard() {
  return (
    <div className={styles.mainDiv}>

      <div className={styles.tareasPendientes}>
        <div>
          <h1>Pendiente</h1>
        </div>

      </div>
      <div className={styles.tareasEnProgreso}>
      <h1>En progreso</h1>
      </div>
      <div className={styles.tareasTerminadas}>
      <h1>Terminadas</h1>
      </div>
    </div>
  )
}
