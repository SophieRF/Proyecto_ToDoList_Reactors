import { useState } from 'react'
import { ITarea } from '../../types/ITarea'
import Modal from '../../ui/Modal/Modal'
import styles from './TareaEntry.module.css'
import { tareaStore } from '../../store/tareaStore'

interface ITareaEntryProps{
  tarea:ITarea
}

export default function TareaEntry({tarea}:ITareaEntryProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSee, setOpenModalSee] = useState(false)
  const setTareaActiva=tareaStore((state) => state.setTareaActiva)

  const handleOpenModalSee= () => {
    setTareaActiva(tarea)
    setOpenModalSee(true)
    setOpenModal(true)
  }


  const handleOpenModalEntry= () => {
    setTareaActiva(tarea)
    setOpenModal(true)
  }

  const handleCloseModal= () => {
    setOpenModalSee(false)
    setTareaActiva(null)
    setOpenModal(false)
  }

  return (
    <div className={styles.mainDiv}>
        <div>
        <h1>{tarea.titulo}</h1>
      <p>{tarea.descripcion}</p>
      <p>{tarea.fechaLimite}</p>
        </div>
        <div className={styles.divBotones}>
          <div>
          <button onClick={handleOpenModalSee}>Ver</button>
          </div>
          <div>
          <button onClick={handleOpenModalEntry}>Editar</button>
          </div>
          <div>
          <button onClick={handleOpenModalEntry}>Borrar</button>
          </div>
        </div>
        {openModal && <Modal handleCloseModal={handleCloseModal} activeTarea={tarea} openModalSee={openModalSee}/>}
    </div>
  )
}
