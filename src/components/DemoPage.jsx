import React, { useState, useEffect } from 'react';
import CalculatorApp from './demos/CalculatorApp';
import UndianApp from './demos/UndianApp';
import TodoApp from './demos/TodoApp';

export default function DemoPage({ onBack }) {
  const [activeApp, setActiveApp] = useState('calculator');

  // Inject Bootstrap stylesheet ONLY when DemoPage is mounted
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    link.id = 'bootstrap-demo-css';
    document.head.appendChild(link);

    // Cleanup Bootstrap styles when leaving DemoPage
    return () => {
      const existingLink = document.getElementById('bootstrap-demo-css');
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Bootstrap Navigation Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">🚀 Web Apps Demo Showcase</span>
          <button className="btn btn-outline-light btn-sm" onClick={onBack}>
            ← Kembali ke Portfolio
          </button>
        </div>
      </nav>

      <div className="container">
        {/* Header Alert */}
        <div className="alert alert-primary shadow-sm mb-4" role="alert">
          <h5 className="alert-heading fw-bold mb-1">Interactive React + Bootstrap Apps</h5>
          <p className="mb-0 small">
            Pilih aplikasi di menu sebelah kiri untuk melihat fungsionalitas dan desain komponen.
          </p>
        </div>

        {/* Main Grid: Sidebar + Interactive Display */}
        <div className="row g-4">
          {/* Sidebar Menu */}
          <div className="col-md-3">
            <div className="list-group shadow-sm fw-medium">
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 py-3 ${
                  activeApp === 'calculator' ? 'active' : ''
                }`}
                onClick={() => setActiveApp('calculator')}
              >
                <span>🧮</span> Kalkulator
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 py-3 ${
                  activeApp === 'undian' ? 'active' : ''
                }`}
                onClick={() => setActiveApp('undian')}
              >
                <span>🎰</span> Acak Undian
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 py-3 ${
                  activeApp === 'todo' ? 'active' : ''
                }`}
                onClick={() => setActiveApp('todo')}
              >
                <span>📝</span> Daftar Catatan
              </button>
            </div>
          </div>

          {/* Interactive Component Container */}
          <div className="col-md-9">
            <div className="card shadow-sm border-0 p-4">
              {activeApp === 'calculator' && <CalculatorApp />}
              {activeApp === 'undian' && <UndianApp />}
              {activeApp === 'todo' && <TodoApp />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}