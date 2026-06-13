import { Route, Routes } from 'react-router-dom'
import './App.css'

// ===
import Clock from './Pages/Clock'
import Timer from './Pages/Timer'
import Alarm from './Pages/Alarm'
import Layout from './layout/Layout'
// ===

function App() {

  return (
    <>
      <Routes>
        <Route path='' element={<Layout></Layout>}>
          <Route path='/clock' element={<Clock></Clock>}></Route>
          <Route path='/timer' element={<Timer></Timer>}></Route>
          <Route path='/alarm' element={<Alarm></Alarm>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
