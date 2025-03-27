
import TareasBoard from "../../components/TareasBoard/TareasBoard"
import styles from "./MainScreen.module.css"

export const MainScreen = () => {
    return (
        <div className={styles.mainDiv}>
              <TareasBoard />
        </div>
    )
}
