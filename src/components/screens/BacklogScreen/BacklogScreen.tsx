import { useState } from "react";
import styles from "./BacklogScreen.module.css"
import { tareaStore } from "../../../store/tareaStore";
import TareasList from "../../ui/TareasList/TareasList";
import Modal from "../../ui/Modal/Modal";


export default function BacklogScreen() {
  const [openModal, setOpenModal] = useState(false)
  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

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
          <p>BACKLOG</p>
          <div className={styles.crearTareaContainer}>
            <p>Tareas en el Backlog: </p>
            <button onClick={handleOpenModal}>
              Crear Tarea
            </button>
          </div>
        </div>
      </div>
      <div className={styles.listasTareasContainer}>
        <div className={styles.mainDiv}>
          <TareasList variant="default" />
        </div>
      </div>
      {openModal && <Modal handleCloseModal={handleCloseModal} activeTarea={null} openModalSee={false} variant="default" />}
    </div>
  )
}
