import { useEffect } from "react"
import { SprintEntry } from "../../components/SprintEntry/SprintEntry"
import { useSprints } from "../../hooks/useSprints"
import styles from "./SprintList.module.css"

export const SprintList = () => {
    const {getSprints, sprints}=useSprints()
    

    useEffect(() => {
        getSprints()
    }, [getSprints]);

  return (
    <div className={styles.mainDiv}>
        {sprints.length > 0 ? sprints.map((sprint, index) => (
            <div key={index}>
                <SprintEntry sprint={sprint} key={index}/>
            </div>
        )) : <p>No hay Sprints que mostrar.</p>}
    </div>
  )
}