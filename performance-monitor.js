// Performance Monitoring & Optimization System
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.thresholds = {
            loadTime: 3000, // 3 seconds
            fcp: 1500,      // First Contentful Paint
            lcp: 2500,      // Largest Contentful Paint
            fid: 100,       // First Input Delay
            cls: 0.1        // Cumulative Layout Shift
        };
        this.init();
    }

    init() {
        this.measureLoadPerformance();
        this.measureRuntimePerformance();
        this.setupPerformanceObserver();
        this.monitorResourceLoading();
        this.trackUserExperience();
        this.optimizeImages();
        this.setupLazyLoading();
    }

    // Core Web Vitals and Load Performance
    measureLoadPerformance() {
        window.addEventListener('load', () => {
            // Basic timing metrics
            const navigation = performance.getEntriesByType('navigation')[0];
            
            this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
            this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
            this.metrics.firstByte = navigation.responseStart - navigation.fetchStart;
            this.metrics.domInteractive = navigation.domInteractive - navigation.fetchStart;
            
            // Check if Performance Observer is supported
            if ('PerformanceObserver' in window) {
                this.measureWebVitals();
            }
            
            this.analyzePerformance();
            this.logPerformanceMetrics();
        });
    }

    measureWebVitals() {
        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    this.metrics.fcp = entry.startTime;
                }
            }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.metrics.fid = entry.processingStart - entry.startTime;
            }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    this.metrics.cls = clsValue;
                }
            }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    measureRuntimePerformance() {
        // Monitor frame rate
        let frameCount = 0;
        let startTime = performance.now();
        
        const measureFPS = () => {
            frameCount++;
            if (frameCount === 60) {
                const endTime = performance.now();
                this.metrics.fps = Math.round(1000 * 60 / (endTime - startTime));
                frameCount = 0;
                startTime = endTime;
            }
            requestAnimationFrame(measureFPS);
        };
        requestAnimationFrame(measureFPS);

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memoryUsage = {
                    used: performance.memory.usedJSHeapSize,
                    total: performance.memory.totalJSHeapSize,
                    limit: performance.memory.jsHeapSizeLimit
                };
            }, 5000);
        }
    }

    setupPerformanceObserver() {
        if (!('PerformanceObserver' in window)) return;

        // Monitor resource loading
        const resourceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 1000) { // Slow resource
                    console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);
                }
            }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });

        // Monitor long tasks
        const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.warn(`Long task detected: ${entry.duration}ms`);
                this.logEvent('long_task', {
                    duration: entry.duration,
                    startTime: entry.startTime
                });
            }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
    }

    monitorResourceLoading() {
        // Track failed resources
        window.addEventListener('error', (e) => {
            if (e.target !== window) {
                console.error('Resource loading failed:', e.target.src || e.target.href);
                this.logEvent('resource_error', {
                    resource: e.target.src || e.target.href,
                    type: e.target.tagName
                });
            }
        }, true);

        // Monitor image loading
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => {
                this.logEvent('image_loaded', {
                    src: img.src,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                    displayWidth: img.width,
                    displayHeight: img.height
                });
            });

            img.addEventListener('error', () => {
                console.error('Image failed to load:', img.src);
                this.logEvent('image_error', { src: img.src });
            });
        });
    }

    trackUserExperience() {
        // Track scroll performance
        let scrollStart = null;
        let isScrolling = false;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                scrollStart = performance.now();
                isScrolling = true;
            }
            
            clearTimeout(window.scrollTimeout);
            window.scrollTimeout = setTimeout(() => {
                const scrollDuration = performance.now() - scrollStart;
                if (scrollDuration > 16) { // More than 1 frame at 60fps
                    this.logEvent('scroll_performance', {
                        duration: scrollDuration,
                        janky: scrollDuration > 32
                    });
                }
                isScrolling = false;
            }, 150);
        });

        // Track interaction responsiveness
        ['click', 'touchstart', 'keydown'].forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                const startTime = performance.now();
                
                requestAnimationFrame(() => {
                    const responseTime = performance.now() - startTime;
                    if (responseTime > 16) {
                        this.logEvent('slow_interaction', {
                            type: eventType,
                            responseTime,
                            element: e.target.tagName
                        });
                    }
                });
            });
        });
    }

    optimizeImages() {
        // Convert images to WebP if supported
        const supportsWebP = () => {
            const canvas = document.createElement('canvas');
            return canvas.toDataURL('image/webp').indexOf('webp') > -1;
        };

        if (supportsWebP()) {
            document.querySelectorAll('img').forEach(img => {
                const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/, '.webp');
                
                // Check if WebP version exists
                const testImg = new Image();
                testImg.onload = () => {
                    img.src = webpSrc;
                    this.logEvent('webp_optimization', { original: img.src, webp: webpSrc });
                };
                testImg.src = webpSrc;
            });
        }

        // Add loading="lazy" to images below the fold
        const images = document.querySelectorAll('img:not([loading])');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.getBoundingClientRect().top > window.innerHeight) {
                        img.loading = 'lazy';
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    setupLazyLoading() {
        // Enhanced lazy loading for images
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);

                        this.logEvent('lazy_load', { src: img.dataset.src });
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    analyzePerformance() {
        const recommendations = [];

        if (this.metrics.loadTime > this.thresholds.loadTime) {
            recommendations.push({
                type: 'warning',
                metric: 'Load Time',
                value: `${this.metrics.loadTime}ms`,
                recommendation: 'Consider optimizing images, minifying CSS/JS, or using a CDN'
            });
        }

        if (this.metrics.fcp > this.thresholds.fcp) {
            recommendations.push({
                type: 'warning',
                metric: 'First Contentful Paint',
                value: `${this.metrics.fcp}ms`,
                recommendation: 'Optimize critical rendering path and reduce render-blocking resources'
            });
        }

        if (this.metrics.lcp > this.thresholds.lcp) {
            recommendations.push({
                type: 'warning',
                metric: 'Largest Contentful Paint',
                value: `${this.metrics.lcp}ms`,
                recommendation: 'Optimize largest images and prioritize above-the-fold content'
            });
        }

        if (this.metrics.cls > this.thresholds.cls) {
            recommendations.push({
                type: 'error',
                metric: 'Cumulative Layout Shift',
                value: this.metrics.cls.toFixed(3),
                recommendation: 'Add dimensions to images and avoid inserting content above existing content'
            });
        }

        this.recommendations = recommendations;
        return recommendations;
    }

    logPerformanceMetrics() {
        const performanceData = {
            timestamp: new Date().toISOString(),
            metrics: this.metrics,
            recommendations: this.recommendations,
            userAgent: navigator.userAgent,
            connectionType: navigator.connection?.effectiveType || 'unknown',
            deviceMemory: navigator.deviceMemory || 'unknown'
        };

        // Log to analytics
        if (window.portfolioAnalytics) {
            window.portfolioAnalytics.logEvent('performance_metrics', performanceData);
        }

        // Store in localStorage for debugging
        localStorage.setItem('performance_data', JSON.stringify(performanceData));

        console.log('📊 Performance Metrics:', performanceData);
    }

    logEvent(eventType, data) {
        if (window.portfolioAnalytics) {
            window.portfolioAnalytics.logEvent(`performance_${eventType}`, data);
        }
    }

    // Performance dashboard
    showPerformanceDashboard() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10001] p-4';
        
        const recommendations = this.analyzePerformance();
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">⚡ Performance Dashboard</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <!-- Core Web Vitals -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-blue-800">Load Time</h3>
                        <p class="text-2xl font-bold ${this.metrics.loadTime > this.thresholds.loadTime ? 'text-red-600' : 'text-blue-600'}">
                            ${this.metrics.loadTime ? Math.round(this.metrics.loadTime) + 'ms' : 'N/A'}
                        </p>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-green-800">FCP</h3>
                        <p class="text-2xl font-bold ${this.metrics.fcp > this.thresholds.fcp ? 'text-red-600' : 'text-green-600'}">
                            ${this.metrics.fcp ? Math.round(this.metrics.fcp) + 'ms' : 'N/A'}
                        </p>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-purple-800">LCP</h3>
                        <p class="text-2xl font-bold ${this.metrics.lcp > this.thresholds.lcp ? 'text-red-600' : 'text-purple-600'}">
                            ${this.metrics.lcp ? Math.round(this.metrics.lcp) + 'ms' : 'N/A'}
                        </p>
                    </div>
                    <div class="bg-orange-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-orange-800">CLS</h3>
                        <p class="text-2xl font-bold ${this.metrics.cls > this.thresholds.cls ? 'text-red-600' : 'text-orange-600'}">
                            ${this.metrics.cls ? this.metrics.cls.toFixed(3) : 'N/A'}
                        </p>
                    </div>
                </div>

                <!-- Runtime Metrics -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-800">FPS</h3>
                        <p class="text-lg font-bold text-gray-600">${this.metrics.fps || 'N/A'}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-800">DOM Interactive</h3>
                        <p class="text-lg font-bold text-gray-600">
                            ${this.metrics.domInteractive ? Math.round(this.metrics.domInteractive) + 'ms' : 'N/A'}
                        </p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-gray-800">Memory Usage</h3>
                        <p class="text-lg font-bold text-gray-600">
                            ${this.metrics.memoryUsage ? 
                                Math.round(this.metrics.memoryUsage.used / 1048576) + 'MB' : 
                                'N/A'
                            }
                        </p>
                    </div>
                </div>

                <!-- Recommendations -->
                ${recommendations.length > 0 ? `
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-4">🚀 Performance Recommendations</h3>
                        <div class="space-y-3">
                            ${recommendations.map(rec => `
                                <div class="p-3 rounded-lg ${
                                    rec.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
                                }">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h4 class="font-semibold ${
                                                rec.type === 'error' ? 'text-red-800' : 'text-yellow-800'
                                            }">${rec.metric}: ${rec.value}</h4>
                                            <p class="text-sm ${
                                                rec.type === 'error' ? 'text-red-600' : 'text-yellow-600'
                                            }">${rec.recommendation}</p>
                                        </div>
                                        <i class="fas fa-exclamation-triangle ${
                                            rec.type === 'error' ? 'text-red-500' : 'text-yellow-500'
                                        }"></i>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : '<div class="text-center text-green-600 mb-6">🎉 All performance metrics look good!</div>'}

                <div class="text-center space-x-4">
                    <button onclick="window.performanceMonitor.runPerformanceTest()" 
                            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Run Performance Test
                    </button>
                    <button onclick="window.performanceMonitor.exportPerformanceData()" 
                            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Export Data
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    runPerformanceTest() {
        console.log('🔄 Running performance test...');
        
        // Simulate performance test
        const startTime = performance.now();
        
        // Test DOM manipulation performance
        for (let i = 0; i < 1000; i++) {
            const div = document.createElement('div');
            div.textContent = `Test ${i}`;
            document.body.appendChild(div);
            document.body.removeChild(div);
        }
        
        const endTime = performance.now();
        
        this.logEvent('performance_test', {
            dom_manipulation_time: endTime - startTime,
            timestamp: new Date().toISOString()
        });
        
        alert(`Performance test completed in ${Math.round(endTime - startTime)}ms`);
    }

    exportPerformanceData() {
        const data = {
            metrics: this.metrics,
            recommendations: this.recommendations,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize performance monitoring
window.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
    
    // Add performance dashboard trigger (Ctrl+Shift+P)
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'P') {
            window.performanceMonitor.showPerformanceDashboard();
        }
    });
});