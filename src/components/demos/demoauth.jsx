import React, { useState } from 'react';

// Live Production Vercel Base API URL
const API_BASE_URL = 'https://mohammadfaqihmunandarbe.vercel.app/api/v1/auth';

// Utility function to generate HMAC-SHA256 signature in browser
const generateHMACSignature = async (payload, timestamp, secretKey) => {
  const encoder = new TextEncoder();
  const message = JSON.stringify(payload) + timestamp;
  
  const keyBuffer = encoder.encode(secretKey);
  const messageBuffer = encoder.encode(message);

  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await window.crypto.subtle.sign('HMAC', cryptoKey, messageBuffer);
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  return signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export default function DemoAuth() {
  const [activeTab, setActiveTab] = useState('register');
  const [logs, setLogs] = useState([]);

  // Form States
  const [regData, setRegData] = useState({ username: '', email: '', password: '' });
  const [lowSecretKey, setLowSecretKey] = useState('');
  const [medData, setMedData] = useState({ email: '', password: '' });
  const [hmacSecretKey, setHmacSecretKey] = useState('');
  const [highPayload, setHighPayload] = useState('{"action": "FETCH_SENSITIVE_DATA"}');

  const addLog = (title, data, isError = false) => {
    setLogs(prev => [
      { id: Date.now(), title, data, isError, time: new Date().toLocaleTimeString() },
      ...prev
    ]);
  };

  // 1. REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
      const data = await res.json();
      addLog('POST /register', data, !res.ok);
    } catch (err) {
      addLog('POST /register Error', { error: err.message }, true);
    }
  };

  // 2. LOW SECURITY VERIFY
  const handleLowVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/low-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretKey: lowSecretKey })
      });
      const data = await res.json();
      addLog('POST /low-verify', data, !res.ok);
    } catch (err) {
      addLog('POST /low-verify Error', { error: err.message }, true);
    }
  };

  // 3. MEDIUM SECURITY VERIFY
  const handleMedVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/med-verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medData)
      });
      const data = await res.json();
      addLog('POST /med-verify', data, !res.ok);
    } catch (err) {
      addLog('POST /med-verify Error', { error: err.message }, true);
    }
  };

  // 4. HIGH SECURITY VERIFY (HMAC)
  const handleHighVerify = async (e) => {
    e.preventDefault();
    try {
      let parsedPayload;
      try {
        parsedPayload = JSON.parse(highPayload);
      } catch (pErr) {
        addLog('HMAC Error', { error: 'Invalid JSON payload input' }, true);
        return;
      }

      const timestamp = Date.now().toString();
      const signature = await generateHMACSignature(parsedPayload, timestamp, hmacSecretKey);

      const res = await fetch(`${API_BASE_URL}/high-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-signature': signature,
          'x-timestamp': timestamp
        },
        body: JSON.stringify(parsedPayload)
      });
      const data = await res.json();
      addLog('POST /high-verify (HMAC)', { sentHeaders: { 'x-signature': signature, 'x-timestamp': timestamp }, response: data }, !res.ok);
    } catch (err) {
      addLog('POST /high-verify Error', { error: err.message }, true);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Authentication Demo (Low to High Security)</h2>
      
      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['register', 'low', 'medium', 'high'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #ccc',
              background: activeTab === tab ? '#0070f3' : '#f4f4f4',
              color: activeTab === tab ? '#fff' : '#333',
              fontWeight: 'bold'
            }}
          >
            {tab.toUpperCase()} SECURITY
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Active Form */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          
          {/* TAB 1: REGISTER */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister}>
              <h3>Step 1: User Registration</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Populate initial user records into cloud database.</p>
              <div style={{ marginBottom: '12px' }}>
                <label>Username:</label>
                <input
                  type="text"
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  value={regData.username}
                  onChange={e => setRegData({ ...regData, username: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label>Email:</label>
                <input
                  type="email"
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  value={regData.email}
                  onChange={e => setRegData({ ...regData, email: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Password:</label>
                <input
                  type="password"
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  value={regData.password}
                  onChange={e => setRegData({ ...regData, password: e.target.value })}
                />
              </div>
              <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Register User</button>
            </form>
          )}

          {/* TAB 2: LOW SECURITY */}
          {activeTab === 'low' && (
            <form onSubmit={handleLowVerify}>
              <h3>Step 2: Low Security Check</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Validates shared secret key against `JWT_SECRET`.</p>
              <div style={{ marginBottom: '16px' }}>
                <label>Secret Key:</label>
                <input
                  type="text"
                  required
                  placeholder="Enter secret key..."
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  value={lowSecretKey}
                  onChange={e => setLowSecretKey(e.target.value)}
                />
              </div>
              <button type="submit" style={{ padding: '10px 20px', background: '#17a2b8', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Verify Secret Key</button>
            </form>
          )}

          {/* TAB 3: MEDIUM SECURITY */}
          {activeTab === 'medium' && (
            <form onSubmit={handleMedVerify}>
              <h3>Step 3: Medium Security Login</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Bcrypt password comparison + Rate Limiter protection (5 max tries).</p>
              <div style={{ marginBottom: '12px' }}>
                <label>Email:</label>
                <input
                  type="email"
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  value={medData.email}
                  onChange={e => setMedData({ ...medData, email: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>Password:</label>
                <input
                  type="password"
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  value={medData.password}
                  onChange={e => setMedData({ ...medData, password: e.target.value })}
                />
              </div>
              <button type="submit" style={{ padding: '10px 20px', background: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Login & Verify</button>
            </form>
          )}

          {/* TAB 4: HIGH SECURITY (HMAC) */}
          {activeTab === 'high' && (
            <form onSubmit={handleHighVerify}>
              <h3>Step 4: High Security (Zero-Trust HMAC)</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>Generates dynamic SHA-256 HMAC signature using secret key and timestamp.</p>
              <div style={{ marginBottom: '12px' }}>
                <label>HMAC Secret Key:</label>
                <input
                  type="password"
                  required
                  placeholder="Enter HMAC Secret..."
                  style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                  value={hmacSecretKey}
                  onChange={e => setHmacSecretKey(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label>JSON Payload:</label>
                <textarea
                  rows="3"
                  style={{ width: '100%', padding: '8px', marginTop: '4px', fontFamily: 'monospace' }}
                  value={highPayload}
                  onChange={e => setHighPayload(e.target.value)}
                />
              </div>
              <button type="submit" style={{ padding: '10px 20px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sign & Verify Request</button>
            </form>
          )}

        </div>

        {/* Live Response Logs */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#1e1e1e', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ margin: 0 }}>Console Response Log</h3>
            <button onClick={() => setLogs([])} style={{ background: '#555', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Clear</button>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {logs.length === 0 ? (
              <p style={{ color: '#888', fontStyle: 'italic' }}>No requests sent yet...</p>
            ) : (
              logs.map(log => (
                <div key={log.id} style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #333' }}>
                  <div style={{ color: log.isError ? '#ff6b6b' : '#51cf66', fontWeight: 'bold' }}>
                    [{log.time}] {log.title}
                  </div>
                  <pre style={{ margin: '4px 0 0 0', fontSize: '12px', whiteSpace: 'pre-wrap', color: '#ddd' }}>
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}