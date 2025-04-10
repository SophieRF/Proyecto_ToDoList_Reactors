import { useEffect } from 'react';
import TareaEntry from '../../components/TareaEntry/TareaEntry'
import { useTareas } from '../../hooks/useTareas'
import styles from './Tareaslist.module.css'

export default function TareasList() {
  const {getTareas, tareas} =useTareas();

  useEffect(() => {
    getTareas();
  }, [getTareas])
  return (
    <div className={styles.mainDiv}>
      {tareas.length > 0 ? tareas.map((tarea, index) => (
        <div key={index} className={styles.tareaContainer}>
            <TareaEntry tarea={tarea} key={index}/>
        </div>
      )): <p>Este Sprint no contiene tareas</p>}
    </div>
  )
}