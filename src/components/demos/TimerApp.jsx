import React, { useState, useEffect } from 'react';

export default function TimerApp() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const pad = (num) => String(num).padStart(2, '0');
    return `${pad(mins)}:${pad(secs)}`;
  };

  return (
    <div>
      <h4 className="fw-bold mb-3">⏱️ Stopwatch & Presisi Waktu</h4>
      <p className="text-muted small mb-4">
        Pengontrol timer real-time menggunakan React State & Hook lifecycle memory cleanup.
      </p>

      <div className="text-center py-4 bg-dark text-white rounded-3 mb-4 shadow-sm">
        <span className="display-1 fw-bold font-monospace">{formatTime(seconds)}</span>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          className={`btn btn-lg ${isActive ? 'btn-warning' : 'btn-success'} px-4`}
          onClick={toggleTimer}
        >
          {isActive ? '⏸️ Jeda' : '▶️ Mulai'}
        </button>
        <button className="btn btn-outline-danger btn-lg px-4" onClick={resetTimer}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}