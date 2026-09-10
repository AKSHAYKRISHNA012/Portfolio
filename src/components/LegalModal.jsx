import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, Globe } from 'lucide-react';

export default function LegalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('privacy');

  if (!isOpen) return null;

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
        maxWidth: '700px',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '2rem',
        background: '#121824',
        border: '1px solid var(--glass-border)'
      }}>
        {/* Modal Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color="var(--accent-emerald)" />
            Legal Compliance & Privacy
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: activeTab === 'privacy' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'privacy' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Privacy Policy (DPDP 2023 & GDPR)
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: activeTab === 'terms' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'terms' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('wcag')}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: activeTab === 'wcag' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: activeTab === 'wcag' ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Accessibility (WCAG 2.1 AA)
          </button>
        </div>

        {/* Content Body */}
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {activeTab === 'privacy' && (
            <div>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Data Privacy Statement</h4>
              <p style={{ marginBottom: '1rem' }}>
                This personal portfolio website strictly respects visitor privacy. No tracking cookies or third-party telemetry scripts are deployed. Information submitted via the contact form is used exclusively for professional communication with Akshay Krishna A.
              </p>
              <p>Compliant with Digital Personal Data Protection (DPDP) Act 2023 and EU GDPR standards.</p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Terms of Service</h4>
              <p style={{ marginBottom: '1rem' }}>
                All projects, source code snippets, and research publications displayed on this website are the intellectual property of Akshay Krishna A unless otherwise attributed to hackathon partners or open-source licenses.
              </p>
              <p>Visitors are welcome to inspect source code repositories on GitHub for non-commercial educational review.</p>
            </div>
          )}

          {activeTab === 'wcag' && (
            <div>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>WCAG 2.1 AA Accessibility Statement</h4>
              <p style={{ marginBottom: '1rem' }}>
                This web application adheres to the Vercel Web Interface Guidelines and WCAG 2.1 AA accessibility standards, featuring high-contrast color ratios, semantic HTML5 landmarks, and full keyboard navigation compatibility.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
