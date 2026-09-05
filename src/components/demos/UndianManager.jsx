import React, { useState, useEffect } from 'react';

const API_UNDIAN_URL = 'https://mohammadfaqihmunandarbe.vercel.app/api/v1/undian';

// Clean Inline SVG Icons (Zero Emojis)
const Icons = {
  Gear: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  FileText: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  Trophy: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path>
    </svg>
  ),
  Refresh: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Save: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  ),
  ChevronUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ms-1">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ms-1">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
};

export default function UndianManager({ onSelectEvent, onBack }) {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [showAddForm, setShowAddForm] = useState(false);

  const [newEventName, setNewEventName] = useState('');
  const [participantInput, setParticipantInput] = useState('');
  const [participantsList, setParticipantsList] = useState([]);
  const [participantError, setParticipantError] = useState('');
  const [newKeepOneDay, setNewKeepOneDay] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);
  const [editEventName, setEditEventName] = useState('');
  const [editParticipantsList, setEditParticipantsList] = useState([]);
  const [editParticipantInput, setEditParticipantInput] = useState('');
  const [editParticipantError, setEditParticipantError] = useState('');
  const [editSearchQuery, setEditSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_UNDIAN_URL}/events`);
      const data = await res.json();
      
      if (data.success && data.data && data.data.length > 0) {
        setEvents(data.data);
        const targetId = selectedEventId || data.data[0].id;
        loadEventDetails(targetId);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Error fetching undian events:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadEventDetails = async (id) => {
    setSelectedEventId(id);
    try {
      const res = await fetch(`${API_UNDIAN_URL}/events/${id}/details`);
      const data = await res.json();
      if (data.success) {
        setEventDetails(data);
      }
    } catch (err) {
      console.error('Error loading undian details:', err);
    }
  };

  const getUniqueWinners = () => {
    if (!eventDetails || !eventDetails.winners) return [];
    const uniqueMap = new Map();
    eventDetails.winners.forEach((w) => {
      if (!uniqueMap.has(w.winner_name)) {
        uniqueMap.set(w.winner_name, w);
      }
    });
    return Array.from(uniqueMap.values());
  };

  const handleAddParticipant = (e) => {
    e.preventDefault();
    setParticipantError('');

    const trimmedName = participantInput.trim();
    if (!trimmedName) return;

    const isDuplicate = participantsList.some(
      (name) => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setParticipantError(`Nama "${trimmedName}" sudah terdaftar dalam daftar peserta!`);
      return;
    }

    setParticipantsList((prev) => [...prev, trimmedName]);
    setParticipantInput('');
  };

  const handleRemoveParticipantTag = (indexToRemove) => {
    setParticipantsList((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleOpenEditModal = (evt, e) => {
    e.stopPropagation();
    setEditingEvent(evt);
    setEditEventName(evt.event_name);
    const parsedNames = evt.names_text ? evt.names_text.split(',').map(n => n.trim()).filter(Boolean) : [];
    setEditParticipantsList(parsedNames);
    setEditParticipantInput('');
    setEditParticipantError('');
    setEditSearchQuery('');
  };

  const handleAddEditParticipant = (e) => {
    e.preventDefault();
    setEditParticipantError('');

    const trimmedName = editParticipantInput.trim();
    if (!trimmedName) return;

    const isDuplicate = editParticipantsList.some(
      (name) => name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setEditParticipantError(`Nama "${trimmedName}" sudah terdaftar!`);
      return;
    }

    setEditParticipantsList((prev) => [...prev, trimmedName]);
    setEditParticipantInput('');
  };

  const handleDeleteEditParticipant = (nameToDelete) => {
    setEditParticipantsList((prev) => prev.filter((name) => name !== nameToDelete));
  };

  const handleSaveEditEvent = async (e) => {
    e.preventDefault();
    if (!editEventName.trim()) return alert('Nama event tidak boleh kosong!');
    if (editParticipantsList.length === 0) return alert('Daftar peserta tidak boleh kosong!');

    const namesText = editParticipantsList.join(', ');

    try {
      const res = await fetch(`${API_UNDIAN_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: editEventName,
          namesText: namesText,
          keepOneDay: editingEvent.keep_one_day || false
        })
      });

      const data = await res.json();
      if (data.success) {
        await fetch(`${API_UNDIAN_URL}/events/${editingEvent.id}`, { method: 'DELETE' });
        setEditingEvent(null);
        fetchEvents();
      }
    } catch (err) {
      alert('Gagal memperbarui event undian.');
    }
  };

  const handleRemoveWinner = async (winnerName) => {
    if (!window.confirm(`Batalkan status pemenang untuk "${winnerName}"?`)) return;

    try {
      await fetch(`${API_UNDIAN_URL}/remove-winner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEventId,
          winnerName: winnerName
        })
      });
      loadEventDetails(selectedEventId);
    } catch (err) {
      console.error('Gagal menghapus pemenang:', err);
    }
  };

  const handleResetWinners = async () => {
    if (!window.confirm('Apakah Anda yakin ingin mereset semua pemenang untuk event ini?')) return;

    try {
      await fetch(`${API_UNDIAN_URL}/reset-winners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: selectedEventId })
      });
      loadEventDetails(selectedEventId);
    } catch (err) {
      console.error('Gagal mereset pemenang:', err);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEventName) return alert('Isi nama event terlebih dahulu!');
    if (participantsList.length === 0) return alert('Tambahkan minimal 1 peserta!');

    const namesText = participantsList.join(', ');

    try {
      const res = await fetch(`${API_UNDIAN_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: newEventName,
          namesText: namesText,
          keepOneDay: newKeepOneDay
        })
      });
      const data = await res.json();
      if (data.success) {
        setNewEventName('');
        setParticipantsList([]);
        setParticipantInput('');
        setNewKeepOneDay(false);
        setShowAddForm(false);
        fetchEvents();
      }
    } catch (err) {
      alert('Gagal membuat undian baru');
    }
  };

  const handleDeleteEvent = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Hapus undian ini beserta seluruh riwayat pemenang?')) return;
    try {
      await fetch(`${API_UNDIAN_URL}/events/${id}`, { method: 'DELETE' });
      setSelectedEventId(null);
      setEventDetails(null);
      fetchEvents();
    } catch (err) {
      alert('Gagal menghapus event');
    }
  };

  const getRemainingParticipants = () => {
    if (!eventDetails || !eventDetails.event) return [];
    const allNames = eventDetails.event.names_text.split(',').map(n => n.trim()).filter(Boolean);
    const uniqueWinners = getUniqueWinners();
    const winnerNames = uniqueWinners.map(w => w.winner_name);
    return allNames.filter(name => !winnerNames.includes(name));
  };

  const uniqueWinnersList = getUniqueWinners();
  const remainingParticipants = getRemainingParticipants();

  const filteredEditParticipants = editParticipantsList.filter((name) =>
    name.toLowerCase().includes(editSearchQuery.trim().toLowerCase())
  );

  return (
    <div className="container py-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h4 className="fw-bold mb-0 text-primary d-flex align-items-center">
          <Icons.Gear />
          Pengelola Data & Riwayat Undian
        </h4>
        <button className="btn btn-outline-secondary btn-sm d-flex align-items-center fw-bold" onClick={onBack}>
          <Icons.ArrowLeft /> Kembali ke Wheel
        </button>
      </div>

      {/* TOP PART: Dropdown Accordion to Add New Undian */}
      <div className="card shadow-sm mb-4 border-0 bg-light">
        <div 
          className="card-header bg-white d-flex justify-content-between align-items-center py-3"
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ cursor: 'pointer' }}
        >
          <span className="fw-bold text-success mb-0 d-flex align-items-center">
            <Icons.Plus /> Tambah Undian Baru / Form Event
          </span>
          <button className="btn btn-sm btn-outline-success d-flex align-items-center">
            {showAddForm ? <>Sembunyikan Form <Icons.ChevronUp /></> : <>Buka Form Tambah <Icons.ChevronDown /></>}
          </button>
        </div>

        {showAddForm && (
          <div className="card-body">
            <form onSubmit={handleCreateEvent}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Nama Event:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Contoh: Undian Agustusan / Undian Arisan"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <div className="form-check mt-4">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="keepCheck"
                      checked={newKeepOneDay}
                      onChange={(e) => setNewKeepOneDay(e.target.checked)}
                    />
                    <label className="form-check-label small" htmlFor="keepCheck">
                      Simpan 1 hari saja (24 jam)
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Tambah Peserta Undian Baru:</label>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Masukkan nama peserta (contoh: Faqih)..."
                      value={participantInput}
                      onChange={(e) => {
                        setParticipantInput(e.target.value);
                        if (participantError) setParticipantError('');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddParticipant(e);
                        }
                      }}
                    />
                    <button 
                      className="btn btn-success fw-bold d-flex align-items-center" 
                      type="button"
                      onClick={handleAddParticipant}
                    >
                      <Icons.Plus /> Tambah
                    </button>
                  </div>

                  {participantError && (
                    <div className="alert alert-danger py-1 px-2 mt-2 mb-0 small fw-bold d-flex align-items-center">
                      <Icons.AlertTriangle /> {participantError}
                    </div>
                  )}

                  <div className="mt-3 p-2 bg-white rounded border" style={{ minHeight: '60px' }}>
                    <small className="text-muted d-block mb-1">Daftar Peserta Terdaftar ({participantsList.length}):</small>
                    {participantsList.length === 0 ? (
                      <span className="text-muted small italic">Belum ada peserta ditambahkan.</span>
                    ) : (
                      <div className="d-flex flex-wrap gap-1">
                        {participantsList.map((name, index) => (
                          <span key={index} className="badge bg-primary p-2 d-inline-flex align-items-center gap-1">
                            {name}
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-1"
                              style={{ width: '0.5em', height: '0.5em', fontSize: '0.65rem' }}
                              aria-label="Hapus Peserta"
                              onClick={() => handleRemoveParticipantTag(index)}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-success fw-bold px-4">
                    Simpan Undian Baru
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* BOTTOM PART: Existing Events & Winner History */}
      <div className="row g-4">
        {/* Left Column: Existing Events List */}
        <div className="col-md-5">
          <div className="card shadow-sm p-3 border-0">
            <h6 className="fw-bold mb-3 d-flex align-items-center text-primary">
              <Icons.FileText /> Daftar Event Undian Tersedia
            </h6>
            {loading ? (
              <div className="text-center py-3">
                <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                <span className="ms-2 small text-muted">Memuat data dari database...</span>
              </div>
            ) : events.length === 0 ? (
              <p className="text-muted small mb-0">Belum ada undian tersimpan.</p>
            ) : (
              <div className="list-group">
                {events.map((evt) => (
                  <div 
                    key={evt.id} 
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                      selectedEventId === evt.id ? 'active' : ''
                    }`}
                    onClick={() => loadEventDetails(evt.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <div className="fw-bold">{evt.event_name}</div>
                      <small className={selectedEventId === evt.id ? 'text-white-50' : 'text-muted'}>
                        {evt.names_text.split(',').filter(Boolean).length} Peserta
                      </small>
                    </div>
                    <div className="d-flex gap-1">
                      <button 
                        className="btn btn-sm btn-light text-primary fw-bold"
                        onClick={(e) => { e.stopPropagation(); onSelectEvent(evt); }}
                        title="Gunakan Event Ini"
                      >
                        Gunakan
                      </button>
                      <button 
                        className="btn btn-sm btn-warning fw-bold text-dark d-flex align-items-center"
                        onClick={(e) => handleOpenEditModal(evt, e)}
                        title="Edit Peserta & Event"
                      >
                        <Icons.Edit /> Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-danger d-flex align-items-center"
                        onClick={(e) => handleDeleteEvent(evt.id, e)}
                        title="Hapus Event"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Undian Detail & Tables */}
        <div className="col-md-7">
          {eventDetails ? (
            <div className="card shadow-sm p-3 border-0">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-primary mb-0 d-flex align-items-center">
                  <Icons.Trophy /> Detail & Riwayat: {eventDetails.event.event_name}
                </h5>
                <button 
                  className="btn btn-primary btn-sm fw-bold"
                  onClick={() => onSelectEvent(eventDetails.event)}
                >
                  Putar Wheel Ini
                </button>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold text-success mb-0">Pemenang Terdaftar ({uniqueWinnersList.length}):</h6>
                {uniqueWinnersList.length > 0 && (
                  <button 
                    className="btn btn-sm btn-outline-danger fw-bold py-0 d-flex align-items-center"
                    onClick={handleResetWinners}
                  >
                    <Icons.Refresh /> Reset Semua Pemenang
                  </button>
                )}
              </div>

              {uniqueWinnersList.length > 0 ? (
                <div className="table-responsive mb-4">
                  <table className="table table-sm table-striped border align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Nama Pemenang</th>
                        <th>Tanggal & Waktu</th>
                        <th className="text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uniqueWinnersList.map((w, idx) => (
                        <tr key={w.id || idx}>
                          <td>{idx + 1}</td>
                          <td className="fw-bold text-success">{w.winner_name}</td>
                          <td className="small">
                            {w.won_at ? new Date(w.won_at).toLocaleString('id-ID') : '-'}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-danger py-0 px-2 fw-bold"
                              title="Batalkan Pemenang Ini"
                              onClick={() => handleRemoveWinner(w.winner_name)}
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted small italic mb-4">Belum ada pemenang diundi untuk event ini.</p>
              )}

              <h6 className="fw-bold text-secondary mb-2">
                Peserta Belum Menang ({remainingParticipants.length}):
              </h6>
              <div className="d-flex flex-wrap gap-1 align-items-center">
                {remainingParticipants.length === 0 ? (
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-warning text-dark p-2">Semua peserta telah menang!</span>
                    <button 
                      className="btn btn-sm btn-outline-danger fw-bold rounded-pill px-3 d-flex align-items-center"
                      onClick={handleResetWinners}
                    >
                      <Icons.Refresh /> Reset Pemenang
                    </button>
                  </div>
                ) : (
                  remainingParticipants.map((name, i) => (
                    <span key={i} className="badge bg-secondary p-2">{name}</span>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="alert alert-info text-center py-4">
              Pilih event di sebelah kiri untuk melihat detail.
            </div>
          )}
        </div>
      </div>

      {/* EDIT EVENT & PESERTA MODAL */}
      {editingEvent && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title fw-bold d-flex align-items-center">
                  <Icons.Edit /> Edit Peserta & Event Undian
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setEditingEvent(null)} 
                />
              </div>
              <form onSubmit={handleSaveEditEvent}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nama Event:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editEventName} 
                      onChange={(e) => setEditEventName(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Tambah / Tulis Ulang Peserta Baru:</label>
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ketik nama peserta baru..."
                        value={editParticipantInput} 
                        onChange={(e) => {
                          setEditParticipantInput(e.target.value);
                          if (editParticipantError) setEditParticipantError('');
                        }} 
                      />
                      <button 
                        type="button" 
                        className="btn btn-success fw-bold d-flex align-items-center"
                        onClick={handleAddEditParticipant}
                      >
                        <Icons.Plus /> Tambah Peserta
                      </button>
                    </div>
                    {editParticipantError && (
                      <div className="alert alert-danger py-1 px-2 mt-2 mb-0 small fw-bold d-flex align-items-center">
                        <Icons.AlertTriangle /> {editParticipantError}
                      </div>
                    )}
                  </div>

                  <hr />

                  <div className="mb-2">
                    <div className="input-group">
                      <span className="input-group-text bg-white fw-bold d-flex align-items-center">
                        <Icons.Search /> Cari Nama:
                      </span>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Filter nama (misal: faqih)..." 
                        value={editSearchQuery}
                        onChange={(e) => setEditSearchQuery(e.target.value)}
                      />
                      {editSearchQuery && (
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={() => setEditSearchQuery('')}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="card bg-light border p-2 mt-2">
                    <small className="fw-bold text-muted mb-2 d-block">
                      Daftar Peserta Terdaftar ({filteredEditParticipants.length}/{editParticipantsList.length}):
                    </small>
                    <div className="d-flex flex-wrap gap-1 p-2 bg-white rounded border" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                      {editParticipantsList.length === 0 ? (
                        <span className="text-muted small p-2">Belum ada peserta.</span>
                      ) : filteredEditParticipants.length === 0 ? (
                        <span className="text-muted small p-2">Nama "{editSearchQuery}" tidak ditemukan.</span>
                      ) : (
                        filteredEditParticipants.map((name, idx) => (
                          <span key={idx} className="badge bg-primary p-2 fs-6 d-inline-flex align-items-center gap-1">
                            <span>{name}</span>
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-1"
                              style={{ width: '0.5em', height: '0.5em', fontSize: '0.65rem' }}
                              aria-label="Hapus Nama"
                              onClick={() => handleDeleteEditParticipant(name)}
                              title="Hapus Peserta Ini"
                            />
                          </span>
                        ))
                      )}
                    </div>
                    <small className="text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                      * Klik tanda <strong>✕</strong> pada badge nama untuk menghapus peserta tersebut.
                    </small>
                  </div>
                </div>

                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setEditingEvent(null)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn btn-warning fw-bold d-flex align-items-center">
                    <Icons.Save /> Simpan Perubahan Event
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