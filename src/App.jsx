import { useState, useEffect } from 'react'
import { 
  Terminal as TerminalIcon, 
  Database, 
  Shield, 
  Server, 
  Cpu, 
  Globe, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  CheckCircle, 
  Send, 
  ArrowRight, 
  Code,
  Layers,
  Sparkles,
  FileText,
  Menu,
  X
} from 'lucide-react'

// Custom SVGs for Brand Icons since Lucide-React deprecated them
const Github = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState('home');
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Terminal tabs
  const [terminalTab, setTerminalTab] = useState('profile');

  // Project filtering state
  const [projectFilter, setProjectFilter] = useState('all');

  // Contact form submission state
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // 'sending', 'success', 'error'

  // Typewriter effect variables
  const roles = ["Backend Engineer", "Full-Stack Developer", "Software Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleSubIndex, setRoleSubIndex] = useState(0);
  const [roleReverse, setRoleReverse] = useState(false);
  const [roleBlink, setRoleBlink] = useState(true);

  // Skill bars visibility state for animation triggers
  const [skillsVisible, setSkillsVisible] = useState(false);

  // Typewriter animation logic
  useEffect(() => {
    if (roleSubIndex === roles[roleIndex].length + 1 && !roleReverse) {
      const delayTimeout = setTimeout(() => setRoleReverse(true), 1500); // Pause at end of word
      return () => clearTimeout(delayTimeout);
    }

    if (roleSubIndex === 0 && roleReverse) {
      setRoleReverse(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setRoleSubIndex((prev) => prev + (roleReverse ? -1 : 1));
    }, roleReverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [roleSubIndex, roleReverse, roleIndex]);

  // Cursor blink logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRoleBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout);
  }, [roleBlink]);

  // Scroll spy and navbar solid background on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Navbar scroll effect
      if (window.scrollY > 50) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }

      // Scroll Spy for active nav highlight
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger skill bars animation when Skills section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
        } else {
          setSkillsVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }
  }, []);

  // Global scroll animation observer (runs every time elements enter/leave screen)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);



  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus('error');
      return;
    }

    const subject = encodeURIComponent(`[Portfolio] ${formState.subject || 'New Message'} — from ${formState.name}`);
    const body = encodeURIComponent(
`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📬  NEW PORTFOLIO MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤  SENDER DETAILS
────────────────────────────────
  Name    →  ${formState.name}
  Email   →  ${formState.email}
  Subject →  ${formState.subject || 'No Subject'}

💬  MESSAGE
────────────────────────────────
${formState.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Sent via abhishek-rawat Portfolio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    );

    // Opens Gmail compose in browser
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=abhirawat8076@gmail.com&su=${subject}&body=${body}`,
      '_blank'
    );

    setFormStatus('success');
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  const projects = [
    {
      id: 'rynqor',
      title: 'Rynqor',
      category: 'fullstack',
      subTitle: 'Real-time Full-Stack Chat Platform',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Socket.IO', 'React Query', 'JWT'],
      github: 'https://github.com/abhirawat03',
      live: '#',
      bullets: [
        'Architected a full-stack real-time MERN chat platform with Socket.IO WebSockets supporting optimistic messaging, typing indicators, read receipts, and multi-tab presence synchronization.',
        'Scaled WebSocket infrastructure horizontally using a Redis Socket.IO adapter, enabling multi-node deployment and distributed presence tracking for high-concurrency workloads.',
        'Guaranteed referential integrity under concurrent writes by wrapping message creation and conversation updates in MongoDB multi-document Sessions and Transactions.',
        'Hardened authentication with HTTP-only cookie JWTs, silent token rotation, and client-side query retries to prevent UI logout redirects.',
        'Optimized application performance by architecting a hybrid caching model (24h Redis server cache + tuned TanStack Query client cache) with virtualized scrolling.'
      ]
    },
    {
      id: 'cutbit',
      title: 'Cutbit',
      category: 'backend',
      subTitle: 'Link Tracking & Analytics Engine',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'React Query', 'JWT', 'Google OAuth'],
      github: 'https://github.com/abhirawat03',
      live: '#',
      bullets: [
        'Engineered a link tracking and analytics platform capturing GeoIP location, device, and referrer metadata on every redirect as structured analytics events.',
        'Reduced database read load via cookie-based unique visitor deduplication and daily time-series aggregation, enabling fast 7-day and 30-day analytics queries.',
        'Designed high-performance REST APIs for link creation, redirect handling, and bot-filtered analytics ingestion with an in-memory Map cache on hot redirect paths.',
        'Integrated Google OAuth alongside JWT refresh token rotation, and deployed frontend on Vercel and backend on Render.'
      ]
    }
  ];

  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="logo-text">
            <span>abhishek</span><span className="logo-dot">.rawat()</span>
          </a>
          
          <ul className="nav-links">
            <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Home</a></li>
            <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
            <li><a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a></li>
            <li><a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
            <li><a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a></li>
            <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
          </ul>

          <a 
            href="#contact" 
            className="btn btn-secondary hire-me-btn" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Hire Me
          </a>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay">
            {['home','about','skills','projects','experience','contact'].map(section => (
              <a
                key={section}
                href={`#${section}`}
                className={`mobile-nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ margin: '0.5rem 1.5rem 1rem', justifyContent: 'center' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="content-wrapper">
        
        {/* HERO SECTION */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="badge-tag">
              <span className="badge-pulse"></span>
              <span>Available for Full-Time Roles</span>
            </div>
            
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Abhishek Rawat</span>
            </h1>
            
            <h2 className="hero-subtitle">
              <span>{roles[roleIndex].substring(0, roleSubIndex)}</span>
              <span style={{ 
                display: 'inline-block', 
                width: '3px', 
                height: '1.2em', 
                backgroundColor: 'var(--color-primary)', 
                marginLeft: '5px',
                opacity: roleBlink ? 1 : 0
              }}></span>
            </h2>
            
            <p className="hero-description">
              I build scalable backend architectures, high-concurrency systems, and robust APIs.
              Specialized in Node.js, Express, FastAPI, and real-time distributed application flows.
            </p>

            <div className="hero-cta">
              <a href="#projects" className="btn btn-primary">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>

          {/* Dynamic Interactive Terminal */}
          <div className="terminal-mockup">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <div className="terminal-title">developer@abhishek-rawat: ~</div>
              <div style={{ width: '42px' }}></div>
            </div>
            
            <div style={{ display: 'flex', background: '#08090d', borderBottom: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => setTerminalTab('profile')}
                style={{
                  background: terminalTab === 'profile' ? '#0b0d13' : 'transparent',
                  border: 'none',
                  color: terminalTab === 'profile' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  borderRight: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <TerminalIcon size={12} /> profile.json
              </button>
              <button 
                onClick={() => setTerminalTab('skills')}
                style={{
                  background: terminalTab === 'skills' ? '#0b0d13' : 'transparent',
                  border: 'none',
                  color: terminalTab === 'skills' ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)',
                  padding: '0.5rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  borderRight: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Cpu size={12} /> backend.sh
              </button>
            </div>

            <div className="terminal-body">
              {terminalTab === 'profile' ? (
                <>
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span> <span className="terminal-command">cat profile.json</span>
                  </div>
                  <div className="terminal-output" style={{ color: '#8b949e' }}>
{`{
  "name": "Abhishek Rawat",
  "title": "Backend & Fullstack Developer",
  "location": "South Delhi, Delhi",
  "education": "B.Tech in Computer Science (2025)",
  "focus": "Scalability, Performance, APIs",
  "interests": ["Distributed Systems", "DB Caching", "WebSockets"]
}`}
                  </div>
                  <div className="terminal-line" style={{ marginTop: '1rem' }}>
                    <span className="terminal-prompt">$</span> <span className="terminal-command">npm run search-jobs</span><span className="terminal-cursor"></span>
                  </div>
                </>
              ) : (
                <>
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span> <span className="terminal-command">./backend.sh --list-services</span>
                  </div>
                  <div className="terminal-output green">
                    [✔] Node.js & Express.js Services ... ONLINE
                  </div>
                  <div className="terminal-output cyan">
                    [✔] Redis Caching Layer (24h cache TTL) ... ACTIVE
                  </div>
                  <div className="terminal-output purple">
                    [✔] Socket.IO Message Broker (WS Adapter) ... ACTIVE
                  </div>
                  <div className="terminal-output" style={{ color: '#e2e8f0', marginTop: '0.5rem' }}>
                    &gt; Caching strategy load: 1.00 (Success rate: 99.4%)
                    <br />
                    &gt; Socket presence check: 2 multi-tab synchronization channels synchronized.
                  </div>
                  <div className="terminal-line" style={{ marginTop: '1rem' }}>
                    <span className="terminal-prompt">$</span> <span className="terminal-command">node server.js</span><span className="terminal-cursor"></span>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about">
          <div className="section-title-wrapper">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">A glimpse into my background and passion</p>
          </div>

          <div className="about-grid">
            <div className="about-img-container animate-on-scroll">
              <div className="about-img-card">
                <div className="about-img-placeholder">
                  <Layers size={48} />
                </div>
                <div className="about-stat-grid">
                  <div className="about-stat-item">
                    <div className="about-stat-num">2</div>
                    <div className="about-stat-lbl">Major Projects</div>
                  </div>
                  <div className="about-stat-item">
                    <div className="about-stat-num">C++</div>
                    <div className="about-stat-lbl">DSA Proficiency</div>
                  </div>
                </div>
              </div>
              <div className="about-img-glow"></div>
            </div>

            <div className="about-text animate-on-scroll">
              <h3>Passionate about robust backend systems</h3>
              <p>
                I am a B.Tech Computer Science and Engineering student at <span className="highlight">Tula's Institute</span> (graduating in 2025) with a strong foundation in backend development, systems scaling, and core algorithms.
              </p>
              <p>
                My projects reflect a deep interest in distributed systems, real-time networking (WebSockets), and authentication workflows. During my internship at <span className="highlight">OctaNet Software Solution</span>, I honed my ability to translate technical designs into responsive frontend code and dynamic interfaces.
              </p>
              
              <div className="about-highlights">
                <div className="about-highlight-item">
                  <CheckCircle size={16} />
                  <span>Real-time WebSocket Scaling</span>
                </div>
                <div className="about-highlight-item">
                  <CheckCircle size={16} />
                  <span>REST API Design & In-memory Cache</span>
                </div>
                <div className="about-highlight-item">
                  <CheckCircle size={16} />
                  <span>Database Transactions & Integrity</span>
                </div>
                <div className="about-highlight-item">
                  <CheckCircle size={16} />
                  <span>Secure OAuth & Session Auth</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills">
          <div className="section-title-wrapper">
            <h2 className="section-title">Technical Skills</h2>
            <p className="section-subtitle">Technologies and concepts I specialize in</p>
          </div>

          <div className="skills-grid">
            {/* Backend Column */}
            <div className="skill-category-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-category-icon backend">
                  <Server size={22} />
                </div>
                <h3 className="skill-category-title">Backend & Languages</h3>
              </div>
              
              <div className="skill-items-list">
                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">Node.js / Express</span>
                    <span className="skill-item-level">90%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill backend" style={{ width: skillsVisible ? '90%' : '0%' }}></div>
                  </div>
                </div>
                
                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">C++ (DSA)</span>
                    <span className="skill-item-level">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill backend" style={{ width: skillsVisible ? '85%' : '0%' }}></div>
                  </div>
                </div>

                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">FastAPI & Python</span>
                    <span className="skill-item-level">75%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill backend" style={{ width: skillsVisible ? '75%' : '0%' }}></div>
                  </div>
                </div>

                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">REST API Design</span>
                    <span className="skill-item-level">90%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill backend" style={{ width: skillsVisible ? '90%' : '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Databases & Real-time */}
            <div className="skill-category-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-category-icon fullstack">
                  <Database size={22} />
                </div>
                <h3 className="skill-category-title">Databases & Realtime</h3>
              </div>
              
              <div className="skill-items-list">
                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">MongoDB & Redis</span>
                    <span className="skill-item-level">88%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill fullstack" style={{ width: skillsVisible ? '88%' : '0%' }}></div>
                  </div>
                </div>
                
                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">Socket.IO WebSockets</span>
                    <span className="skill-item-level">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill fullstack" style={{ width: skillsVisible ? '85%' : '0%' }}></div>
                  </div>
                </div>

                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">Authentication (JWT / OAuth)</span>
                    <span className="skill-item-level">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill fullstack" style={{ width: skillsVisible ? '85%' : '0%' }}></div>
                  </div>
                </div>

                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">MySQL</span>
                    <span className="skill-item-level">80%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill fullstack" style={{ width: skillsVisible ? '80%' : '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Frontend & Tools */}
            <div className="skill-category-card animate-on-scroll">
              <div className="skill-category-header">
                <div className="skill-category-icon frontend">
                  <Globe size={22} />
                </div>
                <h3 className="skill-category-title">Frontend & Tools</h3>
              </div>
              
              <div className="skill-items-list">
                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">React / React Query</span>
                    <span className="skill-item-level">80%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill frontend" style={{ width: skillsVisible ? '80%' : '0%' }}></div>
                  </div>
                </div>
                
                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">Tailwind CSS</span>
                    <span className="skill-item-level">75%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill frontend" style={{ width: skillsVisible ? '75%' : '0%' }}></div>
                  </div>
                </div>

                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">Git & GitHub</span>
                    <span className="skill-item-level">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill frontend" style={{ width: skillsVisible ? '85%' : '0%' }}></div>
                  </div>
                </div>

                <div className="skill-item-row">
                  <div className="skill-item-info">
                    <span className="skill-item-name">Postman / API Testing</span>
                    <span className="skill-item-level">90%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill frontend" style={{ width: skillsVisible ? '90%' : '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <div className="section-title-wrapper">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Handcrafted systems illustrating architecture and scale</p>
          </div>

          <div className="project-filters">
            <button 
              className={`filter-btn ${projectFilter === 'all' ? 'active' : ''}`}
              onClick={() => setProjectFilter('all')}
            >
              All Systems
            </button>
            <button 
              className={`filter-btn ${projectFilter === 'backend' ? 'active' : ''}`}
              onClick={() => setProjectFilter('backend')}
            >
              Backend Focus
            </button>
            <button 
              className={`filter-btn ${projectFilter === 'fullstack' ? 'active' : ''}`}
              onClick={() => setProjectFilter('fullstack')}
            >
              Full-Stack
            </button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className={`project-card ${project.id} animate-on-scroll`}>
                <div className="project-card-image-sim">
                  <div className="project-sim-logo">
                    {project.id === 'rynqor' ? <Layers size={36} /> : <Database size={36} />}
                    {project.title}
                  </div>
                </div>

                <div className="project-card-body">
                  <div className="project-title-row">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-links">
                      <a href={project.github} className="project-link-icon" target="_blank" rel="noreferrer" title="View Source">
                        <Github size={20} />
                      </a>
                      <a href={project.live} className="project-link-icon" target="_blank" rel="noreferrer" title="Live Preview">
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>

                  <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                    {project.subTitle}
                  </p>

                  <div className="project-tech-tags">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="tech-tag">{t}</span>
                    ))}
                  </div>

                  <ul className="project-description-list">
                    {project.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience">
          <div className="section-title-wrapper">
            <h2 className="section-title">History & Qualifications</h2>
            <p className="section-subtitle">Professional experience and educational milestones</p>
          </div>

          <div className="experience-layout">
            {/* Timeline */}
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={20} color="var(--color-primary)" /> Experience
              </h3>
              
              <div className="timeline-container">
                <div className="timeline-card animate-on-scroll">
                  <div className="timeline-dot"></div>
                  <div className="timeline-header">
                    <div>
                      <h4 className="timeline-title">Web Development Intern</h4>
                      <div className="timeline-subtitle">OctaNet Software Solution Pvt. Ltd.</div>
                    </div>
                    <span className="timeline-date">Jul 2023 - Aug 2023</span>
                  </div>
                  
                  <ul className="timeline-bullets">
                    <li>Built responsive, cross-device-compatible web interfaces using HTML5, CSS3, and JavaScript ensuring consistent browser rendering.</li>
                    <li>Developed an interactive task management application with local storage persistence and real-time dynamic UI updates.</li>
                    <li>Engineered reusable frontend React components and responsive layout templates following web development best practices.</li>
                  </ul>
                </div>
              </div>

              <h3 style={{ fontSize: '1.4rem', margin: '3rem 0 2rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} color="var(--color-accent-cyan)" /> Education
              </h3>

              <div className="education-container">
                <div className="edu-card animate-on-scroll">
                  <div className="edu-header">
                    <div>
                      <h4 className="edu-institution">Tula's Institute</h4>
                      <div className="edu-degree">B.Tech in Computer Science & Engineering</div>
                    </div>
                    <span className="timeline-date">Oct 2021 - Jun 2025</span>
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Studied core computing sciences including Data Structures & Algorithms, Database Design, REST API architectures, and Object-Oriented Programming (C++/Python). Based in Dehradun, Uttarakhand.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements & Certifications */}
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="var(--color-accent-purple)" /> Certifications & Awards
              </h3>

              <div className="achievements-card animate-on-scroll">
                <div className="achievements-list">
                  <div className="achievement-item">
                    <Award size={18} />
                    <div>
                      <strong style={{ color: 'var(--color-text-primary)' }}>Utkrisht-XI Organizing Team Member</strong>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Coordinated logistics of a technical event with 20+ cross-functional team members, ensuring on-time delivery of all event operations.</p>
                    </div>
                  </div>

                  <div className="achievement-item">
                    <Award size={18} />
                    <div>
                      <strong style={{ color: 'var(--color-text-primary)' }}>Node.js Developer Certification</strong>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Credential verifying backend design patterns, asynchronous JavaScript programming, and Express API routing paradigms.</p>
                    </div>
                  </div>

                  <div className="achievement-item">
                    <Award size={18} />
                    <div>
                      <strong style={{ color: 'var(--color-text-primary)' }}>Web Development Internship Certification</strong>
                      <p style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>Awarded by OctaNet Software Solution for successful deployment of interface designs and components.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Resume Link Box */}
              <div 
                style={{ 
                  marginTop: '2rem', 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'left'
                }}
              >
                <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="var(--color-primary)" /> Looking for my Resume?
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
                  Download a print-friendly version of my professional resume detailing my skills and coursework.
                </p>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert("Resume PDF opened or downloaded!"); }} 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                >
                  Download PDF Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact">
          <div className="section-title-wrapper">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Let's discuss opportunities, API design, or scale problems</p>
          </div>

          <div className="contact-grid">
            {/* Contact Channels */}
            <div className="contact-info animate-on-scroll">
              <h3>Let's build something scalable.</h3>
              <p className="contact-info-desc">
                I am currently looking for full-time backend or full-stack software engineer opportunities. Reach out if you have openings or just want to chat about tech.
              </p>
              
              <div className="contact-channels">
                <a href="mailto:abhirawat8076@gmail.com" className="contact-channel-card">
                  <div className="contact-channel-icon">
                    <Mail size={18} />
                  </div>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">Email</span>
                    <span className="contact-channel-val">abhirawat8076@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+919625690703" className="contact-channel-card">
                  <div className="contact-channel-icon">
                    <Phone size={18} />
                  </div>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">Phone</span>
                    <span className="contact-channel-val">+91-9625690703</span>
                  </div>
                </a>

                <div className="contact-channel-card">
                  <div className="contact-channel-icon">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-channel-details">
                    <span className="contact-channel-label">Location</span>
                    <span className="contact-channel-val">South Delhi, Delhi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-card animate-on-scroll">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-name">Name</label>
                    <input 
                      type="text" 
                      id="form-name" 
                      className="form-input" 
                      placeholder="Your Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-email">Email</label>
                    <input 
                      type="email" 
                      id="form-email" 
                      className="form-input" 
                      placeholder="your.email@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="form-subject">Subject</label>
                  <input 
                    type="text" 
                    id="form-subject" 
                    className="form-input" 
                    placeholder="API Integration / Job Opportunity"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="form-message">Message</label>
                  <textarea 
                    id="form-message" 
                    className="form-input" 
                    placeholder="Tell me about your system requirements or job profile..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                {formStatus === 'success' && (
                  <div className="form-status success">
                    ✅ Message sent! I'll get back to you soon.
                  </div>
                )}
                {formStatus === 'fallback' && (
                  <div className="form-status success">
                    📧 Your email app opened as a backup — please hit send there!
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="form-status error">
                    Oops! Please fill in all required fields.
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={formStatus === 'sending'}
                  style={{ alignSelf: 'flex-start', border: 'none' }}
                >
                  {formStatus === 'sending' ? 'Sending System Packet...' : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            abhishek.rawat()
          </div>
          
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Abhishek Rawat. Designed with a premium Sleek Dark Mode.
          </div>

          <div className="footer-socials">
            <a href="https://github.com/abhirawat03" className="footer-social-link" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/abhishekrawat" className="footer-social-link" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:abhirawat8076@gmail.com" className="footer-social-link" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
