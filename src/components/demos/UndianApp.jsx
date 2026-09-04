import React, { useState, useEffect, useRef } from 'react';
import UndianManager from './UndianManager';

const API_AUTH_URL = 'https://mohammadfaqihmunandarbe.vercel.app/api/v1/auth/med-verify'; 
const API_UNDIAN_URL = 'https://mohammadfaqihmunandarbe.vercel.app/api/v1/undian';

const WHEEL_COLORS = [
  '#2563eb', '#16a34a', '#d97706', '#dc2626', 
  '#9333ea', '#0891b2', '#4f46e5', '#ca8a04'
];

export default function UndianApp() {
  const [viewMode, setViewMode] = useState('wheel'); // 'wheel' | 'manager'
  const [activeEvent, setActiveEvent] = useState({
    id: 1,
    event_name: 'Undian Arisan',
    names_text: 'Faqih, Budi, Siti, Andi, Eka, Rani'
  });

  const [winners, setWinners] = useState([]); // List of winners from DB
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [spinDuration, setSpinDuration] = useState(6);

  // Search State with 500ms Debounce
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'spin' | 'manager'
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef(null);

  // Handle 500ms Debounce Search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // Fetch event details (including recorded winners) whenever activeEvent changes
  useEffect(() => {
    if (activeEvent?.id) {
      fetchEventDetails(activeEvent.id);
    }
  }, [activeEvent?.id]);

  const fetchEventDetails = async (eventId) => {
    try {
      const res = await fetch(`${API_UNDIAN_URL}/events/${eventId}/details`);
      const data = await res.json();
      if (data.success && data.winners) {
        setWinners(data.winners.map((w) => w.winner_name));
      } else {
        setWinners([]);
      }
    } catch (err) {
      console.error('Failed to load event details:', err);
    }
  };

  // Compute remaining participants who HAVEN'T won yet
  const getNamesList = () => {
    if (!activeEvent || !activeEvent.names_text) return [];
    const allNames = activeEvent.names_text.split(',').map((n) => n.trim()).filter(Boolean);
    return allNames.filter((name) => !winners.includes(name));
  };

  // Remove individual winner by clicking "x"
  const handleRemoveWinner = async (winnerName) => {
    try {
      await fetch(`${API_UNDIAN_URL}/remove-winner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: activeEvent.id,
          winnerName: winnerName
        })
      });
      setWinners((prev) => prev.filter((w) => w !== winnerName));
      if (winner === winnerName) setWinner(null);
    } catch (err) {
      console.error('Failed to remove winner:', err);
    }
  };

  // Canvas Drawing
  useEffect(() => {
    if (viewMode !== 'wheel') return;
    const list = getNamesList();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const center = width / 2;
    const radius = center - 10;

    ctx.clearRect(0, 0, width, height);

    if (list.length === 0) {
      ctx.beginPath();
      ctx.fillStyle = '#e2e8f0';
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Semua Menang!', center, center);
      return;
    }

    const arcSize = (2 * Math.PI) / list.length;

    list.forEach((name, index) => {
      const angle = index * arcSize;
      
      ctx.beginPath();
      ctx.fillStyle = WHEEL_COLORS[index % WHEEL_COLORS.length];
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + arcSize);
      ctx.lineTo(center, center);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(name, radius - 20, 5);
      ctx.restore();
    });
  }, [activeEvent, winners, viewMode]);

  // Record a winner in DB and exclude them from future spins
  const handleWinnerSpinComplete = async (winnerName) => {
    try {
      await fetch(`${API_UNDIAN_URL}/record-winner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: activeEvent.id,
          winnerName: winnerName
        })
      });
      setWinners((prev) => [...prev, winnerName]);
    } catch (err) {
      console.error('Failed to log winner:', err);
    }
  };

  const startSpinAnimation = () => {
    const list = getNamesList();
    if (list.length === 0 || isSpinning) return;

    setWinner(null);
    setIsSpinning(true);

    const duration = Math.floor(Math.random() * 4) + 5; 
    setSpinDuration(duration);

    const winnerIndex = Math.floor(Math.random() * list.length);
    const sliceAngle = 360 / list.length;

    const targetSliceCenter = (winnerIndex * sliceAngle) + (sliceAngle / 2);
    const stopAngle = (360 - targetSliceCenter + 270) % 360;

    const totalRotation = rotationDegree + (360 * 8) + (stopAngle - (rotationDegree % 360) + 360) % 360;

    setRotationDegree(totalRotation);

    setTimeout(() => {
      const selectedWinner = list[winnerIndex];
      setIsSpinning(false);
      setWinner(selectedWinner);
      handleWinnerSpinComplete(selectedWinner);
    }, duration * 1000);
  };

  // Require verification to open the Manager
  const handleOpenManager = () => {
    if (!isAuthenticated) {
      setPendingAction('manager');
      setShowLoginModal(true);
    } else {
      setViewMode('manager');
    }
  };

  // Require verification to spin the wheel
  const handleDrawClick = () => {
    if (!isAuthenticated) {
      setPendingAction('spin');
      setShowLoginModal(true);
    } else {
      startSpinAnimation();
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);

    try {
      const res = await fetch(API_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setShowLoginModal(false);
        
        if (pendingAction === 'manager') {
          setViewMode('manager');
        } else if (pendingAction === 'spin') {
          startSpinAnimation();
        }
        setPendingAction(null);
      } else {
        setAuthError(data.message || 'Authentication failed.');
      }
    } catch (err) {
      setAuthError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (viewMode === 'manager') {
    return (
      <UndianManager 
        onSelectEvent={(evt) => {
          setActiveEvent(evt);
          setViewMode('wheel');
          setWinner(null);
        }}
        onBack={() => {
          setViewMode('wheel');
          if (activeEvent?.id) fetchEventDetails(activeEvent.id);
        }}
      />
    );
  }

  const remainingList = getNamesList();

  const filteredRemaining = remainingList.filter((name) =>
    name.toLowerCase().includes(searchQuery)
  );

  const filteredWinners = winners.filter((name) =>
    name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container py-3">
      {/* Header Navigation */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h4 className="fw-bold text-primary mb-0">🎰 {activeEvent.event_name}</h4>
        <button 
          className="btn btn-outline-primary btn-sm fw-bold" 
          onClick={handleOpenManager}
        >
          ⚙️ Kelola / Tambah Undian & Riwayat
        </button>
      </div>

      {/* CENTERED & BIGGER WHEEL SECTION */}
      <div className="d-flex flex-column align-items-center justify-content-center mb-4">
        <div className="wheel-wrapper position-relative mb-3">
          <div className="wheel-pointer" />
          <canvas 
            ref={canvasRef} 
            width={420} 
            height={420}
            className="wheel-canvas shadow-sm rounded-circle"
            style={{
              transform: `rotate(${rotationDegree}deg)`,
              transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.15, 0.9, 0.2, 1)` : 'none'
            }}
          />
        </div>

        <button 
          className="btn btn-success btn-lg px-5 py-2 fw-bold shadow-sm" 
          onClick={handleDrawClick}
          disabled={isSpinning || remainingList.length === 0}
        >
          {isSpinning ? '🎡 Memutar Wheel...' : '🎉 Putar Wheel Undian'}
        </button>

        {winner && (
          <div className="alert alert-success mt-3 w-50 fw-bold fs-4 text-center border-2 shadow-sm">
            🏆 Selamat! Pemenang Baru: <br />
            <span className="text-decoration-underline text-primary">{winner}</span>
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* SEARCH CONTAINER */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text bg-white fw-bold">🔍 Search Peserta:</span>
            <input
              type="text"
              className="form-control"
              placeholder="Cari nama peserta (misal: faqih)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={() => setSearchInput('')}
              >
                ✕
              </button>
            )}
          </div>
          {searchInput && searchQuery !== searchInput.trim().toLowerCase() && (
            <small className="text-muted ms-1">Mencari dalam 500ms...</small>
          )}
        </div>
      </div>

      {/* PARTICIPANT & WINNER LISTS */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3 border-0 bg-light">
            <h6 className="fw-bold mb-2 text-primary">
              🎯 Peserta Belum Menang ({filteredRemaining.length}/{remainingList.length}):
            </h6>
            <div 
              className="d-flex flex-wrap gap-1 p-2 bg-white rounded border" 
              style={{ maxHeight: '220px', overflowY: 'auto' }}
            >
              {remainingList.length === 0 ? (
                <span className="badge bg-warning text-dark p-2 w-100 text-center">
                  🎉 Semua peserta telah menang!
                </span>
              ) : filteredRemaining.length === 0 ? (
                <span className="text-muted small p-2">Nama "{searchQuery}" tidak ditemukan.</span>
              ) : (
                filteredRemaining.map((name, idx) => (
                  <span key={idx} className="badge bg-primary p-2 fs-6">{name}</span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-3 border-0 bg-light">
            <h6 className="fw-bold mb-2 text-success">
              🏆 Pemenang Terdaftar ({filteredWinners.length}/{winners.length}):
            </h6>
            <div 
              className="d-flex flex-wrap gap-1 p-2 bg-white rounded border" 
              style={{ maxHeight: '220px', overflowY: 'auto' }}
            >
              {winners.length === 0 ? (
                <span className="text-muted small p-2">Belum ada pemenang diundi.</span>
              ) : filteredWinners.length === 0 ? (
                <span className="text-muted small p-2">Nama "{searchQuery}" tidak ditemukan.</span>
              ) : (
                filteredWinners.map((w, idx) => (
                  <span key={idx} className="badge bg-success p-2 fs-6 d-inline-flex align-items-center gap-1">
                    <span>✓ {w}</span>
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-1"
                      style={{ width: '0.5em', height: '0.5em', fontSize: '0.65rem' }}
                      aria-label="Batalkan Pemenang"
                      onClick={() => handleRemoveWinner(w)}
                    />
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title font-monospace fw-bold">🔑 Login Otorisasi Undian</h5>
                <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)} />
              </div>
              <form onSubmit={handleLoginSubmit}>
                <div className="modal-body">
                  {authError && <div className="alert alert-danger py-2">{authError}</div>}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      required 
                      value={credentials.email} 
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      required 
                      value={credentials.password} 
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowLoginModal(false)}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Memverifikasi...' : 'Otorisasi & Lanjutkan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}