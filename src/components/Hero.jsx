import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Mail, 
  MapPin, 
  Award, 
  Sparkles,
  ChevronDown,
  Code2,
  Cpu,
  BrainCircuit
} from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

import akshayPhoto from '../assets/akshay.jpg';

export default function Hero({ onOpenResume }) {
  const titles = [
    'Python Full-Stack Engineer',
    'AI & Computer Vision Innovator',
    'Google Developer Student Club Lead',
    'Infosys Global Hackathon Winner',
    'IEEE SB Chairman & Mentor'
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullTitle = titles[currentTitleIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentFullTitle) {
      speed = 2000; // Pause at full word
      const timer = setTimeout(() => setIsDeleting(true), speed);
      return () => clearTimeout(timer);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentFullTitle.substring(0, displayText.length - 1)
          : currentFullTitle.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '7rem',
      position: 'relative'
    }}>
      {/* Background Glow Spheres */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: -1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: -1
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '3rem',
        alignItems: 'center',
        '@media (max-width: 900px)': { gridTemplateColumns: '1fr' }
      }} className="hero-grid">
        
        {/* Left Column: Text & CTA */}
        <div>
          {/* Status Badge */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="badge badge-emerald">
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 10px var(--accent-emerald)',
                display: 'inline-block'
              }} />
              Open to Software & AI Roles
            </span>
            <span className="badge badge-purple">
              <MapPin size={12} />
              Thiruvananthapuram, India
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1rem'
          }}>
            Hi, I'm <br />
            <span className="text-gradient">AKSHAY KRISHNA A</span>
          </h1>

          {/* Typewriter Subheading */}
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--accent-cyan)',
            minHeight: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.5rem'
          }}>
            <Code2 size={24} color="var(--accent-cyan)" />
            <span>{displayText}</span>
            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: 'var(--accent-cyan)',
              animation: 'pulseGlow 0.8s infinite'
            }} />
          </div>

          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '560px',
            lineHeight: 1.7
          }}>
            Computer Science engineer specialized in <strong>Python Full-Stack Development</strong>, <strong>AI-Powered Applications</strong>, and <strong>Computer Vision</strong>. Proven leader spearheading campus developer communities (GDSC Lead, IEEE SB Chair) & hackathon winner.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <a href="#projects" className="btn btn-primary">
              View Featured Projects <ArrowRight size={18} />
            </a>
            <button onClick={onOpenResume} className="btn btn-secondary">
              Inspect Resume
            </button>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Connect
            </span>
            <a 
              href="https://github.com/AKSHAYKRISHNA012" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Github size={22} />
            </a>
            <a 
              href="https://linkedin.com/in/akshay-krishna-a-749151222" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Linkedin size={22} />
            </a>
            <a 
              href="mailto:akshaykrishna.a.2002@gmail.com" 
              style={{ color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Mail size={22} />
            </a>
          </div>
        </div>

        {/* Right Column: Hero Profile Picture Card & Visual */}
        <div className="animate-float" style={{ position: 'relative' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '140px',
              height: '140px',
              background: 'var(--gradient-primary)',
              filter: 'blur(40px)',
              opacity: 0.35
            }} />

            {/* Profile Photo Container */}
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '2px solid rgba(99, 102, 241, 0.4)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              marginBottom: '1.5rem',
              maxHeight: '380px'
            }}>
              <img 
                src={akshayPhoto} 
                alt="Akshay Krishna A"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(10, 13, 20, 0.95), transparent)',
                padding: '1.5rem 1rem 0.8rem 1rem'
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Akshay Krishna A</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  B.Tech CS ('25) • Full Stack & AI Lead
                </p>
              </div>
            </div>

            {/* Metric Highlights Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-indigo)' }}>₹60,000</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>KSUM Startup Grant Winner</p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-purple)' }}>Winner</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Infosys Global & IDEA FEST</p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>80+</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>IEEE Branches Mentored</p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>Level 7</span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>GTech MuLearner Achiever</p>
              </div>
            </div>

            {/* Highlighted Honor */}
            <div style={{
              marginTop: '1.5rem',
              padding: '0.8rem 1rem',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Award size={20} color="var(--accent-amber)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                Represented Kerala at <strong>Viksit Bharat 2025</strong> in presence of PM Narendra Modi.
              </span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
