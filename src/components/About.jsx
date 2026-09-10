import React from 'react';
import { GraduationCap, Award, Users, Lightbulb, CheckCircle2, Rocket } from 'lucide-react';

export default function About() {
  const leadershipHighlights = [
    {
      title: 'Google Developer Student Club (GDSC) Lead',
      period: 'Oct 2024 – Apr 2025',
      org: 'Lourdes Matha College of Science & Technology',
      desc: 'Launched and led the first GDSC chapter at LMCST, building a dynamic technology community of 200+ student developers.'
    },
    {
      title: 'IEEE SB Chairman',
      period: 'Jan 2024 – Apr 2025',
      org: 'IEEE Student Branch LMC',
      desc: 'Spearheaded technical talks, coding workshops, and IEEE Xtreme 24-Hour Competitive Programming training.'
    },
    {
      title: 'IEDC InnovateX Mentor & Finance Lead',
      period: 'Aug 2023 – Present',
      org: 'Innovation & Entrepreneurship Development Centre',
      desc: 'Mentored student startups through ideation & pitching while managing event budgets and investor networking.'
    },
    {
      title: 'Mu Learn Campus Lead',
      period: 'Aug 2023 – Apr 2025',
      org: 'Mu Learn LMC Chapter',
      desc: 'Established the first Mu Learn campus chapter, organizing peer-to-peer learning circles and study groups.'
    }
  ];

  const educationList = [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Lourdes Matha College of Science and Technology, Thiruvananthapuram',
      year: '2021 – 2025',
      score: 'First Class'
    },
    {
      degree: 'Higher Secondary Education (Class 12)',
      institution: 'St Thomas Higher Secondary School',
      year: '2019 – 2021',
      score: 'Science Stream'
    },
    {
      degree: 'Secondary School (Class 10)',
      institution: 'Lourdes Mount Public School',
      year: '2019',
      score: 'CBSE'
    }
  ];

  return (
    <section id="about">
      <div className="section-header">
        <span className="section-tag">About Me</span>
        <h2>Engineering Driven by <span className="text-gradient">Innovation & Leadership</span></h2>
        <p>Combining strong full-stack capabilities with community building and real-world problem solving.</p>
      </div>

      {/* Main Bio Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '2.5rem',
        marginBottom: '3.5rem'
      }} className="grid-2">
        {/* Story Card */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Rocket color="var(--accent-indigo)" />
            My Journey & Mission
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.2rem' }}>
            I am a passionate Computer Science & Engineering graduate from <strong>Lourdes Matha College of Science and Technology</strong> with a deep focus on building scalable web applications, machine learning systems, and biometric security solutions.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Beyond writing clean Python, Django, React, and FastAPI code, I believe in empowering tech communities. Having established multiple student tech chapters (GDSC Lead, IEEE Chair, Mu Learn Lead), I have mentored 80+ IEEE branches across Kerala and guided multiple hackathon-winning teams.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 color="var(--accent-emerald)" size={18} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>Python & FastAPI Expert</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 color="var(--accent-emerald)" size={18} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>Full-Stack React & Node</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 color="var(--accent-emerald)" size={18} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>AI, LLMs & Computer Vision</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 color="var(--accent-emerald)" size={18} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>Tech Community Leader</span>
            </div>
          </div>
        </div>

        {/* Education Timeline Card */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <GraduationCap color="var(--accent-purple)" />
            Education History
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {educationList.map((edu, index) => (
              <div key={index} style={{
                position: 'relative',
                paddingLeft: '1.5rem',
                borderLeft: '2px solid rgba(168, 85, 247, 0.3)'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '-7px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--accent-purple)'
                }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  {edu.year}
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0.2rem 0' }}>
                  {edu.degree}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership & Campus Roles Grid */}
      <h3 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>
        Community Leadership & Campus Roles
      </h3>

      <div className="grid-2">
        {leadershipHighlights.map((role, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {role.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-indigo)', fontWeight: 600 }}>
                  {role.org}
                </p>
              </div>
              <span className="badge badge-purple">{role.period}</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {role.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
