
import './App.module.css'
import { NavBar } from './components/NavBar/NavBar'
import { SideBar } from './components/SideBar/SideBar'
import styles from './App.module.css'
import BacklogScreen from './screens/BacklogScreen/BacklogScreen'

function App() {
  return (
    <>
    <NavBar />
    <div className={styles.mainDiv}>
    <SideBar />
    {/* <MainScreen /> */}
    <BacklogScreen />
    </div>
    </>
  )
}

export default App