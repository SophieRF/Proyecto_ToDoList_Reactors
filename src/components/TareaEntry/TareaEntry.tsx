import { useState } from 'react'
import { ITarea } from '../../types/ITarea'
import Modal from '../../ui/Modal/Modal'
import styles from './TareaEntry.module.css'
import { tareaStore } from '../../store/tareaStore'
import { useTareas } from '../../hooks/useTareas'

interface ITareaEntryProps {
  tarea: ITarea;
  variant?: 'default' | 'board';
}

export default function TareaEntry({ tarea, variant }: ITareaEntryProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSee, setOpenModalSee] = useState(false);

  const setTareaActiva = tareaStore((state) => state.setTareaActiva)
  const { deleteTarea } = useTareas();

  const handleOpenModalSee = () => {
    setTareaActiva(tarea)
    setOpenModalSee(true)
    setOpenModal(true)
  }

  const handleOpenModalEntry = () => {
    setTareaActiva(tarea)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModalSee(false)
    setTareaActiva(null)
    setOpenModal(false)
  }
  const handleDelete = () => {
    deleteTarea(tarea.id!);
  };

  return (
    <div className={variant === 'board' ? styles.boardStyle : styles.backlogStyle}>

      <div>
        <div>
          <h1 className={styles.title}>{tarea.titulo}</h1>
          <p>{tarea.descripcion}</p>
          <p>{tarea.fechaLimite}</p>
        </div>

        {variant === 'board' && (
          <div className={styles.estadoWrapper}>
            <button className={styles.botonEnviar}>
              Enviar al Backlog
            </button>

            <div className={styles.dropdownEstado}>
        <label htmlFor={`estado-${tarea.id}`}>Estado:</label>
        <select
          id={`estado-${tarea.id}`}
          name="estado"
          value={tarea.estado}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Terminada">Terminada</option>
        </select>
      </div>

          </div>
        )}
      </div>

      <div className={styles.divBotones}>
        <div>
          <button
            className={styles.botonVisibility}
            onClick={handleOpenModalSee}>
            <span className="material-symbols-outlined">
              visibility
            </span>
          </button>
        </div>
        <div>
          <button
            className={styles.botonEdit}
            onClick={handleOpenModalEntry}>
            <span className="material-symbols-outlined">
              edit
            </span>
          </button>
        </div>
        <div>
          <button
            className={styles.botonDelete}
            onClick={handleDelete}>
            <span className="material-symbols-outlined">
              delete
            </span>
          </button>
        </div>
      </div>
      {openModal && <Modal handleCloseModal={handleCloseModal} activeTarea={tarea} openModalSee={openModalSee} />}
    </div>
  )
}
