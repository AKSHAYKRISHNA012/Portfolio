import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, Maximize2, Send, CornerDownLeft } from 'lucide-react';

export default function InteractiveTerminal({ isOpen, onClose, onOpenResume }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: '==================================================', type: 'system' },
    { text: '  AKSHAY KRISHNA A — Interactive Developer CLI v2.0', type: 'system' },
    { text: '  Powered by Antigravity Swarm Architecture', type: 'system' },
    { text: '==================================================', type: 'system' },
    { text: 'Type "help" or "skills" to get started.', type: 'info' }
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `$ ${input}`, type: 'user' }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: 'Available Commands:', type: 'system' },
          { text: '  about      - Display developer background & bio', type: 'output' },
          { text: '  skills     - List technical skills & frameworks', type: 'output' },
          { text: '  projects   - Show key projects & hackathon wins', type: 'output' },
          { text: '  experience - Display internships & leadership roles', type: 'output' },
          { text: '  contact    - Get direct email, phone & LinkedIn', type: 'output' },
          { text: '  resume     - Open official PDF resume viewer', type: 'output' },
          { text: '  sudo hire  - Trigger instant recruitment protocol', type: 'output' },
          { text: '  clear      - Clear terminal screen history', type: 'output' }
        );
        break;

      case 'about':
        newHistory.push(
          { text: 'AKSHAY KRISHNA A — Computer Science Engineer (2021-2025)', type: 'system' },
          { text: 'Location: Thiruvananthapuram, Kerala, India', type: 'output' },
          { text: 'Leadership: GDSC Lead, IEEE SB Chair, IEDC InnovateX Mentor', type: 'output' },
          { text: 'Focus: Python Full Stack, AI Applications, Biometrics & Cloud Security', type: 'output' }
        );
        break;

      case 'skills':
        newHistory.push(
          { text: 'Core Tech Stack:', type: 'system' },
          { text: '  [Languages]  Python, Java, C++, C#, JavaScript, Dart', type: 'output' },
          { text: '  [Web & App]  React.js, Node.js, FastAPI, Django, ASP.NET Core, Flutter', type: 'output' },
          { text: '  [AI / ML]    PyTorch, LangChain, TensorFlow, OpenCV, Gemini API', type: 'output' },
          { text: '  [Cloud & DB] AWS, Docker, Kubernetes, PostgreSQL, MongoDB, Neo4j', type: 'output' }
        );
        break;

      case 'projects':
        newHistory.push(
          { text: 'Key Projects:', type: 'system' },
          { text: '  1. AI Project Management Assistant (FastAPI, PyTorch, LangChain, Neo4j)', type: 'output' },
          { text: '  2. Agri Guru - AI Farmer Advisory (Infosys Hackathon Winner)', type: 'output' },
          { text: '  3. Smart Wipe Cloud Deletion (Invertible Bloom Filters, C#)', type: 'output' },
          { text: '  4. Dorsal Hand Vein Biometric Authentication (OpenCV, ML)', type: 'output' },
          { text: '  5. Farm Direct Marketplace (Flutter, Firebase - KSUM Funded)', type: 'output' }
        );
        break;

      case 'experience':
        newHistory.push(
          { text: 'Internships & Leadership:', type: 'system' },
          { text: '  - Kompetenzen Technologies: Python Full Stack Developer Intern', type: 'output' },
          { text: '  - Trinity Software Tech: Cloud Security & Data Deletion Intern', type: 'output' },
          { text: '  - GDSC Lead & IEEE SB Chair: Mentored 80+ IEEE student branches', type: 'output' }
        );
        break;

      case 'contact':
        newHistory.push(
          { text: 'Contact Information:', type: 'system' },
          { text: '  Email:    akshaykrishna.a.2002@gmail.com', type: 'output' },
          { text: '  Phone:    +91 9495339212', type: 'output' },
          { text: '  GitHub:   https://github.com/AKSHAYKRISHNA012', type: 'output' },
          { text: '  LinkedIn: https://linkedin.com/in/akshay-krishna-a-749151222', type: 'output' }
        );
        break;

      case 'resume':
        newHistory.push({ text: 'Opening official resume modal...', type: 'system' });
        onOpenResume();
        break;

      case 'sudo hire':
        newHistory.push(
          { text: '🎉 SUCCESS: RECRUITMENT PROTOCOL ENGAGED!', type: 'system' },
          { text: '  Akshay Krishna A is ready to deliver top-tier engineering impact.', type: 'output' },
          { text: '  Sending direct signal to akshaykrishna.a.2002@gmail.com...', type: 'info' }
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        newHistory.push({ text: `Command not recognized: "${cmd}". Type "help" for available commands.`, type: 'error' });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '750px',
        height: '500px',
        background: '#0d1117',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        borderRadius: '12px',
        boxShadow: '0 0 40px rgba(99, 102, 241, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)'
      }}>
        {/* Terminal Header */}
        <div style={{
          background: '#161b22',
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block', cursor: 'pointer' }} onClick={onClose} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '0.5rem', fontWeight: 600 }}>
              akshay@antigravity-cli:~
            </span>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Terminal Content Body */}
        <div style={{
          flex: 1,
          padding: '1.25rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          fontSize: '0.9rem',
          color: '#c9d1d9'
        }}>
          {history.map((item, idx) => (
            <div key={idx} style={{
              color: item.type === 'user' 
                ? '#58a6ff' 
                : item.type === 'system' 
                ? '#7ee787' 
                : item.type === 'error' 
                ? '#f85149' 
                : item.type === 'info' 
                ? '#d2a8ff' 
                : '#c9d1d9',
              whiteSpace: 'pre-wrap'
            }}>
              {item.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleCommand} style={{
          background: '#161b22',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <span style={{ color: '#58a6ff', fontWeight: 700 }}>$</span>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command ('help', 'projects', 'skills')..."
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}
          />
          <button type="submit" style={{ background: 'transparent', border: 'none', color: '#58a6ff', cursor: 'pointer' }}>
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
