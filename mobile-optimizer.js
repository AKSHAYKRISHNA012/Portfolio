// Mobile Performance Optimization & Progressive Enhancement
class MobileOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.addLazyLoading();
        this.optimizeAnimations();
        this.addOfflineSupport();
        this.optimizeTouch();
        this.addInstallPrompt();
    }

    // Optimize images for different screen sizes
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add responsive behavior
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            
            // Add error handling
            img.addEventListener('error', () => {
                img.style.display = 'none';
                const placeholder = img.nextElementSibling;
                if (placeholder && placeholder.classList.contains('placeholder')) {
                    placeholder.style.display = 'flex';
                }
            });
        });
    }

    // Add lazy loading for heavy content
    addLazyLoading() {
        const lazyElements = document.querySelectorAll('.lazy-load');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        lazyElements.forEach(el => observer.observe(el));
    }

    // Optimize animations for mobile
    optimizeAnimations() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const animatedElements = document.querySelectorAll('[class*="animate"]');
            
            if (document.hidden) {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    }

    // Add basic offline support
    addOfflineSupport() {
        if ('serviceWorker' in navigator) {
            const swCode = `
                const CACHE_NAME = 'portfolio-v1';
                const urlsToCache = [
                    '/',
                    '/index.html',
                    '/script.js',
                    '/analytics.js',
                    '/enhanced-contact.js',
                    '/portfolio-enhancements.js'
                ];

                self.addEventListener('install', event => {
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then(cache => cache.addAll(urlsToCache))
                    );
                });

                self.addEventListener('fetch', event => {
                    event.respondWith(
                        caches.match(event.request)
                            .then(response => {
                                return response || fetch(event.request);
                            }
                        )
                    );
                });
            `;

            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swUrl = URL.createObjectURL(blob);

            navigator.serviceWorker.register(swUrl)
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });

            // Show offline indicator
            window.addEventListener('online', () => {
                this.showConnectivityStatus('🟢 Back online', 'success');
            });

            window.addEventListener('offline', () => {
                this.showConnectivityStatus('🔴 Offline mode', 'warning');
            });
        }
    }

    // Optimize touch interactions
    optimizeTouch() {
        // Add touch feedback to interactive elements
        const touchElements = document.querySelectorAll('button, a, [onclick]');
        
        touchElements.forEach(el => {
            el.addEventListener('touchstart', () => {
                el.style.transform = 'scale(0.95)';
                el.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            el.addEventListener('touchend', () => {
                el.style.transform = 'scale(1)';
            }, { passive: true });
        });

        // Add haptic feedback if available
        const hapticElements = document.querySelectorAll('button[type="submit"], .nav-link');
        
        hapticElements.forEach(el => {
            el.addEventListener('click', () => {
                if ('vibrate' in navigator) {
                    navigator.vibrate(10); // 10ms vibration
                }
            });
        });
    }

    // Add PWA install prompt
    addInstallPrompt() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;

            // Show install button
            const installBtn = document.createElement('button');
            installBtn.className = 'fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-50';
            installBtn.innerHTML = '<i class="fas fa-download mr-2"></i>Install App';
            installBtn.style.display = 'none';

            // Show after 30 seconds
            setTimeout(() => {
                installBtn.style.display = 'block';
            }, 30000);

            installBtn.addEventListener('click', async () => {
                installBtn.style.display = 'none';
                deferredPrompt.prompt();
                
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response: ${outcome}`);
                deferredPrompt = null;
            });

            document.body.appendChild(installBtn);
        });
    }

    // Connectivity status notification
    showConnectivityStatus(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white z-50 transition-all duration-300 ${
            type === 'success' ? 'bg-green-600' : 'bg-orange-600'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Web App Manifest
const manifest = {
    "name": "Akshay Krishna Portfolio",
    "short_name": "AK Portfolio",
    "description": "Python Full Stack Developer & Technology Enthusiast",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#667eea",
    "theme_color": "#764ba2",
    "icons": [
        {
            "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23667eea'/%3E%3Ctext x='50' y='55' font-family='Arial' font-size='24' font-weight='bold' text-anchor='middle' fill='white'%3EAK%3C/text%3E%3C/svg%3E",
            "sizes": "192x192",
            "type": "image/svg+xml"
        }
    ]
};

// Add manifest to page
const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
const manifestURL = URL.createObjectURL(manifestBlob);
const manifestLink = document.createElement('link');
manifestLink.rel = 'manifest';
manifestLink.href = manifestURL;
document.head.appendChild(manifestLink);

// Initialize mobile optimizer
window.addEventListener('DOMContentLoaded', () => {
    window.mobileOptimizer = new MobileOptimizer();
});