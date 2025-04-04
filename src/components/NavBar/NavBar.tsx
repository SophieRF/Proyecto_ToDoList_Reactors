import { useNavigate } from "react-router-dom"
import styles from "./NavBar.module.css"
export const NavBar = () => {
    const navigate=useNavigate()
    return (
        <div className={styles.barContainer}>
            <h1 onClick={() => navigate("/")} className={styles.title}>Administrador De Tareas</h1>
        </div>
    )
}