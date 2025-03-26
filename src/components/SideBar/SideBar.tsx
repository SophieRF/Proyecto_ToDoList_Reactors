import { useState } from "react";
import styles from "./SideBar.module.css";

export const SideBar = () => {
    const [names] = useState(["Sprint 1", "Sprint 2", "Sprint 3"]);

    return (
        <div className={styles.sidebar}>
            <button className={styles.backlogButton}>Backlog</button>

            <ul className={styles.list}>
                {names.map((name, index) => (
                    <li key={index} className={styles.listItem}>
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
