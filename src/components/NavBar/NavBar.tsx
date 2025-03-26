import styles from "./NavBar.module.css"
export const NavBar = () => {
    return (
        <div className={styles.barContainer}>
            <h1 className={styles.title}>Administrador De Tareas</h1>
        </div>
    )
}