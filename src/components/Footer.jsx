import React from 'react';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

export default function Footer({ onOpenLegal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'rgba(10, 13, 20, 0.95)',
      borderTop: '1px solid var(--glass-border)',
      padding: '3rem 1.5rem 2rem 1.5rem',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
              AKSHAY <span className="text-gradient">KRISHNA A</span>
            </span>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <a href="https://github.com/AKSHAYKRISHNA012" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/akshay-krishna-a-749151222" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <Linkedin size={20} />
            </a>
            <a href="mailto:akshaykrishna.a.2002@gmail.com" style={{ color: 'var(--text-secondary)' }}>
              <Mail size={20} />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} Akshay Krishna A. Built with React 19 & Antigravity Swarm Engine.
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={onOpenLegal}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Privacy & Legal Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
