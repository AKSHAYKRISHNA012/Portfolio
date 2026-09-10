import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'Kompetenzen Technologies',
      role: 'Python Full Stack Developer Intern',
      period: 'May 2025 – Dec 2025',
      location: 'Thiruvananthapuram, Kerala',
      type: 'Internship',
      points: [
        'Developed and maintained dynamic full-stack web applications using Python, Django, Flask, and modern JavaScript frameworks.',
        'Designed and integrated scalable database models, RESTful APIs, and secure authentication mechanisms (JWT & OAuth2).',
        'Supported deployment, testing, and continuous integration workflows to deliver high-performance cloud web solutions.'
      ],
      skills: ['Python', 'Django', 'Flask', 'JavaScript', 'REST APIs', 'PostgreSQL']
    },
    {
      company: 'Trinity Software Technologies',
      role: 'Cloud Security & Software Engineering Intern',
      period: 'Aug 2024 – Mar 2025',
      location: 'Trivandrum, Kerala',
      type: 'Internship',
      points: [
        'Developed "Smart Wipe" scheme for cloud computing — an efficient, publicly verifiable data-deletion protocol ensuring compliance.',
        'Designed cryptographic proof mechanisms enabling auditors & stakeholders to verify data deletion without exposing private payloads.',
        'Gained hands-on experience in secure cloud storage architecture, data privacy compliance, and performance optimization.'
      ],
      skills: ['Cloud Computing', 'Cryptography', 'Invertible Bloom Filters', 'Data Deletion', 'C#', '.NET']
    },
    {
      company: 'IEEE Kerala Section',
      role: 'IEEE Xtreme Kerala Section Co-Lead',
      period: 'May 2024 – Oct 2024',
      location: 'Kerala, India',
      type: 'Section Leadership',
      points: [
        'Mentored and guided over 80 IEEE student branches across the Kerala Section for competitive programming.',
        'Coordinated training sessions for IEEE Xtreme 24-Hour International Programming Competition, elevating regional participant performance.'
      ],
      skills: ['Competitive Programming', 'Mentorship', 'Leadership', 'Event Management']
    }
  ];

  return (
    <section id="experience">
      <div className="section-header">
        <span className="section-tag">Work & Leadership</span>
        <h2>Professional <span className="text-gradient">Experience & Internships</span></h2>
        <p>Real-world engineering internships, cloud security research, and state-wide technical leadership roles.</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {experiences.map((exp, index) => (
          <div key={index} className="glass-panel" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.2rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                  <Briefcase size={20} color="var(--accent-indigo)" />
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff' }}>
                    {exp.role}
                  </h3>
                </div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                  {exp.company}
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                <span className="badge badge-emerald">
                  <Calendar size={12} /> {exp.period}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={12} /> {exp.location}
                </span>
              </div>
            </div>

            {/* Key Accomplishments List */}
            <ul style={{
              paddingLeft: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontSize: '0.95rem'
            }}>
              {exp.points.map((pt, pIdx) => (
                <li key={pIdx} style={{ marginBottom: '0.6rem' }}>
                  {pt}
                </li>
              ))}
            </ul>

            {/* Skill Tags */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {exp.skills.map((s, sIdx) => (
                <span key={sIdx} style={{
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)'
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
