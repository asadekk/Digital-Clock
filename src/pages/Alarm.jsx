
import React, { useState, useEffect, useRef } from "react";
import "../App.css";

const Alarm = () => {
  const [time, setTime] = useState("00:00:00");
  const [alarmHour, setAlarmHour] = useState("");
  const [alarmMinute, setAlarmMinute] = useState("");
  const [alarmTime, setAlarmTime] = useState(null);
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const audioContextRef = useRef(null);
  const alarmIntervalRef = useRef(null);

  const playBeep = () => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "square";
    oscillator.frequency.value = 800;

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}`);

      if (
        isAlarmSet &&
        !isRinging &&
        `${hours}:${minutes}` === alarmTime
      ) {
        setIsRinging(true);

        alarmIntervalRef.current = setInterval(() => {
          playBeep();
        }, 500);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isAlarmSet, isRinging, alarmTime]);

  const handleAlarmToggle = async () => {
    if (isAlarmSet || isRinging) {
      setAlarmTime(null);
      setIsAlarmSet(false);
      setIsRinging(false);

      setAlarmHour("");
      setAlarmMinute("");

      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }

      return;
    }

    if (
      alarmHour === "" ||
      alarmMinute === "" ||
      alarmHour < 0 ||
      alarmHour > 23 ||
      alarmMinute < 0 ||
      alarmMinute > 59
    ) {
      alert("Soat 0-23, daqiqa 0-59 bo'lishi kerak!");
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new (
        window.AudioContext ||
        window.webkitAudioContext
      )();
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    const h = String(alarmHour).padStart(2, "0");
    const m = String(alarmMinute).padStart(2, "0");

    setAlarmTime(`${h}:${m}`);
    setIsAlarmSet(true);
  };

  return (
    <div className="stopwatch-container">
      <div
        className={`alarm-container ${
          isRinging ? "ringing" : ""
        }`}
      >
        <div className="alarm-display">
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
              disabled={isAlarmSet}
              onChange={(e) => setAlarmHour(e.target.value)}
            />

            <span>:</span>

            <input
              type="number"
              placeholder="MM"
              min="0"
              max="59"
              value={alarmMinute}
              disabled={isAlarmSet}
              onChange={(e) => setAlarmMinute(e.target.value)}
            />
          </div>

          <button
            className={`alarm-btn ${
              isRinging
                ? "stop-btn"
                : isAlarmSet
                ? "cancel-btn"
                : "set-btn"
            }`}
            onClick={handleAlarmToggle}
          >
            {isRinging
              ? "To'xtatish 🔕"
              : isAlarmSet
              ? "Bekor qilish"
              : "Alarmni Yoqish 🔔"}
          </button>
        </div>

        {isAlarmSet && !isRinging && (
          <div className="status-msg">
            Alarm o'rnatildi: {alarmTime}
          </div>
        )}

        {isRinging && (
          <div className="status-msg ring-text">
            Turing! Vaqt bo'ldi! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default Alarm;

