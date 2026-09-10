import React from 'react';
import { Award, Trophy, Star, ShieldCheck, CheckCircle2, Bookmark, Globe } from 'lucide-react';

export default function Achievements() {
  const honors = [
    {
      title: 'Viksit Bharat Young Leaders Dialogue 2025',
      organization: 'Government of India • Bharat Mandapam, New Delhi',
      date: '2025',
      description: 'Represented Kerala state and presented ideas on "How to Become INDIA as Startup Capital of the World" at Bharat Mandapam in the presence of Hon\'ble Prime Minister Shri Narendra Modi.',
      icon: Globe,
      color: 'var(--accent-amber)'
    },
    {
      title: 'Kerala Startup Mission (KSUM) Startup Grant',
      organization: 'Kerala Startup Mission',
      date: '2023',
      description: 'Secured ₹60,000 prototype startup funding from KSUM for developing an innovative travel assistant solution for visually impaired individuals.',
      icon: Trophy,
      color: 'var(--accent-purple)'
    },
    {
      title: 'Infosys Global Hackathon Winner 2025',
      organization: 'Infosys Global',
      date: '2025',
      description: 'Developed "Agri Guru", an AI-powered intelligent advisory system delivering real-time crop recommendations and soil health diagnostics for farmers.',
      icon: Award,
      color: 'var(--accent-emerald)'
    },
    {
      title: 'Winner of IDEA FEST 2022',
      organization: 'Kerala Startup Mission (KSUM)',
      date: '2022',
      description: 'Selected as top startup proposal winner at IDEA FEST 2022 for innovative technological solution and market viability.',
      icon: Star,
      color: 'var(--accent-indigo)'
    },
    {
      title: 'NASA International Space Apps Challenge 2025',
      organization: 'NASA & Partner Space Agencies',
      date: '2025',
      description: 'Participated in the world\'s largest global space hackathon building space exploration data models.',
      icon: Globe,
      color: 'var(--accent-cyan)'
    },
    {
      title: 'ISRO World Space Week Project Selection',
      organization: 'Indian Space Research Organisation (ISRO)',
      date: '2022',
      description: 'Submitted research paper & design project "In Orbit: Space Station Design Challenge" for ISRO World Space Week 2022.',
      icon: Trophy,
      color: 'var(--accent-amber)'
    }
  ];

  const certificates = [
    {
      title: 'Cryptography I',
      issuer: 'Stanford University (Coursera)',
      instructor: 'Prof. Dan Boneh',
      date: 'June 2022'
    },
    {
      title: 'Networking Basics',
      issuer: 'Cisco Networking Academy',
      instructor: 'Cisco Certified',
      date: '2023'
    },
    {
      title: 'Data Management & Machine Learning',
      issuer: 'LT EduTech',
      instructor: 'L&T Technical Faculty',
      date: 'Nov 2022 – Jun 2023'
    },
    {
      title: 'Project Development Using Java for Beginners',
      issuer: 'L&T Technologies',
      instructor: 'Java & Web Development',
      date: '2022'
    }
  ];

  return (
    <section id="achievements">
      <div className="section-header">
        <span className="section-tag">Recognitions & Learning</span>
        <h2>Honors, Grants & <span className="text-gradient">Certifications</span></h2>
        <p>National dialogues, government startup funding, global hackathon victories, and verified academic credentials.</p>
      </div>

      {/* Honors Grid */}
      <div className="grid-2" style={{ marginBottom: '3.5rem' }}>
        {honors.map((h, idx) => {
          const Icon = h.icon;
          return (
            <div key={idx} className="glass-panel" style={{ padding: '1.75rem', position: 'relative' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={24} color={h.color} />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
                      {h.title}
                    </h3>
                    <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                      {h.date}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.6rem' }}>
                    {h.organization}
                  </p>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {h.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certifications Subsection */}
      <h3 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>
        Verified Certifications
      </h3>

      <div className="grid-2">
        {certificates.map((cert, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Bookmark size={24} color="var(--accent-indigo)" />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
                {cert.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {cert.issuer} • <span style={{ color: 'var(--text-muted)' }}>{cert.instructor}</span>
              </p>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
              {cert.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
