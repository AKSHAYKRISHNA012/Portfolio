// Portfolio Analytics System
class PortfolioAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.interactions = [];
        this.pageViews = {};
        this.init();
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    init() {
        this.trackPageLoad();
        this.trackScrollDepth();
        this.trackSectionViews();
        this.trackClicks();
        this.trackFormInteractions();
        this.trackTimeSpent();
        this.detectDeviceInfo();
    }

    // Track page load performance
    trackPageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.logEvent('page_load', {
                load_time: loadTime,
                url: window.location.href,
                referrer: document.referrer,
                timestamp: new Date().toISOString(),
                session_id: this.sessionId
            });
        });
    }

    // Track scroll depth and engagement
    trackScrollDepth() {
        let maxScroll = 0;
        let scrollMilestones = [25, 50, 75, 100];
        let triggeredMilestones = [];

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
            }

            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !triggeredMilestones.includes(milestone)) {
                    triggeredMilestones.push(milestone);
                    this.logEvent('scroll_depth', {
                        percentage: milestone,
                        timestamp: new Date().toISOString(),
                        session_id: this.sessionId
                    });
                }
            });
        });
    }

    // Track which sections users view
    trackSectionViews() {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (!this.pageViews[sectionId]) {
                        this.pageViews[sectionId] = {
                            first_view: new Date().toISOString(),
                            view_count: 0,
                            time_spent: 0,
                            entry_time: Date.now()
                        };
                    }
                    this.pageViews[sectionId].view_count++;
                    this.pageViews[sectionId].entry_time = Date.now();

                    this.logEvent('section_view', {
                        section: sectionId,
                        timestamp: new Date().toISOString(),
                        session_id: this.sessionId
                    });
                } else {
                    // Track time spent in section
                    const sectionId = entry.target.id;
                    if (this.pageViews[sectionId] && this.pageViews[sectionId].entry_time) {
                        const timeSpent = Date.now() - this.pageViews[sectionId].entry_time;
                        this.pageViews[sectionId].time_spent += timeSpent;
                    }
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    // Track user clicks and interactions
    trackClicks() {
        document.addEventListener('click', (event) => {
            const element = event.target;
            const tagName = element.tagName.toLowerCase();
            const className = element.className;
            const id = element.id;
            const href = element.href;

            // Track specific elements
            if (tagName === 'a' || element.closest('a')) {
                const link = element.closest('a') || element;
                this.logEvent('link_click', {
                    href: link.href,
                    text: link.textContent.trim(),
                    section: this.getCurrentSection(),
                    timestamp: new Date().toISOString(),
                    session_id: this.sessionId
                });
            }

            if (tagName === 'button' || className.includes('btn')) {
                this.logEvent('button_click', {
                    button_text: element.textContent.trim(),
                    button_id: id,
                    button_class: className,
                    section: this.getCurrentSection(),
                    timestamp: new Date().toISOString(),
                    session_id: this.sessionId
                });
            }

            // Track project card clicks
            if (element.closest('.project-card') || element.closest('.achievement-card')) {
                const card = element.closest('.project-card') || element.closest('.achievement-card');
                const cardTitle = card.querySelector('h3')?.textContent || 'Unknown';
                this.logEvent('card_interaction', {
                    card_type: element.closest('.project-card') ? 'project' : 'achievement',
                    card_title: cardTitle,
                    timestamp: new Date().toISOString(),
                    session_id: this.sessionId
                });
            }
        });
    }

    // Track form interactions
    trackFormInteractions() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            // Track form start
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                let hasStarted = false;
                input.addEventListener('focus', () => {
                    if (!hasStarted) {
                        hasStarted = true;
                        this.logEvent('form_start', {
                            form_id: 'contact-form',
                            first_field: input.name,
                            timestamp: new Date().toISOString(),
                            session_id: this.sessionId
                        });
                    }
                });

                input.addEventListener('blur', () => {
                    if (input.value.trim()) {
                        this.logEvent('field_complete', {
                            field_name: input.name,
                            field_length: input.value.length,
                            timestamp: new Date().toISOString(),
                            session_id: this.sessionId
                        });
                    }
                });
            });

            // Track form submission
            contactForm.addEventListener('submit', () => {
                this.logEvent('form_submit', {
                    form_id: 'contact-form',
                    timestamp: new Date().toISOString(),
                    session_id: this.sessionId
                });
            });
        }
    }

    // Track total time spent on site
    trackTimeSpent() {
        window.addEventListener('beforeunload', () => {
            const totalTime = Date.now() - this.startTime;
            this.logEvent('session_end', {
                total_time: totalTime,
                sections_viewed: Object.keys(this.pageViews),
                max_scroll: this.maxScroll || 0,
                interactions: this.interactions.length,
                timestamp: new Date().toISOString(),
                session_id: this.sessionId
            });
        });

        // Also track every 30 seconds for active sessions
        setInterval(() => {
            if (document.hasFocus()) {
                this.logEvent('heartbeat', {
                    time_elapsed: Date.now() - this.startTime,
                    current_section: this.getCurrentSection(),
                    timestamp: new Date().toISOString(),
                    session_id: this.sessionId
                });
            }
        }, 30000);
    }

    // Detect device and browser info
    detectDeviceInfo() {
        const deviceInfo = {
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`,
            color_depth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            platform: navigator.platform,
            cookie_enabled: navigator.cookieEnabled,
            online: navigator.onLine,
            connection_type: navigator.connection?.effectiveType || 'unknown',
            device_memory: navigator.deviceMemory || 'unknown'
        };

        this.logEvent('device_info', {
            ...deviceInfo,
            timestamp: new Date().toISOString(),
            session_id: this.sessionId
        });
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        for (let section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                return section.id;
            }
        }
        return 'unknown';
    }

    // Log events (in a real app, this would send to a backend)
    logEvent(eventType, data) {
        const event = {
            event_type: eventType,
            ...data,
            url: window.location.href,
            user_id: this.getUserId()
        };

        // Store in localStorage for demo purposes
        const events = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
        events.push(event);
        
        // Keep only last 1000 events
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('portfolio_analytics', JSON.stringify(events));

        // In production, you would send this to your analytics backend
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(event)
        // });

        console.log('📊 Analytics Event:', eventType, data);
    }

    getUserId() {
        let userId = localStorage.getItem('portfolio_user_id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('portfolio_user_id', userId);
        }
        return userId;
    }

    // Get analytics summary
    getAnalyticsSummary() {
        const events = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
        const summary = {
            total_events: events.length,
            sessions: [...new Set(events.map(e => e.session_id))].length,
            page_loads: events.filter(e => e.event_type === 'page_load').length,
            form_submissions: events.filter(e => e.event_type === 'form_submit').length,
            most_viewed_section: this.getMostViewedSection(events),
            average_session_time: this.getAverageSessionTime(events),
            top_interactions: this.getTopInteractions(events),
            device_breakdown: this.getDeviceBreakdown(events),
            hourly_distribution: this.getHourlyDistribution(events)
        };
        return summary;
    }

    getMostViewedSection(events) {
        const sectionViews = {};
        events.filter(e => e.event_type === 'section_view').forEach(event => {
            sectionViews[event.section] = (sectionViews[event.section] || 0) + 1;
        });
        return Object.entries(sectionViews).sort((a, b) => b[1] - a[1])[0] || ['none', 0];
    }

    getAverageSessionTime(events) {
        const sessionEnds = events.filter(e => e.event_type === 'session_end');
        if (sessionEnds.length === 0) return 0;
        const totalTime = sessionEnds.reduce((sum, event) => sum + (event.total_time || 0), 0);
        return Math.round(totalTime / sessionEnds.length / 1000); // Convert to seconds
    }

    getTopInteractions(events) {
        const interactions = events.filter(e => ['link_click', 'button_click', 'card_interaction'].includes(e.event_type));
        const interactionCounts = {};
        interactions.forEach(event => {
            const key = event.href || event.button_text || event.card_title || 'unknown';
            interactionCounts[key] = (interactionCounts[key] || 0) + 1;
        });
        return Object.entries(interactionCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    }

    getDeviceBreakdown(events) {
        const devices = events.filter(e => e.event_type === 'device_info');
        const breakdown = {};
        devices.forEach(event => {
            const isMobile = /Mobile|Android|iPhone|iPad/.test(event.user_agent);
            const deviceType = isMobile ? 'Mobile' : 'Desktop';
            breakdown[deviceType] = (breakdown[deviceType] || 0) + 1;
        });
        return breakdown;
    }

    getHourlyDistribution(events) {
        const hourly = {};
        events.forEach(event => {
            const hour = new Date(event.timestamp).getHours();
            hourly[hour] = (hourly[hour] || 0) + 1;
        });
        return hourly;
    }

    // Show analytics dashboard (for demo purposes)
    showDashboard() {
        const summary = this.getAnalyticsSummary();
        console.log('📊 Portfolio Analytics Dashboard:', summary);
        
        // Create a visual dashboard
        this.createDashboardModal(summary);
    }

    createDashboardModal(summary) {
        // Remove existing modal
        const existingModal = document.getElementById('analytics-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'analytics-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4';
        
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">📊 Portfolio Analytics Dashboard</h2>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-blue-800">Total Events</h3>
                        <p class="text-2xl font-bold text-blue-600">${summary.total_events}</p>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-green-800">Sessions</h3>
                        <p class="text-2xl font-bold text-green-600">${summary.sessions}</p>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-purple-800">Page Loads</h3>
                        <p class="text-2xl font-bold text-purple-600">${summary.page_loads}</p>
                    </div>
                    <div class="bg-orange-50 p-4 rounded-lg">
                        <h3 class="font-semibold text-orange-800">Form Submissions</h3>
                        <p class="text-2xl font-bold text-orange-600">${summary.form_submissions}</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-3">Most Viewed Section</h3>
                        <p class="text-lg capitalize">${summary.most_viewed_section[0]} (${summary.most_viewed_section[1]} views)</p>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-3">Average Session Time</h3>
                        <p class="text-lg">${summary.average_session_time} seconds</p>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-3">Top Interactions</h3>
                        <ul class="space-y-1">
                            ${summary.top_interactions.slice(0, 3).map(([item, count]) => 
                                `<li class="text-sm">${item}: ${count}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h3 class="font-semibold mb-3">Device Breakdown</h3>
                        <ul class="space-y-1">
                            ${Object.entries(summary.device_breakdown).map(([device, count]) => 
                                `<li class="text-sm">${device}: ${count}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="mt-6 text-center">
                    <button onclick="window.portfolioAnalytics.exportData()" 
                            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2">
                        Export Data
                    </button>
                    <button onclick="window.portfolioAnalytics.clearData()" 
                            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Clear Data
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    exportData() {
        const events = JSON.parse(localStorage.getItem('portfolio_analytics') || '[]');
        const summary = this.getAnalyticsSummary();
        
        const exportData = {
            summary,
            events,
            exported_at: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    clearData() {
        if (confirm('Are you sure you want to clear all analytics data?')) {
            localStorage.removeItem('portfolio_analytics');
            localStorage.removeItem('portfolio_user_id');
            alert('Analytics data cleared!');
            document.getElementById('analytics-modal')?.remove();
        }
    }
}

// Initialize analytics
window.addEventListener('DOMContentLoaded', () => {
    window.portfolioAnalytics = new PortfolioAnalytics();
    
    // Add analytics dashboard trigger (Ctrl+Shift+A)
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'A') {
            window.portfolioAnalytics.showDashboard();
        }
    });
});