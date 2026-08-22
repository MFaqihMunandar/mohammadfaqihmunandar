import React, { useState } from 'react';

export default function UndianApp() {
  const [names, setNames] = useState('Faqih, Budi, Siti, Andi');
  const [winner, setWinner] = useState(null);

  const drawWinner = () => {
    const list = names.split(',').map((n) => n.trim()).filter(Boolean);
    if (list.length === 0) return;
    const random = list[Math.floor(Math.random() * list.length)];
    setWinner(random);
  };

  return (
    <div>
      <h4 className="fw-bold mb-3">Aplikasi Undian (Random Picker)</h4>
      <div className="mb-3">
        <label className="form-label font-monospace">Masukkan Nama (Pisahkan dengan koma):</label>
        <textarea 
          className="form-control" 
          value={names} 
          onChange={(e) => setNames(e.target.value)} 
          rows={3} 
        />
      </div>
      <button className="btn btn-primary" onClick={drawWinner}>
        🎉 Acak Pemenang
      </button>

      {winner && (
        <div className="alert alert-success mt-4 mb-0 fw-bold fs-5 text-center">
          🏆 Pemenang: {winner}
        </div>
      )}
    </div>
  );
}