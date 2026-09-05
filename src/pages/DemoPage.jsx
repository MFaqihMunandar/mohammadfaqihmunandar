import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Relative imports matching src/pages/ -> src/components/demos/
import CalculatorApp from '../components/demos/CalculatorApp';
import UndianApp from '../components/demos/UndianApp';
import TodoApp from '../components/demos/TodoApp';
import WeatherApp from '../components/demos/WeatherApp';
import TimerApp from '../components/demos/TimerApp';
import CurrencyConverterApp from '../components/demos/CurrencyConverterApp';
import Demoauth from '../components/demos/demoauth';

// Clean Inline SVG Icons
const Icons = {
  Calculator: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <line x1="8" y1="6" x2="16" y2="6"></line>
      <line x1="16" y1="14" x2="16" y2="18"></line>
      <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"></path>
    </svg>
  ),
  Undian: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
    </svg>
  ),
  Todo: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  ),
  Weather: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"></path>
    </svg>
  ),
  Timer: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Currency: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  ),
  Auth: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  Rocket: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.79-1.81.2-2.58l-.7-.7c-.77-.59-1.87-.51-2.5.2z"></path>
      <path d="M12 15l-3-3 7.35-7.35c.78-.78 2.05-.78 2.83 0l.17.17c.78.78.78 2.05 0 2.83L12 15z"></path>
      <path d="M9 18l-1.5 1.5"></path>
      <path d="M15 12l1.5-1.5"></path>
    </svg>
  ),
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
  Email: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  Message: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )
};

export default function DemoPage() {
  const navigate = useNavigate();
  const [activeApp, setActiveApp] = useState('calculator');
  const [showContactMenu, setShowContactMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
    link.id = 'bootstrap-demo-css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.id = 'bootstrap-demo-js';
    
    script.onload = () => {
      setTimeout(() => setIsLoading(false), 500);
    };

    document.body.appendChild(script);

    return () => {
      document.getElementById('bootstrap-demo-css')?.remove();
      document.getElementById('bootstrap-demo-js')?.remove();
      document.querySelectorAll('.offcanvas-backdrop, .modal-backdrop').forEach((el) => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  const menuItems = [
    { id: 'calculator', name: 'Kalkulator', icon: <Icons.Calculator />, badge: 'State Management' },
    { id: 'undian', name: 'Acak Undian', icon: <Icons.Undian />, badge: 'Random Logic' },
    { id: 'todo', name: 'Daftar Catatan', icon: <Icons.Todo />, badge: 'LocalStorage Sync' },
    { id: 'weather', name: 'Cuaca Realtime', icon: <Icons.Weather />, badge: 'REST API Integration' },
    { id: 'timer', name: 'Stopwatch & Timer', icon: <Icons.Timer />, badge: 'Custom React Hooks' },
    { id: 'currency', name: 'Konversi Mata Uang', icon: <Icons.Currency />, badge: 'Fetch Live API' },
    { id: 'demoauth', name: 'Auth Low - High', icon: <Icons.Auth />, badge: 'Auth Level' },
  ];

  const contactLinks = [
    { name: 'Email', icon: <Icons.Email />, href: 'mailto:faqihmunandar479@gmail.com', badgeClass: 'bg-danger-subtle text-danger' },
    { name: 'WhatsApp', icon: <Icons.WhatsApp />, href: 'https://wa.me/6289630286950', badgeClass: 'bg-success-subtle text-success' },
    { name: 'Instagram', icon: <Icons.Instagram />, href: 'https://instagram.com/faqihmunandar', badgeClass: 'bg-warning-subtle text-warning' },
    { name: 'Facebook', icon: <Icons.Facebook />, href: 'https://facebook.com/faqihmunandar9', badgeClass: 'bg-primary-subtle text-primary' },
  ];

  const handleBack = () => {
    const offcanvasEl = document.getElementById('sidebarOffcanvas');
    if (window.bootstrap && offcanvasEl) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }

    document.querySelectorAll('.offcanvas-backdrop, .modal-backdrop').forEach((el) => el.remove());
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    navigate('/'); 
  };

  const handleSelectApp = (id) => {
    setActiveApp(id);
    const offcanvasEl = document.getElementById('sidebarOffcanvas');
    if (window.bootstrap && offcanvasEl) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }

    setTimeout(() => {
      document.querySelectorAll('.offcanvas-backdrop').forEach((backdrop) => backdrop.remove());
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }, 150);
  };

  const renderProfileHeader = () => (
    <div className="pb-3 mb-3 border-bottom px-1">
      <div className="d-flex align-items-center gap-3">
        <img
          src={`${import.meta.env.BASE_URL}oldme.jpg`}
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
              <div className="fs-5 d-flex align-items-center justify-content-start">
                {item.icon}
              </div>

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

  if (isLoading) {
    return (
      <div 
        className="d-flex flex-column align-items-center justify-content-center min-vh-100 w-100 position-fixed top-0 start-0 bg-white" 
        style={{ zIndex: 9999 }}
      >
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
        </div>
      </div>
    );
  }

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
            <Icons.Rocket /> MFM.Apps
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
          <button className="btn btn-outline-primary btn-sm w-100 rounded-pill py-2" onClick={handleBack}>
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
                {darkMode ? <Icons.Sun /> : <Icons.Moon />}
              </button>
            </div>

            {/* Center: Brand Title (Mobile Only Header) */}
            <div className="d-md-none position-absolute start-50 translate-middle-x">
              <span className="navbar-brand fw-bold m-0 d-flex align-items-center gap-2">
                <Icons.Rocket /> MFM.Apps
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
              <Icons.Rocket /> MFM.Apps
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
              <button className="btn btn-outline-primary btn-sm w-100 rounded-pill py-2" onClick={handleBack}>
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
            {activeApp === 'demoauth' && <Demoauth />}
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
          <span className="text-white d-flex align-items-center justify-content-center">
            {showContactMenu ? <Icons.Close /> : <Icons.Message />}
          </span>
        </button>
      </div>
    </div>
  );
}