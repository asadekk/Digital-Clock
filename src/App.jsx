import { Route, Routes } from 'react-router-dom'
import './App.css'

// ===
import Clock from './pages/Clock.jsx'       
import Layout from './layout/Layout.jsx' 
import Timer from './pages/Timer'
import Alarm from './pages/Alarm'
import Worldclock from './pages/Worldclock';
// ===

function App() {

  return (
    <>
      <Routes>
        <Route path='' element={<Layout></Layout>}>
          <Route path='/clock' element={<Clock></Clock>}></Route>
          <Route path='/timer' element={<Timer></Timer>}></Route>
          <Route path='/alarm' element={<Alarm></Alarm>}></Route>
          <Route path='/world' element={<Worldclock></Worldclock>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App;
