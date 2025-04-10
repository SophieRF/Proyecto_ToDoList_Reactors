import { useState } from "react"
import { ISprint } from "../../types/ISprint"
import { ModalSprints } from "../../ui/ModalSprints/ModalSprints"
import { sprintStore } from "../../store/sprintStore"
import { useSprints } from "../../hooks/useSprints"
import styles from './SprintEntry.module.css'

interface ISprintProps{
    sprint:ISprint
}

export const SprintEntry = ({sprint}: ISprintProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSee, setOpenModalSee] = useState(false);
  const setSprintActivo=sprintStore((state) => state.setSprintActiva)
  const {deleteSprint} = useSprints()

  const handleOpenModalSee = () => {
    setSprintActivo(sprint)
    setOpenModalSee(true)
    setOpenModal(true)
  }

  const handleOpenModalEntry = () => {
    setSprintActivo(sprint)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModalSee(false)
    setSprintActivo(null)
    setOpenModal(false)
  }

  const handleDelete = () => {
    deleteSprint(sprint.id!);
  };

  
  return (
    <div className={styles.mainDiv} onClick={() => setSprintActivo(sprint)}>
        <div>
            <h1>{sprint.nombre}</h1>
            <p>{sprint.fechaInicio}</p>
            <p>{sprint.fechaCierre}</p>
        </div>
        <div className={styles.divBotones}>
        <div>
          <button onClick={handleOpenModalSee}>Ver</button>
        </div>
        <div>
          <button onClick={handleOpenModalEntry}>Editar</button>
        </div>
        <div>
          <button onClick={handleDelete}>Borrar</button>
        </div>
      </div>
      {openModal && <ModalSprints activeSprint={sprint} openModalSee={openModalSee} handleCloseModal={handleCloseModal}/>}
    </div>
  )
}
