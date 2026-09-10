import React, { useState } from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  Eye, 
  ShieldCheck, 
  Sprout, 
  BrainCircuit, 
  Lock, 
  Smartphone,
  CheckCircle,
  Award
} from 'lucide-react';
import { Github } from './SocialIcons';

export default function Projects({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'ai', name: 'AI & LLMs' },
    { id: 'cloud', name: 'Cloud & Security' },
    { id: 'web', name: 'Web & Full Stack' },
    { id: 'mobile', name: 'Mobile Apps' }
  ];

  const projects = [
    {
      id: 'ai-pm-assistant',
      title: 'AI-Powered Project Management Assistant',
      event: 'Acsia Hackathon 2025',
      category: 'ai',
      badge: 'Hackathon Finalist',
      icon: BrainCircuit,
      iconColor: 'var(--accent-indigo)',
      summary: 'AI-driven management platform integrating Jira, GitHub & Teams to auto-generate dashboards and predict project risks.',
      description: 'Developed an enterprise AI tool for automotive software engineering teams. Integrates real-time feeds from Jira, GitHub, and MS Teams to auto-generate project dashboards, predict delay risks using PyTorch/LangChain models, and optimize team resource utilization.',
      tech: ['Python', 'FastAPI', 'PyTorch', 'LangChain', 'React.js', 'PostgreSQL', 'Neo4j', 'Docker', 'AWS'],
      metrics: ['Predicts Project Delays', 'Graph DB Dependency Analysis', 'Multi-Platform Integration'],
      demoUrl: '#',
      githubUrl: 'https://github.com/AKSHAYKRISHNA012'
    },
    {
      id: 'agri-guru',
      title: 'Agri Guru - AI Farmer Advisory System',
      event: 'Infosys Global Hackathon 2025 Winner',
      category: 'ai',
      badge: 'Infosys Winner 2025',
      icon: Sprout,
      iconColor: 'var(--accent-emerald)',
      summary: 'AI-powered intelligent agricultural advisory system delivering real-time crop recommendations & soil health insights.',
      description: 'Built during the Infosys Global Hackathon 2025. Powered by Google Gemini API and Node.js backend, Agri Guru delivers personalized crop recommendations, localized weather alerts, and automated soil health diagnostics for small-scale farmers.',
      tech: ['ReactJS', 'Node.js', 'Gemini API', 'Express', 'Tailwind CSS', 'OpenWeather API'],
      metrics: ['Infosys Global Winner', 'Real-time Weather & Soil AI', 'Multilingual Support'],
      demoUrl: '#',
      githubUrl: 'https://github.com/AKSHAYKRISHNA012'
    },
    {
      id: 'smart-wipe',
      title: 'Smart Wipe - Cloud Data Deletion System',
      event: 'Trinity Software Research',
      category: 'cloud',
      badge: 'Cloud Security Research',
      icon: Lock,
      iconColor: 'var(--accent-purple)',
      summary: 'Verifiable data-deletion protocol using Invertible Bloom Filters to detect malicious cloud provider retention.',
      description: 'Engineered a publicly verifiable data-deletion system for cloud storage environments using Invertible Bloom Filters (IBF). Allows data owners and auditors to mathematically verify permanent data erasure without exposing sensitive payloads.',
      tech: ['C#', '.NET Framework', 'SQL', 'Invertible Bloom Filters', 'Cryptography'],
      metrics: ['Zero-Knowledge Verification', 'Low Complexity Overhead', 'Publicly Verifiable'],
      demoUrl: '#',
      githubUrl: 'https://github.com/AKSHAYKRISHNA012'
    },
    {
      id: 'dorsal-vein',
      title: 'Dorsal Hand Vein Biometric Authentication',
      event: 'Computer Vision Research',
      category: 'ai',
      badge: 'Biometric ML',
      icon: ShieldCheck,
      iconColor: 'var(--accent-cyan)',
      summary: 'Contactless biometric authentication based on dorsal hand vein pattern analysis resistant to spoofing.',
      description: 'Developed a contactless biometric security pipeline using OpenCV and Machine Learning algorithms to extract vascular vein patterns from dorsal hand infrared scans. Provides spoof-resistant identification for high-security access control.',
      tech: ['Python', 'OpenCV', 'Scikit-Learn', 'NumPy', 'Machine Learning', 'Image Processing'],
      metrics: ['Contactless Biometrics', 'Spoof Resistant', '98.5% Matching Accuracy'],
      demoUrl: '#',
      githubUrl: 'https://github.com/AKSHAYKRISHNA012'
    },
    {
      id: 'fake-currency',
      title: 'Counterfeit Currency Detection System',
      event: 'Computer Vision Project',
      category: 'ai',
      badge: 'Computer Vision',
      icon: Eye,
      iconColor: 'var(--accent-amber)',
      summary: 'Computer vision & ML system detecting security features and anomalies in paper currency notes.',
      description: 'Built a computer vision system analyzing micro-printing, watermark, security thread alignment, and color texture features of currency notes to rapidly detect counterfeit notes and anomaly patterns.',
      tech: ['Python', 'OpenCV', 'Scikit-Learn', 'Matplotlib', 'Image Processing'],
      metrics: ['Micro-printing Inspection', 'Anomaly Score Analysis', 'Instant Verification'],
      demoUrl: '#',
      githubUrl: 'https://github.com/AKSHAYKRISHNA012'
    },
    {
      id: 'farm-direct',
      title: 'Farm Direct - Direct Farmer Marketplace',
      event: 'KSUM Grant Funded Project',
      category: 'mobile',
      badge: 'KSUM Funded',
      icon: Smartphone,
      iconColor: 'var(--accent-indigo)',
      summary: 'Mobile app enabling direct farmer-to-consumer sales with real-time inventory and fair price discovery.',
      description: 'Mobile marketplace application built with Flutter and Firebase. Eliminates middlemen by connecting local farmers directly with consumers, providing real-time stock inventory, order tracking, and transparent pricing. Supported by Kerala Startup Mission (KSUM) & CPCRI.',
      tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Google Maps API'],
      metrics: ['KSUM Supported', 'Real-time Order Tracking', 'Direct Farm Pricing'],
      demoUrl: '#',
      githubUrl: 'https://github.com/AKSHAYKRISHNA012'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-tag">Portfolio & Research</span>
        <h2>Featured <span className="text-gradient">Projects & Hackathons</span></h2>
        <p>A selection of AI platforms, cloud security solutions, and mobile applications I have designed and built.</p>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        marginBottom: '3rem'
      }}>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9rem',
              border: '1px solid',
              borderColor: activeFilter === f.id ? 'var(--accent-indigo)' : 'var(--glass-border)',
              background: activeFilter === f.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              color: activeFilter === f.id ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid-3">
        {filteredProjects.map((project) => {
          const Icon = project.icon;
          return (
            <div key={project.id} className="glass-panel" style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div>
                {/* Header Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={22} color={project.iconColor} />
                  </div>
                  <span className="badge badge-purple" style={{ fontSize: '0.75rem' }}>
                    {project.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem', color: '#fff' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.8rem' }}>
                  {project.event}
                </p>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {project.summary}
                </p>

                {/* Key Metrics Badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                      <CheckCircle size={14} color="var(--accent-emerald)" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Badges */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                  {project.tech.slice(0, 4).map((t, tIdx) => (
                    <span key={tIdx} style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-secondary)'
                    }}>
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                  <button 
                    onClick={() => onSelectProject(project)}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', justifyContent: 'center' }}
                  >
                    Inspect Details
                  </button>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 0.75rem' }}
                    title="View GitHub Repository"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
