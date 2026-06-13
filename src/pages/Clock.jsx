import React from 'react'
import React, { useState, useEffect } from 'react';

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Har soniyada yangi vaqt obyektini o'rnatadi
      setTime(new Date());
    }, 1000);

    // Komponent o'chirilganda taymerni tozalash
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Digital Clock</h2>
      {/* Katta 'L' harfiga e'tibor bering: toLocaleTimeString */}
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
}

function Clock() {
  return (
    <div>
      <DigitalClock/>
    </div>
  )
}

export default Clock