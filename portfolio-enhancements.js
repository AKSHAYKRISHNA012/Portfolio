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
        this.setupMediumIntegration();
        this.setupLinkedInIntegration();
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
        const counterElement = document.getElementById('visitor-counter');
        if (!counterElement) return;

        // Get or create visitor data
        let visitorData = JSON.parse(localStorage.getItem('portfolio-visitor-data')) || {
            totalVisits: 0,
            uniqueVisitors: 0,
            lastVisit: null,
            sessionVisits: 0,
            visitorId: this.generateVisitorId()
        };

        // Check if this is a new session (more than 30 minutes since last visit)
        const now = new Date().getTime();
        const thirtyMinutes = 30 * 60 * 1000;
        const isNewSession = !visitorData.lastVisit || (now - new Date(visitorData.lastVisit).getTime()) > thirtyMinutes;

        if (isNewSession) {
            visitorData.uniqueVisitors++;
            visitorData.sessionVisits = 1;
        } else {
            visitorData.sessionVisits++;
        }

        visitorData.totalVisits++;
        visitorData.lastVisit = new Date().toISOString();

        // Save updated data
        localStorage.setItem('portfolio-visitor-data', JSON.stringify(visitorData));

        // Animate counter
        this.animateCounter(counterElement, visitorData.uniqueVisitors);

        // Update other counters if they exist
        const totalVisitsElement = document.getElementById('total-visits');
        const sessionVisitsElement = document.getElementById('session-visits');
        
        if (totalVisitsElement) this.animateCounter(totalVisitsElement, visitorData.totalVisits);
        if (sessionVisitsElement) this.animateCounter(sessionVisitsElement, visitorData.sessionVisits);
    }

    generateVisitorId() {
        return 'visitor_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    animateCounter(element, targetValue) {
        let currentValue = 0;
        const increment = targetValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue).toLocaleString();
        }, 30);
    }

    // Skills progress bars with intersection observer
    setupSkillsProgressBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        if (skillBars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const progressBar = entry.target;
                    const percentage = progressBar.getAttribute('data-percentage') || '0';
                    
                    progressBar.style.width = percentage + '%';
                    progressBar.classList.add('animated');
                    
                    // Add number animation
                    const numberElement = progressBar.parentElement.querySelector('.skill-percentage');
                    if (numberElement) {
                        this.animateNumber(numberElement, parseInt(percentage));
                    }
                }
            });
        }, { threshold: 0.3 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    animateNumber(element, targetNumber) {
        let currentNumber = 0;
        const increment = targetNumber / 30;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentNumber) + '%';
        }, 50);
    }

    // Scroll to top button
    setupScrollToTop() {
        // Create scroll to top button
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 opacity-0 pointer-events-none';
        scrollTopBtn.id = 'scroll-to-top';
        
        document.body.appendChild(scrollTopBtn);

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }
        });

        // Scroll to top functionality
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Project filtering
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterButtons.length === 0 || projectCards.length === 0) return;

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white'));
                btn.classList.add('active', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
                
                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category')?.split(' ') || [];
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    } else {
                        card.style.transform = 'scale(0.8)';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Testimonial slider
    setupTestimonialSlider() {
        const slider = document.querySelector('.testimonial-slider');
        const testimonials = document.querySelectorAll('.testimonial-item');
        
        if (!slider || testimonials.length === 0) return;

        let currentIndex = 0;
        const totalTestimonials = testimonials.length;

        // Auto-slide functionality
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            this.updateSlider(testimonials, currentIndex);
        }, 5000);
    }

    updateSlider(testimonials, index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    // Social share buttons
    addSocialShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.className = 'fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-40';
        shareContainer.innerHTML = `
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this amazing portfolio!" 
               target="_blank" 
               class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transform hover:scale-110 transition-all duration-300 shadow-lg">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" 
               target="_blank" 
               class="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transform hover:scale-110 transition-all duration-300 shadow-lg">
                <i class="fab fa-facebook"></i>
            </a>
            <a href="https://linkedin.com/in/akshay-krishna-a-749151222" target="_blank" 
               class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
                <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Akshay200212" target="_blank" 
               class="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transform hover:scale-110 transition-all duration-300 shadow-lg">
                <i class="fab fa-github"></i>
            </a>
        `;
        
        document.body.appendChild(shareContainer);
        
        // Hide on mobile
        if (window.innerWidth <= 768) {
            shareContainer.style.display = 'none';
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                shareContainer.style.display = 'none';
            } else {
                shareContainer.style.display = 'flex';
            }
        });
    }

    // Medium blog integration
    setupMediumIntegration() {
        // Track blog clicks for analytics
        const blogLinks = document.querySelectorAll('a[href*="medium.com"]');
        
        blogLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Track Medium blog clicks
                if (window.portfolioAnalytics) {
                    window.portfolioAnalytics.logEvent('medium_blog_click', {
                        article_title: link.closest('article')?.querySelector('h3')?.textContent || 'Medium Profile',
                        timestamp: new Date().toISOString(),
                        session_id: window.portfolioAnalytics.sessionId
                    });
                }
                
                // Add visual feedback
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Add read time estimation for blog articles
        const blogArticles = document.querySelectorAll('#blog article');
        blogArticles.forEach(article => {
            const content = article.querySelector('p')?.textContent || '';
            const wordCount = content.split(' ').length;
            const readTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute
            
            const readTimeElement = article.querySelector('.text-gray-500 span:last-child');
            if (readTimeElement && !readTimeElement.textContent.includes('min read')) {
                readTimeElement.textContent = `${readTime} min read`;
            }
        });

        // Add hover effects for blog cards
        blogArticles.forEach(article => {
            article.addEventListener('mouseenter', () => {
                article.style.transform = 'translateY(-8px) scale(1.02)';
                article.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            article.addEventListener('mouseleave', () => {
                article.style.transform = 'translateY(0) scale(1)';
                article.style.boxShadow = '';
            });
        });
    }

    // LinkedIn Integration and Analytics
    setupLinkedInIntegration() {
        // Track LinkedIn link clicks
        const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
        
        linkedinLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Track LinkedIn clicks for analytics
                if (window.portfolioAnalytics) {
                    window.portfolioAnalytics.logEvent('linkedin_click', {
                        link_type: link.closest('#linkedin') ? 'linkedin_section' : 'general',
                        link_text: link.textContent.trim(),
                        timestamp: new Date().toISOString(),
                        session_id: window.portfolioAnalytics.sessionId
                    });
                }
                
                // Add visual feedback
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
                
                // Show connection notification
                this.showLinkedInNotification();
            });
        });

        // Track LinkedIn section visibility
        const linkedinSection = document.querySelector('#linkedin');
        if (linkedinSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (window.portfolioAnalytics) {
                            window.portfolioAnalytics.logEvent('linkedin_section_view', {
                                timestamp: new Date().toISOString(),
                                session_id: window.portfolioAnalytics.sessionId
                            });
                        }
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(linkedinSection);
        }

        // Add hover effects for LinkedIn cards
        const linkedinCards = document.querySelectorAll('#linkedin .glass-card');
        linkedinCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });

        // Animate LinkedIn stats
        this.animateLinkedInStats();
    }

    // Animate LinkedIn statistics
    animateLinkedInStats() {
        const statElements = document.querySelectorAll('#linkedin .text-2xl');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const element = entry.target;
                    const targetText = element.textContent;
                    const targetNumber = parseInt(targetText.replace(/\D/g, ''));
                    
                    if (targetNumber > 0) {
                        let currentNumber = 0;
                        const increment = targetNumber / 50;
                        const timer = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= targetNumber) {
                                currentNumber = targetNumber;
                                clearInterval(timer);
                            }
                            
                            const formattedNumber = targetText.includes('K') 
                                ? `${(currentNumber / 1000).toFixed(1)}K`
                                : `${Math.floor(currentNumber)}+`;
                            
                            element.textContent = formattedNumber;
                        }, 30);
                        
                        element.classList.add('animated');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        statElements.forEach(element => observer.observe(element));
    }

    // LinkedIn connection notification
    showLinkedInNotification() {
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg z-50 transform translate-x-full opacity-0 transition-all duration-500 shadow-lg';
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fab fa-linkedin mr-2"></i>
                <span>Opening LinkedIn profile...</span>
            </div>
        `;
        
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
        }, 3000);
    }

    // Theme notification
    showThemeNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-black/80 text-white px-4 py-2 rounded-lg z-50 transform translate-x-full opacity-0 transition-all duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// Light mode styles
const lightModeStyles = `
<style>
.light-mode {
    --bg-primary: #f7fafc;
    --bg-secondary: #ffffff;
    --text-primary: #2d3748;
    --text-secondary: #4a5568;
}

.light-mode body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #2d3748;
}

.light-mode .glass,
.light-mode .glass-card {
    background: rgba(255, 255, 255, 0.25) !important;
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
    color: #2d3748 !important;
}

.light-mode h1,
.light-mode h2,
.light-mode h3,
.light-mode h4,
.light-mode h5,
.light-mode h6 {
    color: #2d3748 !important;
}

.light-mode p,
.light-mode span:not(.gradient-text) {
    color: #4a5568 !important;
}

.light-mode .navbar {
    background: rgba(255, 255, 255, 0.1) !important;
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