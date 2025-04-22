import { useEffect } from 'react';
import styles from './Tareaslist.module.css'
import { useTareas } from '../../../hooks/useTareas';
import TareaEntry from '../../TareaEntry/TareaEntry';

interface ITareasListProps {
  variant: 'default' | 'board';
}

export default function TareasList({variant}: ITareasListProps) {
  const {getTareas, tareas} =useTareas();

  useEffect(() => {
    getTareas();
  }, [getTareas])
  return (
    <div className={styles.mainDiv}>
      {tareas.length > 0 ? tareas.map((tarea, index) => (
        <div key={index} className={styles.tareaContainer}>
            <TareaEntry tarea={tarea} key={index} variant={variant}/>
        </div>
      )): <p>Este Sprint no contiene tareas</p>}
    </div>
  )
}