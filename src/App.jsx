import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('hero');
  
  const updateTabTitle = (sectionId) => {
    if (sectionId === 'hero') {
      document.title = 'Faqih | Portfolio';
    } else {
      const formattedName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
      document.title = `Faqih - ${formattedName}`;
    }
  };
  
  // Smooth scroll handler
  const scrollToSection = (id) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Automatically highlight tabs as user scrolls
  useEffect(() => {
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
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={containerStyle}>
      {/* Sticky Navigation Bar */}
      <nav style={navStyle}>
        <div style={navInnerStyle}>
          <h2 style={logoStyle} onClick={() => scrollToSection('hero')}>
            Mohammad Faqih Munandar<span style={{ color: '#2563eb' }}>.</span>
          </h2>

          <div style={tabContainerStyle}>
            {['about', 'projects', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => scrollToSection(tab)}
                style={{
                  ...tabButtonStyle,
                  color: activeTab === tab ? '#2563eb' : '#64748b',
                  backgroundColor: activeTab === tab ? '#eff6ff' : 'transparent',
                  fontWeight: activeTab === tab ? '600' : '400',
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" style={heroSectionStyle}>
        <div style={badgeStyle}>Available for opportunities</div>
        <h1 style={titleStyle}>Mohammad Faqih Munandar</h1>
        <p style={subtitleStyle}>
          Frontend Developer crafting modern, high-performance web applications using React and contemporary tools.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={() => scrollToSection('projects')} style={primaryBtnStyle}>
            View Projects
          </button>
          <button onClick={() => scrollToSection('contact')} style={secondaryBtnStyle}>
            Contact Me
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={sectionStyle}>
        <div style={contentWrapperStyle}>
          <h2 style={sectionHeaderStyle}>About Me</h2>
          <p style={paragraphStyle}>
            I focus on building responsive, user-friendly digital interfaces with modern component architectures. 
            Passionate about web standards, UI design, and scalable frontend development.
          </p>
          <div style={skillsGridStyle}>
            {['React', 'JavaScript', 'Vite', 'Git', 'CSS / HTML', 'REST APIs', 'PHP', 'Delphi'].map((skill) => (
              <span key={skill} style={skillTagStyle}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={sectionStyle}>
        <div style={contentWrapperStyle}>
          <h2 style={sectionHeaderStyle}>Featured Projects</h2>
          <div style={projectGridStyle}>
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Portfolio Site</h3>
              <p style={cardTextStyle}>Modern personal site built with React and Vite, hosted on GitHub Pages.</p>
              <span style={cardTechStyle}>React • Vite • GitHub Pages</span>
            </div>
            <div style={cardStyle}>
              <h3 style={cardTitleStyle}>Web Application</h3>
              <p style={cardTextStyle}>Interactive web software highlighting component composition and clean UX.</p>
              <span style={cardTechStyle}>JavaScript • Frontend API</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={sectionStyle}>
        <div style={contentWrapperStyle}>
          <h2 style={sectionHeaderStyle}>Let's Connect</h2>
          <p style={paragraphStyle}>Looking to collaborate or have a question? Feel free to reach out.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', margin: '24px 0' }}>
            {/* Social & Contact Links List */}
            <div style={socialListStyle}>
              {/* Email */}
              <a href="mailto:faqihmunandar479@gmail.com" style={socialLinkStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span><strong>Email:</strong> faqihmunandar479@gmail.com</span>
              </a>

              {/* WhatsApp / Telegram */}
              <a href="https://wa.me/6289630286950" target="_blank" rel="noreferrer" style={socialLinkStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span><strong>Whatsapp / Telegram:</strong> 089630286950</span>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/faqihmunandar" target="_blank" rel="noreferrer" style={socialLinkStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span><strong>Instagram:</strong> @faqihmunandar</span>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com/faqihmunandar" target="_blank" rel="noreferrer" style={socialLinkStyle}>
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
      <footer style={footerStyle}>
        © {new Date().getFullYear()} Mohammad Faqih Munandar. Built with React & Vite.
      </footer>
    </div>
  );
}

// Inline Styling Objects
const containerStyle = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  color: '#0f172a',
  backgroundColor: '#ffffff',
  width: '100%',             // Spans entire screen width
  minHeight: '100vh',
  lineHeight: '1.6',
};

const navStyle = {
  position: 'sticky',
  top: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(8px)',
  borderBottom: '1px solid #e2e8f0',
  zIndex: 1000,
};

const navInnerStyle = {
  maxWidth: '1100px',        // Widen header container
  margin: '0 auto',
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoStyle = {
  margin: 0,
  fontSize: '1.25rem',
  fontWeight: '700',
  cursor: 'pointer',
};

const tabContainerStyle = {
  display: 'flex',
  gap: '6px',
  backgroundColor: '#f8fafc',
  padding: '4px',
  borderRadius: '8px',
  border: '1px solid #f1f5f9',
};

const tabButtonStyle = {
  padding: '6px 14px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.875rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const heroSectionStyle = {
  maxWidth: '1000px',        // Widen hero area
  margin: '0 auto',
  padding: '120px 24px 80px',
  textAlign: 'center',
};

const badgeStyle = {
  display: 'inline-block',
  padding: '4px 12px',
  backgroundColor: '#eff6ff',
  color: '#2563eb',
  fontSize: '0.8rem',
  fontWeight: '600',
  borderRadius: '20px',
  marginBottom: '16px',
  border: '1px solid #dbeafe',
};

const titleStyle = {
  fontSize: '2.75rem',
  fontWeight: '800',
  letterSpacing: '-0.02em',
  marginBottom: '16px',
};

const subtitleStyle = {
  fontSize: '1.125rem',
  color: '#475569',
  marginBottom: '28px',
};

const primaryBtnStyle = {
  backgroundColor: '#0f172a',
  color: '#ffffff',
  padding: '10px 20px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
};

const secondaryBtnStyle = {
  backgroundColor: '#ffffff',
  color: '#0f172a',
  padding: '10px 20px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '0.9rem',
  fontWeight: '500',
  cursor: 'pointer',
};

const sectionStyle = {
  padding: '80px 24px',
  borderTop: '1px solid #f1f5f9',
};

const contentWrapperStyle = {
  maxWidth: '1100px',        // Widen section content wrapper
  margin: '0 auto',
  textAlign: 'center',
};

const sectionHeaderStyle = {
  fontSize: '1.75rem',
  fontWeight: '700',
  marginBottom: '16px',
};

const paragraphStyle = {
  fontSize: '1rem',
  color: '#475569',
  marginBottom: '24px',
};

const skillsGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'center',
  marginTop: '16px',
};

const skillTagStyle = {
  backgroundColor: '#f1f5f9',
  color: '#334155',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '0.85rem',
  fontWeight: '500',
};

const projectGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  marginTop: '24px',
  textAlign: 'left',
};

const cardStyle = {
  padding: '24px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
};

const cardTitleStyle = {
  margin: '0 0 8px 0',
  fontSize: '1.1rem',
};

const cardTextStyle = {
  fontSize: '0.9rem',
  color: '#64748b',
  marginBottom: '16px',
};

const cardTechStyle = {
  fontSize: '0.75rem',
  color: '#2563eb',
  fontWeight: '600',
};

const footerStyle = {
  textAlign: 'center',
  padding: '32px 24px',
  fontSize: '0.85rem',
  color: '#94a3b8',
  borderTop: '1px solid #f1f5f9',
};

const socialListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '16px',
  textAlign: 'left',
};

const socialLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#334155',
  textDecoration: 'none',
  padding: '10px 16px',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  backgroundColor: '#f8fafc',
  fontSize: '0.95rem',
  transition: 'all 0.2s ease',
};

export default App;