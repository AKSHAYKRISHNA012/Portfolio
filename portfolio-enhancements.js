// Additional Portfolio Enhancements
class PortfolioEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupVisitorCounter();
        this.setupSkillsProgressBars();
        this.setupScrollToTop();
        this.setupProjectFilters();
        this.setupTestimonialSlider();
        this.addSocialShareButtons();
    }

    // Enhanced theme toggle in navigation
    setupThemeToggle() {
        const themeToggle = document.getElementById('nav-theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        if (!themeToggle) return;

        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-mode');
            themeIcon.className = 'fas fa-sun';
        }

        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.classList.contains('light-mode');
            
            if (isLight) {
                document.documentElement.classList.remove('light-mode');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('portfolio-theme', 'dark');
                this.showThemeNotification('🌙 Dark mode activated');
            } else {
                document.documentElement.classList.add('light-mode');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('portfolio-theme', 'light');
                this.showThemeNotification('☀️ Light mode activated');
            }
        });
    }

    // Visitor counter with real-time updates
    setupVisitorCounter() {
        const counter = document.getElementById('visitor-counter');
        if (!counter) return;

        // Get or create visitor count
        let visitorCount = parseInt(localStorage.getItem('portfolio-visitor-count') || '0');
        let sessionCount = parseInt(localStorage.getItem('portfolio-session-count') || '0');
        
        // Increment on new session
        const currentSession = sessionStorage.getItem('current-session');
        if (!currentSession) {
            sessionCount++;
            visitorCount++;
            sessionStorage.setItem('current-session', Date.now().toString());
            localStorage.setItem('portfolio-visitor-count', visitorCount.toString());
            localStorage.setItem('portfolio-session-count', sessionCount.toString());
        }

        // Animate counter
        this.animateCounter(counter, visitorCount);
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    }

    // Enhanced skills with progress bars
    setupSkillsProgressBars() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        // Add progress bars to existing skills
        const skillItems = skillsSection.querySelectorAll('.skill-item, .bg-white');
        
        skillItems.forEach((item, index) => {
            const skillName = item.querySelector('h4, h3')?.textContent;
            if (skillName) {
                const progressBar = this.createProgressBar(skillName);
                item.appendChild(progressBar);
                
                // Animate on scroll
                setTimeout(() => {
                    const bar = item.querySelector('.progress-fill');
                    if (bar) bar.style.width = bar.dataset.progress + '%';
                }, index * 200);
            }
        });
    }

    createProgressBar(skillName) {
        const skillLevels = {
            'Python': 95,
            'JavaScript': 90,
            'React': 85,
            'Node.js': 88,
            'MongoDB': 82,
            'MySQL': 80,
            'Docker': 75,
            'Git': 90,
            'AWS': 70,
            'Machine Learning': 85,
            'Deep Learning': 80,
            'Flutter': 85,
            'Firebase': 88
        };

        const level = skillLevels[skillName] || 75;
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'mt-3';
        progressContainer.innerHTML = `
            <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>${skillName}</span>
                <span>${level}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="progress-fill bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                     data-progress="${level}" style="width: 0%"></div>
            </div>
        `;
        
        return progressContainer;
    }

    // Scroll to top button
    setupScrollToTop() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 opacity-0 pointer-events-none';
        scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up text-xl"></i>';
        scrollTopBtn.id = 'scroll-top-btn';
        
        document.body.appendChild(scrollTopBtn);
        
        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'all';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }
        });
        
        // Smooth scroll to top
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Project category filters
    setupProjectFilters() {
        const projectsSection = document.getElementById('projects');
        if (!projectsSection) return;

        const filterContainer = document.createElement('div');
        filterContainer.className = 'flex flex-wrap justify-center gap-4 mb-8';
        filterContainer.innerHTML = `
            <button class="filter-btn active px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300" data-filter="all">
                All Projects
            </button>
            <button class="filter-btn px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300" data-filter="ai-ml">
                AI/ML
            </button>
            <button class="filter-btn px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300" data-filter="web">
                Web Dev
            </button>
            <button class="filter-btn px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300" data-filter="mobile">
                Mobile
            </button>
            <button class="filter-btn px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300" data-filter="funded">
                Funded
            </button>
        `;

        const projectGrid = projectsSection.querySelector('.grid');
        if (projectGrid) {
            projectGrid.parentNode.insertBefore(filterContainer, projectGrid);
            
            // Add filter functionality
            const filterBtns = filterContainer.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Filter projects (implement based on your project structure)
                    this.filterProjects(btn.dataset.filter);
                });
            });
        }
    }

    filterProjects(filter) {
        const projects = document.querySelectorAll('#projects .glass-card');
        
        projects.forEach(project => {
            const projectTitle = project.querySelector('h3').textContent.toLowerCase();
            const projectContent = project.textContent.toLowerCase();
            
            let shouldShow = filter === 'all';
            
            if (filter === 'ai-ml') {
                shouldShow = projectContent.includes('ai') || projectContent.includes('ml') || 
                            projectContent.includes('machine learning') || projectContent.includes('deep learning');
            } else if (filter === 'web') {
                shouldShow = projectContent.includes('react') || projectContent.includes('node') || 
                            projectContent.includes('web');
            } else if (filter === 'mobile') {
                shouldShow = projectContent.includes('flutter') || projectContent.includes('mobile') || 
                            projectContent.includes('app');
            } else if (filter === 'funded') {
                shouldShow = projectContent.includes('funded') || projectContent.includes('winner');
            }
            
            if (shouldShow) {
                project.style.display = 'block';
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (project.style.opacity === '0') {
                        project.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    // Social share buttons
    addSocialShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'fixed left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4';
        shareContainer.innerHTML = `
            <div class="bg-white/10 backdrop-blur-sm rounded-full p-2 text-center">
                <p class="text-white text-xs mb-3 writing-mode-vertical">Share</p>
                <a href="https://linkedin.com/in/akshay-krishna-a-749151222" target="_blank" 
                   class="block w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform mb-2">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/AKSHAYKRISHNA012" target="_blank"
                   class="block w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform mb-2">
                    <i class="fab fa-github"></i>
                </a>
                <button onclick="navigator.share ? navigator.share({title: 'Akshay Krishna Portfolio', url: window.location.href}) : window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href))" 
                        class="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform mb-2">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(shareContainer);
    }

    // Theme notification
    showThemeNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-black/80 text-white px-4 py-2 rounded-lg z-50 transform translate-x-full opacity-0 transition-all duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Animate out
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Light mode styles
const lightModeStyles = `
<style id="light-mode-styles">
.light-mode {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --text-primary: #1a202c;
    --text-secondary: #4a5568;
}

.light-mode #home {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.light-mode .glass-card {
    background: rgba(255, 255, 255, 0.25) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
}

.light-mode .glass {
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;
}

.light-mode nav {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(15px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
}

.light-mode .mobile-menu {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(15px) !important;
}

.light-mode .mobile-menu a {
    color: #4a5568 !important;
}

.light-mode .mobile-menu a:hover {
    color: #2d3748 !important;
    background: rgba(0, 0, 0, 0.1) !important;
}
</style>
`;

// Initialize enhancements
window.addEventListener('DOMContentLoaded', () => {
    // Add light mode styles to head
    document.head.insertAdjacentHTML('beforeend', lightModeStyles);
    
    // Initialize portfolio enhancements
    window.portfolioEnhancements = new PortfolioEnhancements();
});