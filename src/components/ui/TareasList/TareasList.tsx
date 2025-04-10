import { useEffect } from 'react';
import styles from './Tareaslist.module.css'
import { useTareas } from '../../../hooks/useTareas';
import TareaEntry from '../../TareaEntry/TareaEntry';

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