
import styles from "./SideBar.module.css";
import { SprintList } from "../../ui/SprintList/SprintList";
import { useState } from "react";
import { sprintStore } from "../../store/sprintStore";
import { ModalSprints } from "../../ui/ModalSprints/ModalSprints";

export const SideBar = () => {
    const [openModal, setOpenModal]=useState(false);
    const setSprintActivo=sprintStore((state) => state.setSprintActiva)

    const handleOpenModal = () => {
        setSprintActivo(null)
        setOpenModal(true)
      }

      const handleCloseModal = () => {
        setOpenModal(false)
      }

    return (
        <>
        <div className={styles.sidebar}>
            <button className={styles.backlogButton}>Backlog</button>
            <button onClick={handleOpenModal}>Crear Sprint</button>
            <SprintList />
        </div>
        {openModal && <ModalSprints activeSprint={null} handleCloseModal={handleCloseModal} openModalSee={false}/>}
        </>
        
    );
};
