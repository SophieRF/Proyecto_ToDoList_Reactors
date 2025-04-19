
import './App.module.css'
import { NavBar } from './components/NavBar/NavBar'
import { SideBar } from './components/SideBar/SideBar'
import styles from './App.module.css'
import BacklogScreen from './components/screens/BacklogScreen/BacklogScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { MainScreen } from './components/screens/MainScreen/MainScreen'


function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<>
          <NavBar />
          <div className={styles.mainDiv}>
          <SideBar />
          <MainScreen />
          </div>
        </>}/>
        <Route path={"/Backlog"} element={<>
        <NavBar />
          <div className={styles.mainDiv}>
          <SideBar />
          <BacklogScreen />
          </div>
        </>}/>
      </Routes>
    </Router>
  )
}

export default App