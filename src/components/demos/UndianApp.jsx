import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import UndianManager from './UndianManager';

const API_AUTH_URL = 'https://mohammadfaqihmunandarbe.vercel.app/api/v1/auth/med-verify'; 
const API_UNDIAN_URL = 'https://mohammadfaqihmunandarbe.vercel.app/api/v1/undian';

const WHEEL_COLORS = [
  '#2563eb', '#16a34a', '#d97706', '#dc2626', 
  '#9333ea', '#0891b2', '#4f46e5', '#ca8a04'
];

// Clean Inline SVG Icons (No Emojis & No External Font Libraries)
const Icons = {
  Ticket: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
      <path d="M13 5v2"></path><path d="M13 11v2"></path><path d="M13 17v2"></path>
    </svg>
  ),
  Gear: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  Play: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-2">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  ),
  Spinner: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2 spinner-border spinner-border-sm">
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
  ),
  Trophy: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  UserCheck: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <polyline points="17 11 19 13 23 9"></polyline>
    </svg>
  ),
  UserClock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <circle cx="18" cy="11" r="3"></circle>
      <polyline points="18 10 18 11 19 11"></polyline>
    </svg>
  ),
  Lock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  )
};

export default function UndianApp() {
  const [viewMode, setViewMode] = useState('wheel');
  const [activeEvent, setActiveEvent] = useState({
    id: 1,
    event_name: 'Undian Arisan',
    names_text: 'Faqih, Budi, Siti, Andi, Eka, Rani'
  });

  const [winners, setWinners] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [spinDuration, setSpinDuration] = useState(6);

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput.trim().toLowerCase());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

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

  const getNamesList = () => {
    if (!activeEvent || !activeEvent.names_text) return [];
    const allNames = activeEvent.names_text.split(',').map((n) => n.trim()).filter(Boolean);
    return allNames.filter((name) => !winners.includes(name));
  };

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

  // Canvas Wheel Drawing
  useEffect(() => {
    if (viewMode !== 'wheel') return;
    const list = getNamesList();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const center = width / 2;
    const radius = center - 12;

    ctx.clearRect(0, 0, width, height);

    if (list.length === 0) {
      ctx.beginPath();
      ctx.fillStyle = '#f1f5f9';
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Semua Peserta Menang!', center, center);
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
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4;
      ctx.fillText(name, radius - 24, 5);
      ctx.restore();
    });
  }, [activeEvent, winners, viewMode]);

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

      // Trigger Confetti Blast on Winner Win
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

    }, duration * 1000);
  };

  const handleOpenManager = () => {
    if (!isAuthenticated) {
      setPendingAction('manager');
      setShowLoginModal(true);
    } else {
      setViewMode('manager');
    }
  };

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
        <h4 className="fw-bold text-primary mb-0 d-flex align-items-center">
          <Icons.Ticket />
          {activeEvent.event_name}
        </h4>
        <button 
          className="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center" 
          onClick={handleOpenManager}
        >
          <Icons.Gear />
        </button>
      </div>

      {/* WHEEL SECTION */}
      <div className="d-flex flex-column align-items-center justify-content-center mb-4">
        
        {/* Outer Chromed Wheel Holder */}
        <div 
          className="position-relative mb-4 p-2 rounded-circle"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
            boxShadow: '0 12px 30px rgba(99, 102, 241, 0.25)'
          }}
        >
          {/* Wheel Pointer */}
          <div 
            style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '26px solid #ef4444',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
              zIndex: 10
            }}
          />

          <canvas 
            ref={canvasRef} 
            width={400} 
            height={400}
            className="rounded-circle bg-white"
            style={{
              transform: `rotate(${rotationDegree}deg)`,
              transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.15, 0.9, 0.2, 1)` : 'none'
            }}
          />
        </div>

        {/* Spin Button */}
        <button 
          className="btn btn-emerald btn-lg px-5 py-2 fw-bold shadow d-flex align-items-center text-white" 
          style={{ backgroundColor: '#10b981', borderColor: '#059669', fontSize: '1.2rem' }}
          onClick={handleDrawClick}
          disabled={isSpinning || remainingList.length === 0}
        >
          {isSpinning ? <Icons.Spinner /> : <Icons.Play />}
          {isSpinning ? 'Memutar Wheel...' : 'Putar Undian'}
        </button>

        {/* Winner Banner */}
        {winner && (
          <div 
            className="card mt-4 p-3 w-50 border-0 text-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              border: '2px solid #10b981'
            }}
          >
            <div className="d-flex align-items-center justify-content-center fw-bold text-success fs-5">
              <Icons.Trophy />
              Selamat! Pemenang Baru:
            </div>
            <div className="fs-3 fw-bold text-primary mt-1">{winner}</div>
          </div>
        )}
      </div>

      <hr className="my-4" />

      {/* SEARCH CONTAINER */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <Icons.Search />
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
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
        </div>
      </div>

      {/* PARTICIPANT & WINNER LISTS */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3 border-0 bg-light">
            <h6 className="fw-bold mb-2 text-primary d-flex align-items-center">
              <Icons.UserClock />
              Peserta Belum Menang ({filteredRemaining.length}/{remainingList.length + winners.length}):
            </h6>
            <div 
              className="d-flex flex-wrap gap-1 p-2 bg-white rounded border" 
              style={{ maxHeight: '220px', overflowY: 'auto' }}
            >
              {remainingList.length === 0 ? (
                <span className="badge bg-warning text-dark p-2 w-100 text-center">
                  Semua peserta telah menang!
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
            <h6 className="fw-bold mb-2 text-success d-flex align-items-center">
              <Icons.UserCheck />
              Peserta Sudah Menang ({filteredWinners.length}/{remainingList.length + winners.length}):
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
                <h5 className="modal-title font-monospace fw-bold d-flex align-items-center">
                  <Icons.Lock /> Login Otorisasi Undian
                </h5>
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