import React, { useState } from 'react';
import { Code, Terminal, Cpu, Database, ShieldCheck, Users, Sparkles } from 'lucide-react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: Sparkles },
    { id: 'languages', name: 'Languages', icon: Code },
    { id: 'web', name: 'Web & Mobile', icon: Terminal },
    { id: 'ai', name: 'AI & Data Science', icon: Cpu },
    { id: 'cloud', name: 'Cloud & Database', icon: Database },
    { id: 'testing', name: 'Testing & Tools', icon: ShieldCheck },
    { id: 'leadership', name: 'Leadership & Soft Skills', icon: Users },
  ];

  const skillsData = [
    // Languages
    { name: 'Python', category: 'languages', level: 95, icon: '🐍', tag: 'Expert' },
    { name: 'JavaScript', category: 'languages', level: 90, icon: '⚡', tag: 'Advanced' },
    { name: 'Java', category: 'languages', level: 85, icon: '☕', tag: 'Proficient' },
    { name: 'C++', category: 'languages', level: 82, icon: '⚙️', tag: 'Proficient' },
    { name: 'C#', category: 'languages', level: 80, icon: '🎯', tag: 'Intermediate' },
    { name: 'Dart', category: 'languages', level: 78, icon: '🎯', tag: 'Intermediate' },

    // Web & Mobile
    { name: 'React.js', category: 'web', level: 92, icon: '⚛️', tag: 'Expert' },
    { name: 'Django / Flask', category: 'web', level: 90, icon: '🐍', tag: 'Expert' },
    { name: 'Node.js', category: 'web', level: 88, icon: '🟢', tag: 'Advanced' },
    { name: 'FastAPI', category: 'web', level: 90, icon: '⚡', tag: 'Expert' },
    { name: 'ASP.NET Core', category: 'web', level: 80, icon: '🔷', tag: 'Intermediate' },
    { name: 'Spring Boot', category: 'web', level: 78, icon: '🍃', tag: 'Intermediate' },
    { name: 'Flutter & Firebase', category: 'web', level: 85, icon: '📱', tag: 'Advanced' },
    { name: 'HTML5 & CSS3', category: 'web', level: 95, icon: '🎨', tag: 'Expert' },

    // AI & Data Science
    { name: 'OpenCV / Computer Vision', category: 'ai', level: 92, icon: '👁️', tag: 'Expert' },
    { name: 'PyTorch', category: 'ai', level: 88, icon: '🔥', tag: 'Advanced' },
    { name: 'LangChain & Gemini API', category: 'ai', level: 90, icon: '🧠', tag: 'Expert' },
    { name: 'TensorFlow & Keras', category: 'ai', level: 85, icon: '🧠', tag: 'Advanced' },
    { name: 'Pandas & NumPy', category: 'ai', level: 92, icon: '📊', tag: 'Expert' },
    { name: 'Scikit-learn', category: 'ai', level: 88, icon: '📈', tag: 'Advanced' },

    // Cloud & DB
    { name: 'AWS (EC2, S3, Lambda, RDS)', category: 'cloud', level: 85, icon: '☁️', tag: 'Advanced' },
    { name: 'Docker & Kubernetes', category: 'cloud', level: 80, icon: '🐳', tag: 'Intermediate' },
    { name: 'PostgreSQL & MySQL', category: 'cloud', level: 88, icon: '🐘', tag: 'Advanced' },
    { name: 'MongoDB', category: 'cloud', level: 85, icon: '🍃', tag: 'Advanced' },
    { name: 'Neo4j (Graph DB)', category: 'cloud', level: 78, icon: '🕸️', tag: 'Intermediate' },
    { name: 'Git & GitHub', category: 'cloud', level: 95, icon: '🐙', tag: 'Expert' },

    // Testing
    { name: 'Selenium Automation', category: 'testing', level: 85, icon: '🧪', tag: 'Advanced' },
    { name: 'API Testing (Postman)', category: 'testing', level: 90, icon: '🚀', tag: 'Expert' },
    { name: 'Manual Software Testing', category: 'testing', level: 88, icon: '🔍', tag: 'Advanced' },
    { name: 'Figma UI/UX Wireframing', category: 'testing', level: 82, icon: '🎨', tag: 'Intermediate' },

    // Leadership
    { name: 'Community Leadership', category: 'leadership', level: 98, icon: '👑', tag: 'Core Strength' },
    { name: 'Technical Mentorship', category: 'leadership', level: 95, icon: '🎓', tag: 'Core Strength' },
    { name: 'Project Budgeting & Planning', category: 'leadership', level: 90, icon: '💼', tag: 'Experienced' },
    { name: 'Public Speaking & Pitching', category: 'leadership', level: 92, icon: '🎤', tag: 'Experienced' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills">
      <div className="section-header">
        <span className="section-tag">Technical Competencies</span>
        <h2>Skills & <span className="text-gradient">Technology Stack</span></h2>
        <p>A comprehensive breakdown of frameworks, languages, AI models, and tools I use to build scalable products.</p>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        marginBottom: '3rem'
      }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.9rem',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-indigo)' : 'var(--glass-border)',
                background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--accent-indigo)' : 'var(--text-secondary)'} />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid-3">
        {filteredSkills.map((skill, index) => (
          <div 
            key={index}
            className="glass-panel"
            style={{
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{skill.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {skill.name}
                </span>
              </div>
              <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                {skill.tag}
              </span>
            </div>

            {/* Progress Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                <span>Proficiency</span>
                <span>{skill.level}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  background: 'var(--gradient-primary)',
                  borderRadius: '3px',
                  transition: 'width 0.8s ease'
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
