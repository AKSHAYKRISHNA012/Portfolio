import React from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';
import { Github } from './SocialIcons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '750px',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative',
        background: '#121824',
        border: '1px solid rgba(99, 102, 241, 0.4)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: 'var(--text-secondary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Title Header */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2rem' }}>
          <span className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>
            {project.badge}
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '0.3rem' }}>
            {project.title}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
            {project.event}
          </p>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '1.8rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Project Overview & Impact
          </h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {project.description}
          </p>
        </div>

        {/* Technical Highlights & Metrics */}
        <div style={{ marginBottom: '1.8rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Key Performance Metrics
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {project.metrics.map((m, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}>
                <CheckCircle2 size={16} color="var(--accent-emerald)" />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Tech Stack */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Technologies & Frameworks Used
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.tech.map((t, idx) => (
              <span key={idx} style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: 'var(--accent-indigo)',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Github size={18} /> View Source Code on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
