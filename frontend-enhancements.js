// Advanced Frontend Enhancements & Interactive Elements
class FrontendEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupAdvancedAnimations();
        this.setupInteractiveElements();
        this.setupParticleEffects();
        this.setupSkillsInteractivity();
        this.setupTimelineEffects();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
        this.setupCursorEffects();
    }

    // Advanced scroll-triggered animations
    setupAdvancedAnimations() {
        // Enhanced intersection observer with stagger effects
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-slide-up');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe different types of elements
        document.querySelectorAll('.achievement-card, .project-card').forEach(card => {
            staggerObserver.observe(card);
        });

        // Parallax scrolling for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('#home');
            const heroContent = hero?.querySelector('.max-w-7xl');
            
            if (heroContent) {
                const rate = scrolled * 0.5;
                heroContent.style.transform = `translateY(${rate}px)`;
            }

            // Parallax for background patterns
            const patterns = document.querySelectorAll('.bg-pattern');
            patterns.forEach(pattern => {
                const rate = scrolled * 0.3;
                pattern.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Interactive card hover effects
    setupInteractiveElements() {
        // Enhanced project cards with tilt effect
        document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });

        // Interactive skill bars with click effects
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('click', () => {
                const progress = skill.querySelector('.bg-gradient-to-r');
                if (progress) {
                    progress.style.animation = 'pulse 0.5s ease-in-out';
                    setTimeout(() => {
                        progress.style.animation = '';
                    }, 500);
                }
            });
        });

        // Floating action buttons
        this.createFloatingElements();
    }

    // Particle effects for hero section
    setupParticleEffects() {
        const hero = document.querySelector('#home');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container absolute inset-0 pointer-events-none overflow-hidden';
        hero.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particleContainer);
        }

        // Animated background shapes
        this.createFloatingShapes(hero);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle absolute rounded-full opacity-20';
        
        const size = Math.random() * 6 + 4;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 20 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}px`;
        particle.style.background = `linear-gradient(45deg, #667eea, #764ba2)`;
        particle.style.animation = `float-up ${duration}s linear infinite`;
        
        container.appendChild(particle);

        // Remove and recreate particle when animation ends
        setTimeout(() => {
            particle.remove();
            this.createParticle(container);
        }, duration * 1000);
    }

    createFloatingShapes(container) {
        const shapes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 100 + 50;
            
            shape.className = `floating-shape absolute opacity-5 ${shapeType}`;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            shape.style.background = `linear-gradient(45deg, #667eea, #f093fb)`;
            shape.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite alternate`;
            
            if (shapeType === 'circle') {
                shape.style.borderRadius = '50%';
            } else if (shapeType === 'triangle') {
                shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }
            
            container.appendChild(shape);
        }
    }

    // Enhanced skills section with interactive elements
    setupSkillsInteractivity() {
        const skillBars = document.querySelectorAll('.skill-item');
        
        skillBars.forEach((item, index) => {
            const progressBar = item.querySelector('div[style*="width"]');
            if (!progressBar) return;

            // Add click to expand effect
            item.addEventListener('click', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'skill-tooltip absolute bg-black text-white p-2 rounded text-sm z-10';
                tooltip.textContent = this.getSkillDescription(item.textContent.trim());
                
                item.style.position = 'relative';
                item.appendChild(tooltip);
                
                setTimeout(() => tooltip.remove(), 3000);
            });

            // Animated skill level on hover
            item.addEventListener('mouseenter', () => {
                const currentWidth = progressBar.style.width;
                progressBar.style.width = '100%';
                progressBar.style.transition = 'width 0.3s ease';
                
                setTimeout(() => {
                    progressBar.style.width = currentWidth;
                }, 1000);
            });
        });
    }

    getSkillDescription(skillName) {
        const descriptions = {
            'HTML5': 'Semantic markup and modern web standards',
            'CSS3': 'Advanced styling with animations and layouts',
            'JavaScript': 'Dynamic interactivity and modern ES6+ features',
            'React.js': 'Component-based UI library for web applications',
            'Python': 'Backend development and data processing',
            'Java': 'Enterprise applications and Android development',
            'MySQL': 'Relational database design and optimization',
            'MongoDB': 'NoSQL database for scalable applications'
        };
        return descriptions[skillName] || 'Professional expertise in this technology';
    }

    // Timeline effect for journey section
    setupTimelineEffects() {
        const journeyItems = document.querySelectorAll('.group.relative.overflow-hidden.rounded-lg');
        
        journeyItems.forEach((item, index) => {
            // Add timeline connector
            if (index < journeyItems.length - 1) {
                const connector = document.createElement('div');
                connector.className = 'timeline-connector absolute w-0.5 h-8 bg-gradient-to-b from-primary to-secondary';
                connector.style.left = '50%';
                connector.style.bottom = '-16px';
                connector.style.transform = 'translateX(-50%)';
                item.style.position = 'relative';
                item.appendChild(connector);
            }

            // Add number badge
            const badge = document.createElement('div');
            badge.className = 'absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold z-10';
            badge.textContent = index + 1;
            item.appendChild(badge);
        });
    }

    // Advanced hover effects
    setupHoverEffects() {
        // Magnetic buttons
        document.querySelectorAll('.btn, button').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });

        // Glow effect on hover
        document.querySelectorAll('.achievement-card, .project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });
    }

    // Loading animations for sections
    setupLoadingAnimations() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const loader = document.createElement('div');
            loader.className = 'section-loader absolute inset-0 bg-white flex items-center justify-center z-10 opacity-0 pointer-events-none';
            loader.innerHTML = `
                <div class="flex space-x-2">
                    <div class="w-3 h-3 bg-primary rounded-full animate-bounce" style="animation-delay: 0s;"></div>
                    <div class="w-3 h-3 bg-secondary rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                    <div class="w-3 h-3 bg-accent rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                </div>
            `;
            
            section.style.position = 'relative';
            section.appendChild(loader);
        });
    }

    // Custom cursor effects
    setupCursorEffects() {
        // Create custom cursor
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor fixed w-4 h-4 bg-primary rounded-full pointer-events-none z-50 opacity-0 transition-all duration-200';
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot fixed w-1 h-1 bg-white rounded-full pointer-events-none z-50 opacity-0 transition-all duration-100';
        document.body.appendChild(cursorDot);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 8 + 'px';
            cursor.style.top = e.clientY - 8 + 'px';
            cursor.style.opacity = '1';

            cursorDot.style.left = e.clientX - 2 + 'px';
            cursorDot.style.top = e.clientY - 2 + 'px';
            cursorDot.style.opacity = '1';
        });

        // Hover effects for interactive elements
        document.querySelectorAll('a, button, .project-card, .achievement-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.opacity = '0.5';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.opacity = '1';
            });
        });
    }

    createFloatingElements() {
        // Floating social links
        const socialFloat = document.createElement('div');
        socialFloat.className = 'floating-social fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block';
        socialFloat.innerHTML = `
            <div class="space-y-4">
                <a href="https://github.com/AKSHAYKRISHNA012" target="_blank" 
                   class="block w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110">
                    <i class="fab fa-github text-lg"></i>
                </a>
                <a href="https://linkedin.com/in/akshay-krishna-a-749151222" target="_blank"
                   class="block w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110">
                    <i class="fab fa-linkedin text-lg"></i>
                </a>
                <a href="mailto:akshaykrishna.a.2002@gmail.com"
                   class="block w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110">
                    <i class="fas fa-envelope text-lg"></i>
                </a>
            </div>
        `;
        document.body.appendChild(socialFloat);

        // Scroll progress circle
        const progressCircle = document.createElement('div');
        progressCircle.className = 'scroll-progress-circle fixed bottom-4 left-4 w-12 h-12 hidden lg:flex items-center justify-center';
        progressCircle.innerHTML = `
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path class="text-gray-200" stroke="currentColor" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                <path class="text-primary progress-path" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xs font-bold text-primary">0%</span>
            </div>
        `;
        document.body.appendChild(progressCircle);

        // Update progress circle on scroll
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            const progressPath = progressCircle.querySelector('.progress-path');
            const progressText = progressCircle.querySelector('span');
            
            if (progressPath && progressText) {
                progressPath.style.strokeDasharray = `${scrollPercent}, 100`;
                progressText.textContent = `${scrollPercent}%`;
            }
        });
    }

    // Add dynamic theme switcher
    addThemeSwitcher() {
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher fixed top-4 right-20 z-50';
        themeSwitcher.innerHTML = `
            <button id="theme-toggle" class="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all">
                <i class="fas fa-moon text-gray-800"></i>
            </button>
        `;
        document.body.appendChild(themeSwitcher);

        const toggle = themeSwitcher.querySelector('#theme-toggle');
        const icon = toggle.querySelector('i');

        toggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            
            icon.className = isDark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-gray-800';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            icon.className = 'fas fa-sun text-yellow-400';
        }
    }

    // Interactive typing effect for hero
    addTypingEffect() {
        const heroSubtitle = document.querySelector('#home .text-xl.sm\\:text-2xl');
        if (!heroSubtitle) return;

        const texts = [
            'Python Full Stack Developer',
            'Technology Enthusiast',
            'AI/ML Specialist', 
            'Innovation Leader',
            'Problem Solver'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }

        // Start typing effect after 2 seconds
        setTimeout(typeEffect, 2000);
    }
}

// Add CSS animations and styles
const advancedStyles = `
<style>
@keyframes float-up {
    from {
        transform: translateY(100vh);
        opacity: 0;
    }
    to {
        transform: translateY(-100px);
        opacity: 1;
    }
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
}

@keyframes animate-slide-up {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-up {
    animation: animate-slide-up 0.8s ease-out forwards;
}

.floating-shape {
    animation: float 6s ease-in-out infinite;
}

.skill-tooltip {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.timeline-connector {
    animation: drawLine 1s ease-in-out;
}

@keyframes drawLine {
    from { height: 0; }
    to { height: 2rem; }
}

.custom-cursor {
    mix-blend-mode: difference;
}

.floating-social {
    animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInLeft {
    from {
        transform: translateX(-100px) translateY(-50%);
        opacity: 0;
    }
    to {
        transform: translateX(0) translateY(-50%);
        opacity: 1;
    }
}

.scroll-progress-circle {
    animation: slideInLeft 0.8s ease-out 0.5s both;
}

/* Dark mode styles */
.dark {
    color-scheme: dark;
}

.dark body {
    background: #0f172a;
    color: #e2e8f0;
}

.dark .bg-white {
    background: #1e293b !important;
}

.dark .bg-gray-50 {
    background: #0f172a !important;
}

.dark .text-gray-900 {
    color: #e2e8f0 !important;
}

.dark .text-gray-600 {
    color: #94a3b8 !important;
}

/* Responsive enhancements */
@media (max-width: 768px) {
    .floating-social {
        display: none;
    }
    
    .custom-cursor {
        display: none;
    }
    
    .particle-container {
        display: none;
    }
}

/* Enhanced button styles */
.btn {
    position: relative;
    overflow: hidden;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
}

.btn:hover::before {
    left: 100%;
}

/* Enhanced card animations */
.project-card, .achievement-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover, .achievement-card:hover {
    transform: translateY(-8px) scale(1.02);
}
</style>
`;

// Initialize advanced frontend enhancements
window.addEventListener('DOMContentLoaded', () => {
    // Add CSS styles
    document.head.insertAdjacentHTML('beforeend', advancedStyles);
    
    // Initialize enhancements
    window.frontendEnhancements = new FrontendEnhancements();
    
    // Add theme switcher
    setTimeout(() => {
        window.frontendEnhancements.addThemeSwitcher();
        window.frontendEnhancements.addTypingEffect();
    }, 1000);
});