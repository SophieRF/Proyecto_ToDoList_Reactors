
import './App.module.css'
import { NavBar } from './components/NavBar/NavBar'
import { SideBar } from './components/SideBar/SideBar'
import { MainScreen } from './screens/MainScreen/MainScreen'
import styles from './App.module.css'

function App() {
  return (
    <>
    <NavBar />
    <div className={styles.mainDiv}>
    <SideBar />
    <MainScreen />
    </div>
    </>
  )
}

export default App