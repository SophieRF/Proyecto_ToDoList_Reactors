import { useState } from 'react'
import { ITarea } from '../../types/ITarea'
import Modal from '../../ui/Modal/Modal'
import styles from './TareaEntry.module.css'
import { tareaStore } from '../../store/tareaStore'
import { useTareas } from '../../hooks/useTareas'

interface ITareaEntryProps {
  tarea: ITarea
}

export default function TareaEntry({ tarea }: ITareaEntryProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSee, setOpenModalSee] = useState(false)
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
    <div className={styles.mainDiv}>
      <div>
        <h1>{tarea.titulo}</h1>
        <p>{tarea.descripcion}</p>
        <p>{tarea.fechaLimite}</p>
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
            className= {styles.botonDelete}
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
