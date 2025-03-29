import { Tarea } from '../../types/TareaType'
import styles from './TareaEntry.module.css'

interface ITareaEntryProps{
  tarea:Tarea
}

export default function TareaEntry({tarea}:ITareaEntryProps) {
  return (
    <div className={styles.mainDiv}>
        <div>
        <h1>{tarea.titulo}</h1>
      <p>{tarea.descripcion}</p>
      <p>{tarea.fechaLimite}</p>
        </div>
        <div className={styles.divBotones}>
          <div>
          <button>Ver</button>
          </div>
          <div>
          <button>Editar</button>
          </div>
          <div>
          <button>Borrar</button>
          </div>
        </div>
    </div>
  )
}
