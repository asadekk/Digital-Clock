import React, { useEffect, useState } from 'react'

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
    <div className="clock-container">
      <h1>Digital clock</h1>
      <div className="clock-display">{formattedTime}</div>
      <p>{formattedDate}</p>
    </div>

  )

}


export default Clock;