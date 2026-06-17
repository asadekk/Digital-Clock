import React, { useState, useEffect, useRef } from 'react';

const Alarm = () => {
  const [time, setTime] = useState('00:00:00');
  const [alarmHour, setAlarmHour] = useState('');
  const [alarmMinute, setAlarmMinute] = useState('');
  const [alarmTime, setAlarmTime] = useState(null);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const audioRef = useRef(null);

  // Har soniyada vaqtni yangilab turish
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      const currentTimeString = `${hours}:${minutes}:${seconds}`;
      setTime(currentTimeString);

      // Alarm vaqtini tekshirish (faqat soat va daqiqa)
      if (isAlarmSet && `${hours}:${minutes}` === alarmTime) {
        setIsRinging(true);
        if (audioRef.current) {
          audioRef.current.play().catch(err => console.log("Audio chalishda xatolik:", err));
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isAlarmSet, alarmTime]);

  // Alarmni o'rnatish yoki o'chirish
  const handleAlarmToggle = () => {
    if (isAlarmSet || isRinging) {
      // Alarmni o'chirish yoki to'xtatish
      setAlarmTime(null);
      setIsAlarmSet(false);
      setIsRinging(false);
      setAlarmHour('');
      setAlarmMinute('');
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      // Yangi alarm o'rnatish
      if (!alarmHour || !alarmMinute || alarmHour > 23 || alarmMinute > 59 || alarmHour < 0 || alarmMinute < 0) {
        alert("Iltimos, soat (0-23) va daqiqani (0-59) to'g'ri kiriting!");
        return;
      }

      const hr = String(alarmHour).padStart(2, '0');
      const min = String(alarmMinute).padStart(2, '0');
      
      setAlarmTime(`${hr}:${min}`);
      setIsAlarmSet(true);
    }
  };

  return (
    <div className="alarm-wrapper">
      <div className={`alarm-container ${isRinging ? 'ringing' : ''}`}>
        <div className="clock-display">
          <span>{time}</span>
        </div>

        <div className="alarm-control">
          <div className="input-group">
            <input 
              type="number" 
              placeholder="HH" 
              min="0" 
              max="23"
              value={alarmHour}
              onChange={(e) => setAlarmHour(e.target.value)}
              disabled={isAlarmSet}
            />
            <span className="separator">:</span>
            <input 
              type="number" 
              placeholder="MM" 
              min="0" 
              max="59"
              value={alarmMinute}
              onChange={(e) => setAlarmMinute(e.target.value)}
              disabled={isAlarmSet}
            />
          </div>

          <button 
            className={`alarm-btn ${isRinging ? 'stop-btn' : isAlarmSet ? 'cancel-btn' : 'set-btn'}`}
            onClick={handleAlarmToggle}
          >
            {isRinging ? 'To\'xtatish 🔕' : isAlarmSet ? 'Bekor qilish' : 'Alarmni Yoqish 🔔'}
          </button>
        </div>

        {isAlarmSet && !isRinging && (
          <div className="status-msg">
            Alarm o'rnatildi: {alarmTime}
          </div>
        )}
        {isRinging && <div className="status-msg ring-text">Turing! Vaqt bo'ldi! 🎉</div>}
      </div>

      {/* Onlayn audio fayl */}
      <audio 
        ref={audioRef} 
        src="https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav" 
        loop 
      />
    </div>
  );
};

export default Alarm;