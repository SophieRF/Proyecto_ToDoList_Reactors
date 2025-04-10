import { useEffect, useState } from "react"
import { useSprints } from "../../../hooks/useSprints"
import TareasBoard from "../../TareasBoard/TareasBoard"
import styles from "./MainScreen.module.css"
import { sprintStore } from "../../../store/sprintStore"
import Modal from "../../../ui/Modal/Modal"

export const MainScreen = () => {
    const { sprints, getSprints } = useSprints()
    const [openModal, setOpenModal]= useState(false);
    const activeSprint=sprintStore((state) => state.sprintActiva);

    const handleOpenModal= () => {
        setOpenModal(true);
    }
    const handleCloseModal= () => {
        getSprints()
        setOpenModal(false)
    }

    useEffect(() => {
        getSprints()
    }, [getSprints])

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <p>Sprint: {activeSprint?.nombre}</p>
                    <div className={styles.crearTareaContainer}>
                        <p>Tareas en la Sprint: </p>
                        <button onClick={handleOpenModal}>Crear Tarea</button>
                    </div>
                </div>

                <div className={styles.mainDiv}>
                    {
                        sprints.length > 0 ? <TareasBoard /> : <h1>No hay Sprints disponibles</h1>
                    }
                </div>
            </div>
            {openModal && <Modal activeTarea={null} openModalSee={false} handleCloseModal={handleCloseModal}/>}
        </>
    )

}
