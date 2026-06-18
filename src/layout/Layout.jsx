import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../App.css'

function Layout() {
  return (
    <div className='cantener'>

      <div className='leftPanel' >
          <div className='linkBtn'><Link to={"/clock"}>Clock</Link></div>
          <div className='linkBtn'><Link to={"/timer"}>Timer</Link></div>
          <div className='linkBtn'><Link to={"/alarm"}>Alarm</Link></div>
          <div className='linkBtn'><Link to={"/world"}>World Clock</Link></div>
      </div>

      <main className='rigthPanel'>
          <Outlet></Outlet>
      </main>
    </div>
  )
}

export default Layout;