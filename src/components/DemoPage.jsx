import React, { useState, useEffect } from 'react';
import CalculatorApp from './demos/CalculatorApp';
import UndianApp from './demos/UndianApp';
import TodoApp from './demos/TodoApp';
import WeatherApp from './demos/WeatherApp';
import TimerApp from './demos/TimerApp';
import CurrencyConverterApp from './demos/CurrencyConverterApp';

export default function DemoPage({ onBack }) {
  const [activeApp, setActiveApp] = useState('calculator');
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dynamically inject Bootstrap 5 CSS & JS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    link.id = 'bootstrap-demo-css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.id = 'bootstrap-demo-js';
    document.body.appendChild(script);

    return () => {
      document.getElementById('bootstrap-demo-css')?.remove();
      document.getElementById('bootstrap-demo-js')?.remove();
    };
  }, []);

  const menuItems = [
    { id: 'calculator', name: 'Kalkulator', icon: '📱', badge: 'State Management' },
    { id: 'undian', name: 'Acak Undian', icon: '🎰', badge: 'Random Logic' },
    { id: 'todo', name: 'Daftar Catatan', icon: '📝', badge: 'LocalStorage Sync' },
    { id: 'weather', name: 'Cuaca Realtime', icon: '🌤️', badge: 'REST API Integration' },
    { id: 'timer', name: 'Stopwatch & Timer', icon: '⏱️', badge: 'Custom React Hooks' },
    { id: 'currency', name: 'Konversi Mata Uang', icon: '💱', badge: 'Fetch Live API' },
  ];

  const contactLinks = [
    { name: 'Email', icon: '✉️', href: 'mailto:faqihmunandar479@gmail.com', badgeClass: 'bg-danger-subtle text-danger' },
    { name: 'WhatsApp', icon: '💬', href: 'https://wa.me/6289630286950', badgeClass: 'bg-success-subtle text-success' },
    { name: 'Instagram', icon: '📸', href: 'https://instagram.com/faqihmunandar', badgeClass: 'bg-warning-subtle text-warning' },
    { name: 'Facebook', icon: '🌐', href: 'https://facebook.com/faqihmunandar9', badgeClass: 'bg-primary-subtle text-primary' },
  ];

  const handleSelectApp = (id) => {
    setActiveApp(id);
    const offcanvasEl = document.getElementById('sidebarOffcanvas');
    if (window.bootstrap && offcanvasEl) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }

    // Backdrop cleanup for mobile
    setTimeout(() => {
      document.querySelectorAll('.offcanvas-backdrop').forEach((backdrop) => backdrop.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }, 150);
  };

  const renderProfileHeader = () => (
    <div className="pb-3 mb-3 border-bottom px-1">
      {/* Profile Info */}
      <div className="d-flex align-items-center gap-3">
        <img
          src="oldme.jpg" 
          alt="Mohammad Faqih Munandar"
          className="rounded-circle border flex-shrink-0"
          style={{ width: '48px', height: '48px', objectFit: 'cover' }}
        />
        <div className="flex-grow-1 text-wrap">
          <h6 className="fw-bold mb-0 lh-sm" style={{ fontSize: '0.95rem' }}>
            Mohammad Faqih Munandar
          </h6>
          <span className="text-muted d-block mt-1" style={{ fontSize: '0.75rem' }}>
            Software Engineer
          </span>
          <span className="text-muted d-block text-break" style={{ fontSize: '0.72rem' }}>
            faqihmunandar479@gmail.com
          </span>
        </div>
      </div>
    </div>
  );

  const renderSidebarLinks = () => (
    <div className="list-group list-group-flush w-100">
      {menuItems.map((item) => {
        const isActive = activeApp === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`list-group-item list-group-item-action border-0 py-2 px-3 rounded-3 mb-1 transition-all ${
              isActive ? 'bg-primary-subtle text-primary' : 'text-body'
            }`}
            onClick={() => handleSelectApp(item.id)}
          >
            <div
              className="d-grid align-items-center"
              style={{ gridTemplateColumns: '32px 1fr' }}
            >
              {/* Icon Container with Fixed Width */}
              <div className="fs-5 d-flex align-items-center justify-content-start">
                {item.icon}
              </div>

              {/* Stacked Menu Title and Subtitle */}
              <div className="text-start">
                <div
                  className={`lh-sm ${isActive ? 'fw-bold' : 'fw-semibold'}`}
                  style={{ fontSize: '0.9rem' }}
                >
                  {item.name}
                </div>
                <small
                  className={`d-block ${isActive ? 'text-primary' : 'text-muted'}`}
                  style={{ fontSize: '0.73rem', opacity: 0.85 }}
                >
                  {item.badge}
                </small>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      data-bs-theme={darkMode ? 'dark' : 'light'}
      className="bg-body-tertiary min-vh-100 position-relative transition-all"
    >
      {/* Fixed Left Sidebar for Desktop */}
      <aside
        className="d-none d-md-flex flex-column position-fixed top-0 start-0 bottom-0 bg-body border-end shadow-sm p-3 z-3"
        style={{ width: '280px' }}
      >
        {/* Desktop Brand Header */}
        <div className="pb-3 mb-3 border-bottom d-flex align-items-center justify-content-between px-1">
          <span className="fs-4 fw-bold d-flex align-items-center gap-2">
            <span>🚀</span> MFM.Apps
          </span>
        </div>

        {/* Profile Card Header */}
        {renderProfileHeader()}

        {/* Scrollable Navigation Menu */}
        <div className="flex-grow-1 overflow-y-auto pe-1">
          {renderSidebarLinks()}
        </div>

        {/* Pinned Bottom Button */}
        <div className="pt-3 border-top mt-auto">
          <button className="btn btn-outline-primary btn-sm w-100 rounded-pill py-2" onClick={onBack}>
            ← Kembali ke Portfolio
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ps-0 ps-md-280" style={{ paddingLeft: '0' }}>
        <style>{`
          @media (min-width: 768px) {
            .ps-md-280 {
              padding-left: 280px !important;
            }
          }
        `}</style>

        {/* Top Header Navigation */}
        <nav className="navbar bg-body shadow-sm mb-4 sticky-top border-bottom border-body-subtle px-3 px-md-4">
          <div className="container-fluid d-flex align-items-center justify-content-between">
            {/* Left: Dark/Light Mode Switcher */}
            <div className="d-flex align-items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn btn-outline-secondary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                title="Toggle Dark/Light Mode"
                aria-label="Toggle Theme"
              >
                <span className="fs-6">{darkMode ? '☀️' : '🌙'}</span>
              </button>
            </div>

            {/* Center: Brand Title (Mobile Only Header) */}
            <div className="d-md-none position-absolute start-50 translate-middle-x">
              <span className="navbar-brand fw-bold m-0 d-flex align-items-center gap-2">
                <span>🚀</span> MFM.Apps
              </span>
            </div>

            {/* Right: Icon-only Mobile Menu Button */}
            <div className="d-flex align-items-center ms-auto ms-md-0">
              <button
                className="btn btn-outline-secondary d-md-none px-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarOffcanvas"
                aria-controls="sidebarOffcanvas"
                aria-label="Toggle Navigation"
              >
                ☰
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Offcanvas Drawer */}
        <div
          className="offcanvas-md offcanvas-start d-md-none"
          tabIndex="-1"
          id="sidebarOffcanvas"
          aria-labelledby="sidebarOffcanvasLabel"
        >
          <div className="offcanvas-header bg-body border-bottom">
            <h5 className="offcanvas-title fw-bold d-flex align-items-center gap-2" id="sidebarOffcanvasLabel">
              <span>🚀</span> MFM.Apps
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              data-bs-target="#sidebarOffcanvas"
              aria-label="Close"
            ></button>
          </div>
          
          <div className="offcanvas-body p-3 d-flex flex-column h-100">
            {renderProfileHeader()}
            
            {/* Scrollable Navigation Menu on Mobile */}
            <div className="flex-grow-1 overflow-y-auto pe-1">
              {renderSidebarLinks()}
            </div>
            
            {/* Pinned at bottom of mobile menu */}
            <div className="pt-3 border-top mt-auto bg-body w-100">
              <button className="btn btn-outline-primary btn-sm w-100 rounded-pill py-2" onClick={onBack}>
                ← Kembali ke Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic App Display Canvas */}
        <main className="container-fluid px-3 px-md-4 pb-5">
          <div className="card shadow-sm border-0 rounded-4 p-4 bg-body">
            {activeApp === 'calculator' && <CalculatorApp />}
            {activeApp === 'undian' && <UndianApp />}
            {activeApp === 'todo' && <TodoApp />}
            {activeApp === 'weather' && <WeatherApp />}
            {activeApp === 'timer' && <TimerApp />}
            {activeApp === 'currency' && <CurrencyConverterApp />}
          </div>
        </main>
      </div>

      {/* Floating Soft Contact Dropup */}
      <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1050 }}>
        {showContactMenu && (
          <ul
            className="dropdown-menu dropdown-menu-end show shadow-lg border-0 p-2 mb-3 rounded-4 d-block position-absolute bg-body"
            style={{ bottom: '100%', right: 0, minWidth: '200px' }}
          >
            {contactLinks.map((item, idx) => (
              <li key={idx}>
                <a
                  className="dropdown-item d-flex align-items-center gap-3 py-2 px-3 rounded-3"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowContactMenu(false)}
                >
                  <span
                    className={`btn btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center border-0 ${item.badgeClass}`}
                    style={{ width: '34px', height: '34px' }}
                  >
                    {item.icon}
                  </span>
                  <span className="fw-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <button
          className="btn btn-primary rounded-circle p-0 shadow-lg d-flex align-items-center justify-content-center transition-all"
          type="button"
          onClick={() => setShowContactMenu(!showContactMenu)}
          style={{ width: '56px', height: '56px' }}
          title="Hubungi Saya"
        >
          <span className="fs-4 text-white">{showContactMenu ? '✕' : '💬'}</span>
        </button>
      </div>
    </div>
  );
}