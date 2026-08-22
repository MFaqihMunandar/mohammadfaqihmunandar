import React, { useState } from 'react';

export default function CalculatorApp() {
  const [input, setInput] = useState('');

  const handleClick = (val) => setInput((prev) => prev + val);
  const handleClear = () => setInput('');
  const handleCalculate = () => {
    try {
      setInput(Function(`"use strict"; return (${input})`)().toString());
    } catch {
      setInput('Error');
    }
  };

  return (
    <div>
      <h4 className="fw-bold mb-3">Kalkulator Sederhana</h4>
      <div className="p-3 bg-light border rounded text-end fs-3 fw-bold mb-3">
        {input || '0'}
      </div>
      <div className="row row-cols-4 g-2">
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','+'].map((char) => (
          <div className="col" key={char}>
            <button 
              className="btn btn-outline-secondary w-100 py-2 fs-5" 
              onClick={() => handleClick(char)}
            >
              {char}
            </button>
          </div>
        ))}
        <div className="col">
          <button className="btn btn-danger w-100 py-2 fs-5" onClick={handleClear}>C</button>
        </div>
        <div className="col-12 mt-2">
          <button className="btn btn-success w-100 py-2 fs-5" onClick={handleCalculate}>=</button>
        </div>
      </div>
    </div>
  );
}