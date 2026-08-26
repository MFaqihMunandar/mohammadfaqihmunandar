import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { formatDateIndonesian } from './utils/dateFormatter';

export default function Portfolio() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState('');

  const heroImages = [
    'me.jpg',
    'gymme2.jpg',
    'gymme.jpg',
    'WhatsApp Image 2026-08-26 at 10.45.20 (3).jpeg',
    'WhatsApp Image 2026-08-26 at 10.45.21 (1).jpeg',
    'WhatsApp Image 2026-08-26 at 10.45.22.jpeg',
    'oldme.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const updateTabTitle = (sectionId) => {
    if (sectionId === 'hero' || sectionId === 'home') {
      document.title = 'Faqih | Portfolio';
    } else {
      const formattedName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
      document.title = `Faqih | ${formattedName}`;
    }
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    updateTabTitle(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 150) {
        setActiveTab('home');
        updateTabTitle('home');
        return;
      }
      const sections = ['about', 'projects', 'offer-message'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId);
            updateTabTitle(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const subject = encodeURIComponent('Opportunity Offer / Work Inquiry');
    const body = encodeURIComponent(message);
    window.location.href = `mailto:faqihmunandar479@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/6289630286950?text=${text}`, '_blank');
  };

  const contactLinks = [
    { name: 'Email', href: 'mailto:faqihmunandar479@gmail.com', color: '#EA4335', angle: '0deg', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>) },
    { name: 'WhatsApp', href: 'https://wa.me/6289630286950', color: '#25D366', angle: '30deg', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>) },
    { name: 'Instagram', href: 'https://instagram.com/faqihmunandar', color: '#E4405F', angle: '60deg', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>) },
    { name: 'Facebook', href: 'https://facebook.com/faqihmunandar9', color: '#1877F2', angle: '90deg', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>) }
  ];

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-inner">
          <h2 className="nav-logo" onClick={() => scrollToSection('home')}>
            MFM<span style={{ color: '#2563eb' }}>.</span>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="tab-container">
              {['home', 'about', 'projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme">
              {darkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1 className="title">Mohammad Faqih Munandar</h1>
          <p className="subtitle">
            Frontend Developer crafting modern, high-performance web applications using React and contemporary tools.
          </p>
          <div className="button-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
            <button className="badge-btn" onClick={() => scrollToSection('offer-message')} style={{ margin: 0 }}>
              <span className="status-dot"></span>
              Want to offer me opportunities? Send me a message! ↓
            </button>
            <button onClick={() => scrollToSection('projects')} className="primary-btn">
              View Projects
            </button>
          </div>
        </div>

        <div className="hero-slider-container">
          <div className="hero-slider">
            {heroImages.map((img, index) => (
              <img key={index} src={img} alt={`Slide ${index + 1}`} className={`slider-image ${index === currentImageIndex ? 'active' : ''}`} />
            ))}
          </div>
          <div className="slider-dots">
            {heroImages.map((_, index) => (
              <span key={index} className={`dot ${index === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(index)} />
            ))}
          </div>
        </div>
      </section>

      {/* About & Projects Sections */}
      <section id="projects" className="section">
        <div className="content-wrapper">
          <h2 className="section-header">Featured Projects & Web Apps</h2>
          <div className="project-grid">
            <div className="card project-card">
              <div className="card-top">
                <span className="project-badge accent">Interactive App</span>
                <span className="date-tag">{formatDateIndonesian('2026-08-22')}</span>
              </div>
              <h3 className="card-title">Interactive Demo Showcase</h3>
              <p className="card-text">A feature-rich web application demonstrating frontend utility integrations.</p>
              <div className="card-actions">
                <button onClick={() => navigate('/demo')} className="action-link primary-link">
                  Launch Live Demo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Mohammad Faqih Munandar. Built with React & Vite.
      </footer>
    </div>
  );
}