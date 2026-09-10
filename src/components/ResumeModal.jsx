import React from 'react';
import { X, Download, Printer, Mail, Phone, MapPin, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import akshayPhoto from '../assets/akshay.jpg';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '850px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2.5rem',
        background: '#0a0d14',
        border: '1px solid var(--accent-indigo)',
        boxShadow: '0 0 50px rgba(99, 102, 241, 0.2)'
      }}>
        {/* Modal Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--glass-border)',
          paddingBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-emerald)' }} />
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Official Resume Viewer — AKSHAY KRISHNA A
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              <Printer size={15} /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div id="printable-resume">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--accent-indigo)',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
              flexShrink: 0
            }}>
              <img 
                src={akshayPhoto} 
                alt="Akshay Krishna A"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', letterSpacing: '0.02em', margin: 0 }}>
                AKSHAY KRISHNA A
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span>✉️ akshaykrishna.a.2002@gmail.com</span>
                <span>📞 +91 9495339212</span>
                <span>📍 Thiruvananthapuram, Kerala</span>
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)', marginTop: '0.2rem', display: 'flex', gap: '1rem' }}>
                <span>GitHub: AKSHAYKRISHNA012</span> | <span>LinkedIn: akshay-krishna-a-749151222</span>
              </p>
            </div>
          </div>

          <hr style={{ borderColor: 'var(--glass-border)', margin: '1.2rem 0' }} />

          {/* Profile */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              PROFILE
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Passionate technology enthusiast with strong analytical and leadership skills, driven by innovation and a deep interest in the latest technologies. Skilled in creative problem-solving and delivering effective, forward-thinking solutions. A proactive learner committed to excellence, equipped to lead teams toward impactful, high-quality results that push technological boundaries.
            </p>
          </div>

          {/* Internships */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              INTERNSHIPS & PROFESSIONAL EXPERIENCE
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                <span>Kompetenzen Technologies — Python Full Stack Development</span>
                <span style={{ color: 'var(--accent-indigo)' }}>May 2025 – Dec 2025</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.3rem', lineHeight: 1.6 }}>
                <li>Developed and maintained dynamic web applications using Python, Django/Flask, and modern JavaScript frameworks.</li>
                <li>Designed and integrated database models, APIs, and secure authentication mechanisms.</li>
                <li>Supported deployment and testing processes to deliver scalable, high-performance solutions.</li>
              </ul>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                <span>Trinity Software Technologies — Cloud Security & Smart Wipe</span>
                <span style={{ color: 'var(--accent-indigo)' }}>Aug 2024 – Mar 2025</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.3rem', lineHeight: 1.6 }}>
                <li>Developed a Smart Wipe scheme for cloud computing — an efficient, publicly verifiable data-deletion protocol ensuring secure erasure and compliance.</li>
                <li>Designed cryptographic proof mechanisms to enable auditors and stakeholders to verify data deletion without compromising confidentiality.</li>
              </ul>
            </div>
          </div>

          {/* Leadership & Campus Roles */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              LEADERSHIP & RESPONSIBILITY
            </h3>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
              <li><strong>IEDC InnovateX Mentor (Jan 2025 – Present):</strong> Guided student teams through ideation, prototyping, and pitching innovative solutions.</li>
              <li><strong>IEEE SB LMC Chair (Jan 2024 – Apr 2025):</strong> Spearheaded technical talks, coding workshops, and IEEE Xtreme competition training.</li>
              <li><strong>GDSC Lead, LMC (Oct 2024 – Apr 2025):</strong> Launched and led the first Google Developer Student Club chapter at LMCST.</li>
              <li><strong>Mu Learn Campus Lead, LMC (Aug 2023 – Apr 2025):</strong> Established peer-to-peer learning circles boosting student engagement.</li>
              <li><strong>IEEE Xtreme Kerala Section Co-Lead (May 2024 – Oct 2024):</strong> Mentored over 80 IEEE student branches across Kerala.</li>
            </ul>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              EDUCATION
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
              <span>B.Tech in Computer Science & Engineering — Lourdes Matha College of Science and Technology</span>
              <span style={{ color: 'var(--accent-indigo)' }}>2021 – 2025</span>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              KEY ACHIEVEMENTS & GRANTS
            </h3>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              <li>Represented Kerala in <strong>Viksit Bharat Young Leaders Dialogue 2025</strong> at Bharat Mandapam in presence of PM Narendra Modi.</li>
              <li>Winner of <strong>Infosys Global Hackathon 2025</strong> (Agri Guru AI project).</li>
              <li>Secured startup funding of <strong>₹60,000 from KSUM</strong> for travel assistant for visually impaired.</li>
              <li>Winner of <strong>IDEA FEST 2022</strong> conducted by Kerala Startup Mission (KSUM).</li>
              <li>Participant in <strong>NASA International Space Apps Challenge 2025</strong>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
