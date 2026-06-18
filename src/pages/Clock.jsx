import React, { useEffect, useState } from 'react'
import '../App.css'
const Clock =  () => {
  const [time , setTime] = useState(new Date())


  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    },1000)

    return ()=> clearInterval(timer)
  },[])


  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();


  return(
    <div className="stopwatch-container">
      <div className="clock-display">{formattedTime}</div>
      <p className='time-display'>{formattedDate}</p>
    </div>

  )

}


export default Clock;