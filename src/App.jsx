import React, { useState, useEffect } from 'react';
import './App.css';
import { formatDateIndonesian } from './utils/dateFormatter';
import DemoPage from './components/DemoPage';

function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [viewDemo, setViewDemo] = useState(false);

  const updateTabTitle = (sectionId) => {
    if (sectionId === 'hero') {
      document.title = 'Faqih | Portfolio';
    } else {
      const formattedName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
      document.title = `Faqih - ${formattedName}`;
    }
  };

  const scrollToSection = (id) => {
    setActiveTab(id);
    updateTabTitle(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ALL HOOKS MUST BE AT THE TOP BEFORE ANY RETURN STATEMENT
  useEffect(() => {
    if (viewDemo) return; // Prevent scroll listener when on demo view

    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
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
  }, [viewDemo]);

  // MOVE CONDITIONAL RENDER HERE (AFTER ALL HOOKS)
  if (viewDemo) {
    return <DemoPage onBack={() => setViewDemo(false)} />;
  }

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-inner">
          <h2 className="nav-logo" onClick={() => scrollToSection('hero')}>
            MFM<span style={{ color: '#2563eb' }}>.</span>
          </h2>

          <div className="tab-container">
            {['about', 'projects', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="badge">Available for opportunities</div>
        <h1 className="title">Mohammad Faqih Munandar</h1>
        <p className="subtitle">
          Frontend Developer crafting modern, high-performance web applications using React and contemporary tools.
        </p>
        <div className="button-group">
          <button onClick={() => scrollToSection('projects')} className="primary-btn">
            View Projects
          </button>
          <button onClick={() => scrollToSection('contact')} className="secondary-btn">
            Contact Me
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="content-wrapper">
          <h2 className="section-header">About Me</h2>
          <p className="paragraph">
            I focus on building responsive, user-friendly digital interfaces with modern component architectures. 
            Passionate about web standards, UI design, and scalable frontend development.
          </p>
          <div className="skills-grid">
            {['React', 'JavaScript', 'Vite', 'Git', 'CSS / HTML', 'REST APIs', 'PHP', 'Delphi'].map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects & Web Apps Section */}
      <section id="projects" className="section">
        <div className="content-wrapper">
          <h2 className="section-header">Featured Projects & Web Apps</h2>
          
          <div className="project-grid">
            {/* Card 1: Main Portfolio */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Portfolio Site</h3>
                <span className="date-tag">{formatDateIndonesian('2026-08-20')}</span>
              </div>
              <p className="card-text">Modern personal site built with React and Vite, hosted on GitHub Pages.</p>
              <span className="card-tech">React • Vite • GitHub Pages</span>
            </div>

            {/* Card 2: Demo Web App Page */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Demo Web App</h3>
                <span className="date-tag">{formatDateIndonesian('2026-08-22')}</span>
              </div>
              <p className="card-text">
                Interactive web application showcase highlighting component state management, local utilities, and dynamic API feeds.
              </p>
              <span className="card-tech">JavaScript • React State • REST API</span>
              <div>
                <a 
                  href="#demo" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    setViewDemo(true); 
                  }} 
                  className="demo-link"
                >
                  Launch Live Demo →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="content-wrapper">
          <h2 className="section-header">Let's Connect</h2>
          <p className="paragraph">Looking to collaborate or have a question? Feel free to reach out.</p>

          <div className="contact-container">
            <div className="social-list">
              <a href="mailto:faqihmunandar479@gmail.com" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span><strong>Email:</strong> faqihmunandar479@gmail.com</span>
              </a>

              <a href="https://wa.me/6289630286950" target="_blank" rel="noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span><strong>Whatsapp / Telegram:</strong> 089630286950</span>
              </a>

              <a href="https://instagram.com/faqihmunandar" target="_blank" rel="noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span><strong>Instagram:</strong> @faqihmunandar</span>
              </a>

              <a href="https://facebook.com/faqihmunandar" target="_blank" rel="noreferrer" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span><strong>Facebook:</strong> faqihmunandar</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Mohammad Faqih Munandar. Built with React & Vite.
      </footer>
    </div>
  );
}

export default App;