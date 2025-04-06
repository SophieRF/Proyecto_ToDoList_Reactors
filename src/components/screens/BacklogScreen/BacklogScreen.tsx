import { useState } from "react";
import Modal from "../../../ui/Modal/Modal";
import TareasList from "../../../ui/TareasList/TareasList";
import styles from "./BacklogScreen.module.css"
import { tareaStore } from "../../../store/tareaStore";


export default function BacklogScreen() {
  const [openModal, setOpenModal] = useState(false)
  const setTareaActiva=tareaStore((state) => state.setTareaActiva)

  const handleOpenModal = () => {
    setTareaActiva(null)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div className={styles.mainContainer}>
      <div >
        <div className={styles.titleContainer}>
          <p>Backlog: </p>
          <div className={styles.crearTareaContainer}>
            <p>Tareas en el Backlog: </p>
            <button onClick={handleOpenModal}>Crear Tarea</button>
          </div>
        </div>
      </div>
      <div className={styles.listasTareasContainer}>
        <div className={styles.mainDiv}>
          <TareasList />
        </div>
      </div>
      {openModal && <Modal handleCloseModal={handleCloseModal} activeTarea={null} openModalSee={false} />}
    </div>
  )
}
