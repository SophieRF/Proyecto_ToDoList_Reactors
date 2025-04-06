import { useEffect } from "react"
import { useSprints } from "../../../hooks/useSprints"
import TareasBoard from "../../TareasBoard/TareasBoard"
import styles from "./MainScreen.module.css"

export const MainScreen = () => {
    const { sprints, getSprints } = useSprints()

    useEffect(() => {
        getSprints()
    }, [getSprints])

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <p>Sprint: </p>
                    <div className={styles.crearTareaContainer}>
                        <p>Tareas en la Sprint: </p>
                        <button>Crear Tarea</button>
                    </div>
                </div>

                <div className={styles.mainDiv}>
                    {
                        sprints.length > 0 ? <TareasBoard sprint={sprints[0]} /> : <h1>No hay Sprints disponibles</h1>
                    }
                </div>
            </div>
        </>
    )

}
