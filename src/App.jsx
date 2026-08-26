import React, { useState, useEffect } from 'react';
import './App.css';
import { formatDateIndonesian } from './utils/dateFormatter';
import DemoPage from './components/DemoPage';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [viewDemo, setViewDemo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Auto-slide image state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Message Form State
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
    if (viewDemo) return;

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
  }, [viewDemo]);

  // Handlers for sending messages
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

  if (viewDemo) {
    return <DemoPage onBack={() => setViewDemo(false)} />;
  }

  const contactLinks = [
    {
      name: 'Email',
      href: 'mailto:faqihmunandar479@gmail.com',
      color: '#EA4335',
      angle: '0deg',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/6289630286950',
      color: '#25D366',
      angle: '30deg',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/faqihmunandar',
      color: '#E4405F',
      angle: '60deg',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/faqihmunandar9',
      color: '#1877F2',
      angle: '90deg',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="app-container">
      {/* Navigation Bar */}
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

            <button 
              className="theme-toggle-btn" 
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Theme"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
		  <h1 className="title">Mohammad Faqih Munandar</h1>
		  <p className="subtitle">
			Frontend Developer crafting modern, high-performance web applications using React and contemporary tools.
		  </p>
		  
		  <div className="button-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
			{/* Offering Button positioned above View Projects */}
			<button 
			  className="badge-btn" 
			  onClick={() => scrollToSection('offer-message')}
			  style={{ margin: 0 }}
			>
			  <span className="status-dot"></span>
			  Want to offer me opportunities? Send me a message! ↓
			</button>

			{/* Primary Action Button */}
			<button onClick={() => scrollToSection('projects')} className="primary-btn">
			  View Projects
			</button>
		  </div>
		</div>

        {/* Auto-sliding Image Container */}
        <div className="hero-slider-container">
          <div className="hero-slider">
            {heroImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className={`slider-image ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
          <div className="slider-dots">
            {heroImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
	  <section id="about" className="section">
		<div className="content-wrapper">
		  <div className="about-grid">
      
			{/* Left Column: Skill Breakdown & Donut Diagrams */}
			<div className="about-left">
			  <h2 className="section-header align-left">Programming Language</h2>
			  <div className="pie-grid">
				{[
				  { 
					name: 'React', 
					level: 85, 
					color: '#61dafb', 
					icon: (
					  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#61dafb" strokeWidth="2">
						<ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"/>
						<ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)"/>
						<ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)"/>
						<circle cx="12" cy="12" r="2" fill="#61dafb"/>
					  </svg>
					)
				  },
				  { 
					name: 'JavaScript', 
					level: 85, 
					color: '#f7df1e',
					icon: (
					  <svg viewBox="0 0 24 24" width="18" height="18" fill="#f7df1e">
						<path d="M3 3h18v18H3V3zm11.5 13.5c.6.9 1.4 1.5 2.5 1.5 1.3 0 2.1-.6 2.1-2.1 0-1.4-.9-1.9-2.5-2.6l-.7-.3c-2.1-.9-3.4-2-3.4-4.4 0-2.4 1.9-4.1 4.7-4.1 1.9 0 3.3.7 4.2 2.3l-1.9 1.2c-.5-.9-1.2-1.3-2.3-1.3-1.1 0-1.8.6-1.8 1.4 0 1 .7 1.4 2.2 2.1l.7.3c2.4 1 3.7 2.1 3.7 4.6 0 2.8-2.2 4.4-5.3 4.4-2.5 0-4.2-1.1-5.1-2.9l1.9-1.1zM9.5 16.5c.5.8 1.1 1.4 2.1 1.4 1.1 0 1.7-.5 1.7-1.7V9h2.7v7.3c0 2.8-1.7 4.2-4.2 4.2-2.1 0-3.5-.9-4.2-2.3l1.9-1.2z"/>
					  </svg>
					)
				  },
				  { 
					name: 'HTML & CSS', 
					level: 90, 
					color: '#e34f26',
					icon: (
					  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e34f26" strokeWidth="2">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
					  </svg>
					)
				  },
				  { 
					name: 'Vite', 
					level: 80, 
					color: '#bd34fe',
					icon: (
					  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#bd34fe" strokeWidth="2">
						<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
					  </svg>
					)
				  },
				  { 
					name: 'REST APIs', 
					level: 85, 
					color: '#10b981',
					icon: (
					  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2">
						<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
						<line x1="8" y1="21" x2="16" y2="21"/>
						<line x1="12" y1="17" x2="12" y2="21"/>
					  </svg>
					)
				  },
				  { 
					name: 'PHP & Delphi', 
					level: 75, 
					color: '#777bb4',
					icon: (
					  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#777bb4" strokeWidth="2">
						<polyline points="16 18 22 12 16 6"/>
						<polyline points="8 6 2 12 8 18"/>
					  </svg>
					)
				  }
				].map((skill) => (
				  <div key={skill.name} className="pie-item">
					<div 
					  className="pie-chart" 
					  style={{
						background: `conic-gradient(${skill.color} 0% ${skill.level}%, var(--bg-secondary) ${skill.level}% 100%)`
					  }}
					>
					  <div className="pie-inner">
						{skill.icon}
						<span className="pie-percent">{skill.level}%</span>
					  </div>
					</div>
					<span className="pie-label">{skill.name}</span>
				  </div>
				))}
			  </div>
			</div>

			{/* Right Column: Programming Skill Description */}
			<div className="about-right">
			  <h2 className="section-header align-left">My Skills</h2>
			  <p className="paragraph align-left">
				I specialize in building responsive, modern frontend interfaces. My main tech stack focuses on <strong>React</strong> and contemporary tools like <strong>Vite</strong> to ensure high performance, maintainable architectures, and dynamic UI solutions.
			  </p>
			  <p className="paragraph align-left">
				I am also proficient in foundational web design using <strong>HTML/CSS</strong>, connecting frontend apps with <strong>REST APIs</strong>, and managing traditional systems with <strong>PHP</strong> and <strong>Delphi</strong>.
			  </p>
			</div>

		  </div>

		  {/* Reversed Additional Capabilities Section (Description Left, Icons Right) */}
		  <div className="additional-skills-wrapper">
			<div className="additional-left">
			  <h3 className="skills-subtitle align-left">Additional Capabilities</h3>
			  <p className="paragraph align-left" style={{ margin: 0 }}>
				Beyond software programming, I am experienced in vector graphic design, image editing, video post-production, and micro-controller circuit projects.
			  </p>
			</div>

			<div className="additional-right">
			  {[
				{ 
				  name: 'CorelDraw', 
				  icon: (
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
					  <circle cx="12" cy="12" r="9"/>
					  <path d="M12 8v8M8 12h8"/>
					</svg>
				  )
				},
				{ 
				  name: 'Adobe Photoshop', 
				  icon: (
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
					  <rect x="3" y="3" width="18" height="18" rx="3"/>
					  <path d="M7 17V9h4a2 2 0 0 1 0 4H7"/>
					</svg>
				  )
				},
				{ 
				  name: 'Adobe Premiere', 
				  icon: (
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
					  <rect x="3" y="3" width="18" height="18" rx="3"/>
					  <polygon points="10 8 16 12 10 16 10 8"/>
					</svg>
				  )
				},
			    { 
				  name: 'Arduino IDE', 
				  icon: (
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
					  <circle cx="8" cy="12" r="3"/>
					  <circle cx="16" cy="12" r="3"/>
					  <line x1="7" y1="12" x2="9" y2="12"/>
					  <line x1="15" y1="12" x2="17" y2="12"/>
					  <line x1="16" y1="11" x2="16" y2="13"/>
					</svg>
				  )
				},
				{ 
				  name: 'IoT (Internet of Things)', 
				  icon: (
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
					  <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
					  <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
					  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
					  <line x1="12" y1="20" x2="12.01" y2="20"/>
					</svg>
				  )
				}
			  ].map((tool) => (
				<span key={tool.name} className="skill-tag icon-tag">
				  {tool.icon}
				  {tool.name}
				</span>
			  ))}
			</div>
		  </div>
		</div>
	  </section>

      {/* Projects Section */}
      <section id="projects" className="section">
  <div className="content-wrapper">
    <h2 className="section-header">Featured Projects & Web Apps</h2>
    <p className="paragraph" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
      A showcase of web applications highlighting modern frontend techniques, responsive architectures, and state management.
    </p>

    <div className="project-grid">
      
      {/* Project 1: Personal Portfolio */}
      <div className="card project-card">
        <div className="card-top">
          <span className="project-badge">Portfolio</span>
          <span className="date-tag">{formatDateIndonesian('2026-08-20')}</span>
        </div>

        <h3 className="card-title">Modern Personal Portfolio</h3>
        <p className="card-text">
          A high-performance responsive portfolio platform featuring dynamic theme toggling, custom CSS animations, and interactive skill visualizers.
        </p>

        <ul className="project-highlights">
          <li>Custom Dark/Light mode state implementation</li>
          <li>Radial floating contact menu & auto-sliding image gallery</li>
          <li>Optimized asset delivery & GitHub Pages deployment</li>
        </ul>

        <div className="tech-stack-container">
          {['React', 'Vite', 'CSS3', 'GitHub Pages'].map((tech) => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>

        <div className="card-actions">
          <a href="https://github.com/mfaqihmunandar" target="_blank" rel="noreferrer" className="action-link secondary-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            Source Code
          </a>
        </div>
      </div>

      {/* Project 2: Interactive Demo Web App */}
      <div className="card project-card">
        <div className="card-top">
          <span className="project-badge accent">Interactive App</span>
          <span className="date-tag">{formatDateIndonesian('2026-08-22')}</span>
        </div>

        <h3 className="card-title">Interactive Demo Showcase</h3>
        <p className="card-text">
          A feature-rich web application demonstrating frontend utility integrations, complex state management, and real-time API integrations.
        </p>

        <ul className="project-highlights">
          <li>REST API integration with asynchronous data handling</li>
          <li>Local utility tools & custom React hooks</li>
          <li>Modular component architecture with live state updates</li>
        </ul>

        <div className="tech-stack-container">
          {['JavaScript', 'React Hooks', 'REST API', 'CSS Modules'].map((tech) => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>

        <div className="card-actions">
          <a 
            href="#demo" 
            onClick={(e) => { 
              e.preventDefault(); 
              setViewDemo(true); 
            }} 
            className="action-link primary-link"
          >
            Launch Live Demo →
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Offer / Message Section */}
      <section id="offer-message" className="section message-section">
        <div className="content-wrapper message-box">
          <h2 className="section-header">Send an Offering Job or Just Message Me</h2>
          <p className="paragraph">
            Have a freelance project, job position, or opportunity in mind? Type your message below and send it directly via Email or WhatsApp.
          </p>

          <textarea
            className="message-textarea"
            rows="5"
            placeholder="Hi Faqih, I would like to discuss an opportunity..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <div className="send-button-group">
            <button 
              className="send-btn email-btn" 
              onClick={handleSendEmail}
              disabled={!message.trim()}
            >
              ✉ Send via Email
            </button>
            <button 
              className="send-btn wa-btn" 
              onClick={handleSendWhatsApp}
              disabled={!message.trim()}
            >
              💬 Send via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Floating Radial Contact Button */}
      <div className={`fab-container ${menuOpen ? 'open' : ''}`}> 
        <button 
          className={`fab-main ${menuOpen ? 'active' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle contact links"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        {contactLinks.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="radial-item"
            style={{ '--angle': item.angle }}
            title={item.name}
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} Mohammad Faqih Munandar. Built with React & Vite.
      </footer>
    </div>
  );
}

export default App;