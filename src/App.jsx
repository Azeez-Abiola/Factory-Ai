import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, TrendingUp, Microscope, Users, 
  Shield, Zap, Cpu, Radio, Target, Lock,
  ArrowRight, ChevronRight, ChevronLeft, Sun, Moon,
  AlertCircle, Activity, Layout, Database,
  CheckCircle, Globe, ShieldCheck,
  Camera, Bell, Clipboard, BarChart2
} from 'lucide-react';
import { useScroll, useTransform } from 'framer-motion';
import './index.css';

/* ─────────────────────────────────────────────
   Branding Assets
   ───────────────────────────────────────────── */
const LOGO_PATH = '/images/logo.png';

/* ─────────────────────────────────────────────
   Scroll Reveal Hook (Repeatable)
   ───────────────────────────────────────────── */
function useReveal(view) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible'); 
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, [view]);
}

const WavyText = ({ text }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="serif"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <span key={index} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span variants={child} style={{ display: 'inline-block' }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

/* ─────────────────────────────────────────────
   Navbar Scroll Hook
   ───────────────────────────────────────────── */
function useNavScroll() {
  useEffect(() => {
    const nav = document.querySelector('.nav');
    const handler = () => {
      if (window.scrollY > 60) nav?.classList.add('scrolled');
      else nav?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
}

/* ═════════════════════════════════════════════
   APP
   ═════════════════════════════════════════════ */
const App = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, -120]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('landing'); 
  const [dashTab, setDashTab] = useState('overview');
  const [showPass, setShowPass] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    '/images/dashboard.png',
    '/images/camera.png',
    '/images/robotic-arm.png'
  ];

  useEffect(() => {
    if (view === 'login') {
      const timer = setInterval(() => {
        setSlideIndex(prev => (prev + 1) % slides.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [view]);
  
  useReveal(view);
  useNavScroll();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  /* ═════════════════════════════════════════════
     LOGIN VIEW
     ═════════════════════════════════════════════ */
  if (view === 'login') {
    return (
      <div className="login-container">
        <motion.div 
          className="login-visual"
          style={{ position: 'relative', overflow: 'hidden' }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {slides.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === slideIndex ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `url(${img}) center/cover no-repeat`,
                zIndex: 0
              }}
            />
          ))}
          <div className="login-visual-content" style={{ position: 'relative', zIndex: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img src={LOGO_PATH} alt="Factory Ai Logo" style={{ width: 42, height: 42 }} />
              <h2 style={{ margin: 0, fontSize: '3rem' }}>Factory Ai</h2>
            </div>
            <p>The leading autonomous visual intelligence platform for modern manufacturers. Eliminating blind spots and streamlining compliance across your entire floor.</p>
          </div>
        </motion.div>
        <div className="login-form-side">
          <motion.div 
            className="login-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <button 
              onClick={() => setView('landing')} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2.5rem', padding: 0 }}
            >
              <ChevronLeft size={16} /> Back
            </button>
            <h2 className="serif" style={{ color: 'var(--text-dark)' }}>Platform Login</h2>
            <p>Access your real-time production intelligence and safety monitoring systems.</p>
            
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="operations@factoryai.com" defaultValue="admin@factoryai.com" />
            </div>
            
            <div className="input-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPass ? "text" : "password"} 
                  placeholder="••••••••" 
                  defaultValue="password123" 
                  style={{ paddingRight: '40px' }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ 
                    position: 'absolute', 
                    right: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPass ? <Eye size={18} /> : <Eye size={18} style={{ opacity: 0.5 }} />}
                </button>
              </div>
            </div>
            
            <button className="login-btn" onClick={() => setView('dashboard')}>
              Login
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ═════════════════════════════════════════════
     DASHBOARD VIEW (Voltera Mirror)
     ═════════════════════════════════════════════ */
  if (view === 'dashboard') {
    return (
      <div className="dash-layout-voltera">
        <aside className="v-sidebar">
          <div className="v-logo">
            <img src={LOGO_PATH} alt="Logo" style={{ width: 22, height: 22, filter: theme === 'dark' ? 'brightness(3)' : 'none' }} />
            Factory AI
          </div>
          
          <nav className="v-nav">
            <div className={`v-nav-item ${dashTab === 'overview' ? 'active' : ''}`} onClick={() => setDashTab('overview')}>
              <Layout size={18} /> Overview
            </div>
            <div className={`v-nav-item ${dashTab === 'alerts' ? 'active' : ''}`} onClick={() => setDashTab('alerts')}>
              <AlertCircle size={18} /> Alerts & Incidents <span className="v-badge" style={{ background: 'var(--accent)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', marginLeft: 'auto' }}>16</span>
            </div>
            <div className={`v-nav-item ${dashTab === 'feeds' ? 'active' : ''}`} onClick={() => setDashTab('feeds')}>
              <Eye size={18} /> Camera Feeds
            </div>
            <div className={`v-nav-item ${dashTab === 'reports' ? 'active' : ''}`} onClick={() => setDashTab('reports')}>
              <Database size={18} /> Reports & Logs
            </div>
            <div className="v-nav-item"><Activity size={18} /> Optimization</div>
          </nav>

          <div className="v-footer">
            <div className="v-nav-item" style={{ marginBottom: '1rem' }} onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />} {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </div>
            <div className="profile-card" onClick={() => setView('landing')}>
              <div className="avatar" style={{ background: 'var(--accent)', color: 'white' }}>DD</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>David Dogeni</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>Operations Manager</div>
              </div>
              <ChevronRight size={14} style={{ opacity: 0.3 }} />
            </div>
          </div>
        </aside>

        <main className="v-main">
          <header className="v-header">
            <div className="v-header-left">
              <h1>
                {dashTab === 'overview' && 'Intelligence Overview'}
                {dashTab === 'alerts' && 'Alerts & Incidents'}
                {dashTab === 'feeds' && 'Live Camera Feeds'}
                {dashTab === 'reports' && 'Reports & Logs'}
              </h1>
              <p>
                {dashTab === 'overview' && 'Monitor real-time factory safety and production efficiency.'}
                {dashTab === 'alerts' && 'Active system anomalies requiring attention.'}
                {dashTab === 'feeds' && 'Real-time AI-supervised vision streams.'}
                {dashTab === 'reports' && 'Historical compliance and safety documentation.'}
              </p>
            </div>
            <div className="v-search">
              <Eye size={16} style={{ opacity: 0.4 }} />
              <input type="text" placeholder="Search systems..." />
            </div>
          </header>

          <motion.div
            key={dashTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {dashTab === 'overview' && (
              <>
                <div className="v-metrics">
                  {[
                    { label: 'Safety Index', val: '98.2%', trend: '+1.4%', up: true },
                    { label: 'Production Uptime', val: '99.98%', trend: '+0.02%', up: true },
                    { label: 'Open Incidents', val: '04', trend: '2 Critical', up: false },
                    { label: 'Efficiency Score', val: '92.4%', trend: '+1.5%', up: true }
                  ].map((m, i) => (
                    <div className="v-metric" key={i}>
                      <h5>{m.label}</h5>
                      <div className="v-metric-val">{m.val}</div>
                      <div className={`v-metric-trend ${m.up ? 'up' : 'down'}`} style={{ color: m.up ? '#2EE59D' : '#FF4D4D' }}>
                        {m.up ? '↑' : '↓'} {m.trend}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="v-grid">
                  <div className="v-card" style={{ padding: '0' }}>
                     <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--voltera-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Active Alerts</h3>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="v-btn-pill">View All</button>
                        </div>
                     </div>
                     <div style={{ padding: '0 1.5rem' }}>
                       {[
                         { id: 'EV-8291', title: 'Unauthorized Zone Breach', zone: 'Sector 4', time: '14:23', type: 'High' },
                         { id: 'EV-8290', title: 'Missing Safety Helmet', zone: 'Dock A', time: '13:45', type: 'Medium' },
                         { id: 'EV-8289', title: 'Compressor Efficiency Drop', zone: 'Plant B', time: '12:10', type: 'High' },
                       ].map((alert, i) => (
                         <div className="v-alert-item" key={i}>
                           <div className="v-alert-dot" style={{ background: alert.type === 'High' ? 'var(--accent)' : 'var(--voltera-muted)' }}></div>
                           <div className="v-alert-meta">
                             <h6 style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.2rem' }}>{alert.title}</h6>
                             <p style={{ fontSize: '0.75rem', color: 'var(--voltera-muted)' }}>{alert.time} • {alert.id}</p>
                           </div>
                           <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{alert.zone}</div>
                           <button className="v-btn-pill" style={{ color: alert.type === 'High' ? 'var(--accent)' : 'inherit' }}>Details</button>
                         </div>
                       ))}
                     </div>
                  </div>

                  <div className="v-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>AI Recommendations</h3>
                    <div className="rec-card" style={{ padding: '1.25rem', background: 'var(--voltera-bg)', borderRadius: '12px' }}>
                       <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', lineHeight: 1.5 }}>Schedule maintenance for Robot Cell 9 to prevent potential collision downtime.</p>
                       <div className="rec-btns" style={{ display: 'flex', gap: '0.5rem' }}>
                         <button className="v-btn-pill" style={{ background: 'var(--accent)', color: 'white', border: 'none' }}>Accept</button>
                         <button className="v-btn-pill">Dismiss</button>
                       </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {dashTab === 'alerts' && (
              <div className="v-card" style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--voltera-border)' }}>
                  <h3 style={{ fontSize: '1.1rem' }}>Incident Log</h3>
                </div>
                <div style={{ padding: '0 2rem' }}>
                  {[
                    { id: 'EV-8291', title: 'Unauthorized Zone Breach', zone: 'Heavy Machining - Sector 4', time: '14:23:12', type: 'Critical', status: 'Verifying' },
                    { id: 'EV-8290', title: 'Missing Safety Helmet', zone: 'Loading Dock A', time: '14:15:05', type: 'High', status: 'Alert Sent' },
                    { id: 'EV-8289', title: 'Emergency Exit Blocked', zone: 'Main Hallway', time: '13:45:22', type: 'Critical', status: 'Immediate Action' },
                    { id: 'EV-8288', title: 'Machine Overheat Potential', zone: 'Assembly Line 2', time: '13:12:44', type: 'High', status: 'Logged' },
                    { id: 'EV-8287', title: 'Operator Not at Station', zone: 'Packaging Line 1', time: '12:55:10', type: 'Safety', status: 'Reviewing' },
                  ].map((alert, i) => (
                    <div className="v-alert-item" key={i} style={{ gridTemplateColumns: 'auto 1fr 1fr 1fr auto' }}>
                      <div className="v-alert-dot" style={{ background: alert.type === 'Critical' ? '#FF4D4D' : '#FF9900' }}></div>
                      <div className="v-alert-meta">
                        <h6>{alert.title}</h6>
                        <p>{alert.id}</p>
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>{alert.zone}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600 }}>{alert.status}</div>
                      <div style={{ fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.05)', fontWeight: 700 }}>{alert.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {dashTab === 'feeds' && (
              <div className="grid-responsive grid-3 gap-2">
                {[
                  { name: 'Entrance - Gate 1', zone: 'External', active: true },
                  { name: 'Assembly Alpha', zone: 'Floor 1', active: true },
                  { name: 'Conveyor 4B', zone: 'Floor 1', active: true },
                  { name: 'Storage West', zone: 'Warehouse', active: true },
                  { name: 'Robot Cell 9', zone: 'Core', active: false },
                  { name: 'Packaging S3', zone: 'Floor 2', active: true },
                ].map((feed, i) => (
                  <div className="v-card" key={i} style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ background: '#000', aspectHeight: '16/10', height: '180px', position: 'relative' }}>
                      {feed.active ? <div style={{ position: 'absolute', top: 15, left: 15, color: '#FF4D4D', fontSize: '0.65rem', fontWeight: 800 }}>● LIVE</div> : <div style={{ color: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>OFFLINE</div>}
                    </div>
                    <div style={{ padding: '1.2rem' }}>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>{feed.name}</h4>
                      <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>{feed.zone}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {dashTab === 'reports' && (
               <div className="v-card" style={{ padding: '0' }}>
               <table className="reports-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead>
                   <tr style={{ background: 'rgba(0,0,0,0.02)', textAlign: 'left' }}>
                     <th style={{ padding: '1.2rem 2rem', fontSize: '0.8rem', opacity: 0.5 }}>DOCUMENT</th>
                     <th style={{ padding: '1.2rem 2rem', fontSize: '0.8rem', opacity: 0.5 }}>TYPE</th>
                     <th style={{ padding: '1.2rem 2rem', fontSize: '0.8rem', opacity: 0.5 }}>COMPLIANCE</th>
                     <th style={{ padding: '1.2rem 2rem', fontSize: '0.8rem', opacity: 0.5 }}>GENERATED</th>
                   </tr>
                 </thead>
                 <tbody>
                   {[
                     { name: 'Shift B Safety Review', type: 'Safety', status: 'Passed', date: 'Mar 24 • 14:00' },
                     { name: 'Weekly Quality Audit - L1', type: 'Quality', status: 'Passed', date: 'Mar 22 • 09:12' },
                     { name: 'Machinery Wear Report', type: 'Maintenance', status: 'Attention', date: 'Mar 21 • 17:45' },
                     { name: 'Regulatory GMP Compliance', type: 'Regulatory', status: 'Verified', date: 'Mar 01 • 08:00' },
                   ].map((report, i) => (
                     <tr key={i} style={{ borderTop: '1px solid var(--voltera-border)' }}>
                       <td style={{ padding: '1.2rem 2rem', fontSize: '0.9rem', fontWeight: 600 }}>{report.name}</td>
                       <td style={{ padding: '1.2rem 2rem', fontSize: '0.85rem' }}>{report.type}</td>
                       <td style={{ padding: '1.2rem 2rem', fontSize: '0.85rem', color: report.status === 'Passed' ? '#2EE59D' : '#FF9900' }}>{report.status}</td>
                       <td style={{ padding: '1.2rem 2rem', fontSize: '0.8rem', opacity: 0.5 }}>{report.date}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
            )}
          </motion.div>
        </main>
      </div>
    );
  }

  /* ═════════════════════════════════════════════
     LANDING VIEW
     ═════════════════════════════════════════════ */
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); setView('landing'); }}>
            <img src={LOGO_PATH} alt="Factory Ai Logo" style={{ width: 28, height: 28, filter: theme === 'dark' ? 'none' : 'none', opacity: 1, display: 'block' }} />
            <span style={{ color: 'var(--text-dark)' }}>Factory Ai</span>
          </a>

          <div className="nav-links-right">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="nav-cta" onClick={() => setView('login')}>Explore Platform</button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <motion.div 
            className="hero-badge reveal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Autonomous Visual Intelligence
          </motion.div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto 1.5rem', lineHeight: 1.1 }}>
            <WavyText text="AI That Watches Your Factory" />
            <div style={{ marginTop: '0.5rem' }}>
              <WavyText text="So You Don't Have To" />
            </div>
          </div>

          <p className="hero-sub reveal" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Turn your factory into an AI-powered smart operation. Join manufacturers who are eliminating blind spots and building safer, smarter factories.
          </p>

          <motion.div
            className="hero-ctas reveal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button className="btn-accent" onClick={() => setView('login')}>
              Explore Platform <ChevronRight size={16} />
            </button>
          </motion.div>

          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ y: heroY, scale: heroScale }}
          >
            <img src="/images/camera.png" alt="Visual Intelligence Preview" />
          </motion.div>
        </div>
      </section>

      <section id="problem" className="technology" style={{ background: 'var(--white)', padding: '5rem 0' }}>
        <div className="section-inner">
          <div className="section-title reveal">
            <h2 className="serif">Your Factory Has Blind Spots</h2>
          </div>
          <p className="section-subtitle reveal" style={{ marginBottom: '3rem' }}>
            Human supervision is limited. AI oversight is constant.
          </p>

          <div className="tech-list" style={{ marginTop: '0' }}>
            <div className="tech-item reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="tech-content">
                <AlertCircle color="var(--accent)" size={32} style={{ marginBottom: '1.2rem' }} />
                <h3>Undetected Safety Risks</h3>
                <p>
                  Workers skip PPE, enter restricted zones, and interact unsafely with machinery. 
                  <b> 60% of safety violations</b> go unnoticed until an incident occurs.
                </p>
              </div>
              <div className="tech-visual">
                <img src="/images/hero-visual.png" alt="Safety Monitoring" />
              </div>
            </div>

            <div className="tech-item reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="tech-visual" style={{ justifyContent: 'flex-start' }}>
                <img src="/images/dashboard.png" alt="Production Loss" />
              </div>
              <div className="tech-content">
                <Activity color="var(--accent)" size={32} style={{ marginBottom: '1.2rem' }} />
                <h3>Hidden Production Losses</h3>
                <p>
                  Machine downtime, bottlenecks, and idle workstations silently erode output. 
                  Manufacturers average <b>23% OEE loss</b> due to delayed operational visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="architecture-section">
        <div className="section-inner">
          <div className="arch-header reveal">
            <span className="label">Architecture</span>
            <h2 className="serif">Simple Architecture, <span>Powerful Results</span></h2>
          </div>

          <div className="arch-flow">
            {[
              { icon: <Camera size={38} strokeWidth={1.5} />, label: 'Cameras' },
              { icon: <Cpu size={38} strokeWidth={1.5} />, label: 'AI Detection' },
              { icon: <Bell size={38} strokeWidth={1.5} />, label: 'Alerts' },
              { icon: <Clipboard size={38} strokeWidth={1.5} />, label: 'Tasks' },
              { icon: <BarChart2 size={38} strokeWidth={1.5} />, label: 'Analytics' }
            ].map((item, i) => (
              <React.Fragment key={i}>
                <div className="arch-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="arch-icon">{item.icon}</div>
                  <h4>{item.label}</h4>
                </div>
                {i < 4 && <ChevronRight className="arch-arrow reveal" size={24} style={{ transitionDelay: `${i * 0.1 + 0.05}s` }} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section id="systems" className="core-systems">
        <div className="section-inner">
          <div className="section-title reveal">
            <h2 className="serif">Core Systems</h2>
          </div>
          <div className="systems-grid">
            {[
              { icon: <Layout size={26} />, title: 'Visual Compliance', sub: 'Detect missing PPE, zone breaches, and unsafe behaviors in real-time.' },
              { icon: <Activity size={26} />, title: 'Production Loss', sub: 'Identify downtime root causes and bottlenecks to optimize OEE performance.' },
              { icon: <Target size={26} />, title: 'Quality Inspection', sub: 'Zero-escape inspection for packaging, labeling, and surface defects.' },
              { icon: <Users size={26} />, title: 'Workforce Intelligence', sub: 'Monitor floor activity patterns and productivity trends for better shift planning.' },
              { icon: <Database size={26} />, title: 'Compliance Logs', sub: 'Automated, 100% audit-ready visual records of every floor incident.' },
              { icon: <Shield size={26} />, title: 'Secure Infrastructure', sub: 'SOC 2 compliant, encrypted processing at the edge or in your cloud.' },
            ].map((item, i) => (
              <div className={`system-item reveal reveal-delay-${i % 3 + 1}`} key={i}>
                <div>
                  <div className="system-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mission" className="mission-banner">
        <div className="mission-inner">
          <div className="mission-text reveal">
            <h2 className="serif">Achieve <span>100% Audit-Ready</span> Operations</h2>
            <div className="grid-responsive grid-2 gap-2 mt-4" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <div>
                <h4 style={{ color: 'var(--accent)', fontSize: '2rem' }}>91% fewer</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Safety incidents documented.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--accent)', fontSize: '2rem' }}>34% output</h4>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Production gain achieved.</p>
              </div>
            </div>
            <button className="btn-accent-outline" onClick={() => setView('login')}>Review KPI Data <ArrowRight size={14} /></button>
          </div>
          <div className="mission-image reveal">
            <img src="/images/dashboard.png" alt="Operational Dashboard" />
          </div>
        </div>
      </section>

      <section id="industries" className="core-systems" style={{ 
        background: 'var(--white)',
        backgroundImage: 'linear-gradient(rgba(243, 244, 246, 0.85), rgba(243, 244, 246, 0.85)), url(/images/hero-visual.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="section-inner">
          <div className="section-title reveal">
            <h2 className="serif">Industry Applications</h2>
          </div>
          <div className="grid-responsive grid-3 gap-3 mt-4">
             {[
               { icon: <Globe size={24} />, title: 'FMCG Manufacturing', desc: 'Quality and packaging monitoring at high speeds.' },
               { icon: <CheckCircle size={24} />, title: 'Food Processing', desc: 'Hygiene compliance and contamination prevention.' },
               { icon: <ShieldCheck size={24} />, title: 'Pharmaceutical', desc: 'GMP compliance and cleanroom monitoring.' }
             ].map((industry, i) => (
               <div className="reveal" key={i} style={{ padding: '2.5rem', border: '1px solid #000', borderRadius: 20, background: 'transparent', backdropFilter: 'blur(5px)' }}>
                 <div style={{ color: 'var(--accent)', marginBottom: '1.2rem' }}>{industry.icon}</div>
                 <h4 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>{industry.title}</h4>
                 <p className="text-sm muted" style={{ lineHeight: 1.6 }}>{industry.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section id="enterprise" className="mission-banner" style={{ background: 'var(--black)', color: 'white' }}>
        <div className="section-inner">
          <div className="section-title reveal">
            <h2 className="serif">Enterprise Foundation</h2>
          </div>
          <div className="grid-responsive grid-3 gap-3 mt-4">
             {[
               { icon: <ShieldCheck size={32} />, title: 'Security & Privacy', desc: 'SOC 2 Type II compliant, end-to-end encryption, and on-premise deployment options.' },
               { icon: <Globe size={32} />, title: 'Scalable Architecture', desc: 'Supports multi-site deployments with Edge + Cloud architecture and 99.99% SLA.' },
               { icon: <Database size={32} />, title: 'Deep Integrations', desc: 'Works with SAP, Oracle, Siemens MES, and Microsoft stacks through our API.' }
             ].map((item, i) => (
               <div className="reveal" key={i} style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20 }}>
                 <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>{item.icon}</div>
                 <h4 className="serif" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{item.title}</h4>
                 <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section id="cta" className="cta-section">
        <div className="section-inner">
          <motion.h2 className="serif reveal">Start Your<br />AI Evolution</motion.h2>
          <motion.div className="reveal">
            <button className="btn-accent" onClick={() => setView('login')}>Get Started <ChevronRight size={16} /></button>
          </motion.div>
          <div className="cta-image reveal">
            <img src="/images/robotic-arm.png" alt="Robotics" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <img src={LOGO_PATH} alt="Factory Ai Logo" style={{ width: 24, height: 24, filter: theme === 'dark' ? 'invert(1)' : 'none' }} />
            Factory Ai
          </div>
          <div className="footer-links">
            <a href="#problem">The Problem</a>
            <a href="#systems">Platform</a>
            <a href="#technology">Technology</a>
          </div>
          <div className="footer-copy">&copy; 2026 Factory Ai Intelligence</div>
        </div>
      </footer>
    </>
  );
};

export default App;
