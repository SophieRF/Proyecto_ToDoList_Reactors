import tareas from '../../../db.json'
import TareaEntry from '../../components/TareaEntry/TareaEntry'
import styles from './Tareaslist.module.css'

export default function TareasList() {
    console.log(tareas)
  return (
    <div className={styles.mainDiv}>
      {tareas.length > 0 ? tareas.map((tarea) => (
        <div>
            <TareaEntry tarea={tarea}/>
        </div>
      )): <p>Este Sprint no contiene tareas</p>}
    </div>
  )
}
