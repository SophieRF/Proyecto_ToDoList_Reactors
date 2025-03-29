import { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import TareasList from "../../ui/TareasList/TareasList";
import styles from "./BacklogScreen.module.css"


export default function BacklogScreen() {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <>
    <div>
      <button onClick={handleOpenModal}>Crear Tarea</button>
    </div>
    <div className={styles.mainDiv}>
     <TareasList />
    </div>
    {openModal && <Modal handleCloseModal={handleCloseModal}/>}
    </>
  )
}
