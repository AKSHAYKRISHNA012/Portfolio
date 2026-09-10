// Advanced Admin Panel for Portfolio Management
class PortfolioAdminPanel {
    constructor() {
        this.isAuthenticated = false;
        this.adminPassword = 'admin2025'; // In production, use proper authentication
        this.init();
    }

    init() {
        this.setupAdminTriggers();
        this.checkAuthStatus();
    }

    setupAdminTriggers() {
        // Konami code for admin panel access
        let sequence = [];
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];

        document.addEventListener('keydown', (e) => {
            sequence.push(e.code);
            if (sequence.length > konamiCode.length) {
                sequence.shift();
            }
            
            if (sequence.join(',') === konamiCode.join(',')) {
                this.showLoginPanel();
                sequence = [];
            }
        });

        // Alt + Ctrl + A for quick access
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.ctrlKey && e.key === 'a') {
                e.preventDefault();
                this.showLoginPanel();
            }
        });
    }

    checkAuthStatus() {
        const authData = localStorage.getItem('portfolio_admin_auth');
        if (authData) {
            const { timestamp, authenticated } = JSON.parse(authData);
            // Session expires after 1 hour
            if (Date.now() - timestamp < 3600000 && authenticated) {
                this.isAuthenticated = true;
                this.addAdminControls();
            }
        }
    }

    showLoginPanel() {
        if (this.isAuthenticated) {
            this.showAdminPanel();
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10002]';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 w-96">
                <div class="text-center mb-6">
                    <i class="fas fa-shield-alt text-4xl text-blue-600 mb-4"></i>
                    <h2 class="text-2xl font-bold text-gray-900">Admin Access</h2>
                    <p class="text-gray-600">Enter admin password to continue</p>
                </div>
                
                <form id="admin-login-form" class="space-y-4">
                    <div>
                        <input type="password" 
                               id="admin-password" 
                               placeholder="Admin Password"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               required>
                    </div>
                    
                    <div class="flex space-x-3">
                        <button type="submit" 
                                class="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-sign-in-alt mr-2"></i>Login
                        </button>
                        <button type="button" 
                                onclick="this.closest('.fixed').remove()"
                                class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
                
                <div class="mt-4 text-xs text-gray-500 text-center">
                    💡 Hint: Try the Konami code or Alt+Ctrl+A
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const form = modal.querySelector('#admin-login-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = modal.querySelector('#admin-password').value;
            
            if (password === this.adminPassword) {
                this.authenticate();
                modal.remove();
                this.showAdminPanel();
            } else {
                const input = modal.querySelector('#admin-password');
                input.classList.add('border-red-500');
                input.value = '';
                input.placeholder = 'Incorrect password';
                setTimeout(() => {
                    input.classList.remove('border-red-500');
                    input.placeholder = 'Admin Password';
                }, 2000);
            }
        });

        // Focus password input
        setTimeout(() => {
            modal.querySelector('#admin-password').focus();
        }, 100);
    }

    authenticate() {
        this.isAuthenticated = true;
        localStorage.setItem('portfolio_admin_auth', JSON.stringify({
            timestamp: Date.now(),
            authenticated: true
        }));
        this.addAdminControls();
    }

    addAdminControls() {
        // Add admin mode indicator
        if (!document.querySelector('.admin-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'admin-indicator fixed top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm z-50';
            indicator.innerHTML = '<i class="fas fa-crown mr-1"></i>Admin Mode';
            document.body.appendChild(indicator);
        }

        // Show admin buttons
        const adminButtons = document.querySelectorAll('#analytics-trigger, #performance-trigger');
        adminButtons.forEach(btn => {
            btn.style.display = 'flex';
        });
    }

    showAdminPanel() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10002] p-4';
        
        const analyticsData = window.portfolioAnalytics?.getAnalyticsSummary() || {};
        const performanceData = window.performanceMonitor?.metrics || {};

        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-6xl w-full max-h-[95vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-crown text-yellow-500 text-2xl"></i>
                        <h2 class="text-3xl font-bold text-gray-900">Portfolio Admin Panel</h2>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="this.closest('.fixed').remove()" 
                                class="text-gray-500 hover:text-gray-700 p-2">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-semibold">Total Visitors</h3>
                                <p class="text-2xl font-bold">${analyticsData.sessions || 0}</p>
                            </div>
                            <i class="fas fa-users text-3xl opacity-80"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-semibold">Page Views</h3>
                                <p class="text-2xl font-bold">${analyticsData.page_loads || 0}</p>
                            </div>
                            <i class="fas fa-eye text-3xl opacity-80"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-semibold">Form Submissions</h3>
                                <p class="text-2xl font-bold">${analyticsData.form_submissions || 0}</p>
                            </div>
                            <i class="fas fa-envelope text-3xl opacity-80"></i>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-semibold">Load Time</h3>
                                <p class="text-2xl font-bold">${performanceData.loadTime ? Math.round(performanceData.loadTime) + 'ms' : 'N/A'}</p>
                            </div>
                            <i class="fas fa-bolt text-3xl opacity-80"></i>
                        </div>
                    </div>
                </div>

                <!-- Admin Tools -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <!-- Analytics Tools -->
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold mb-4 flex items-center">
                            <i class="fas fa-chart-bar mr-2 text-blue-600"></i>
                            Analytics Tools
                        </h3>
                        <div class="space-y-3">
                            <button onclick="window.portfolioAnalytics?.showDashboard()" 
                                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                <i class="fas fa-analytics mr-2"></i>View Detailed Analytics
                            </button>
                            <button onclick="window.portfolioAnalytics?.exportData()" 
                                    class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-download mr-2"></i>Export Analytics Data
                            </button>
                            <button onclick="this.clearAnalytics()" 
                                    class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                                <i class="fas fa-trash mr-2"></i>Clear Analytics Data
                            </button>
                        </div>
                    </div>

                    <!-- Performance Tools -->
                    <div class="bg-gray-50 p-6 rounded-lg">
                        <h3 class="text-lg font-semibold mb-4 flex items-center">
                            <i class="fas fa-tachometer-alt mr-2 text-green-600"></i>
                            Performance Tools
                        </h3>
                        <div class="space-y-3">
                            <button onclick="window.performanceMonitor?.showPerformanceDashboard()" 
                                    class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-dashboard mr-2"></i>Performance Dashboard
                            </button>
                            <button onclick="window.performanceMonitor?.runPerformanceTest()" 
                                    class="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
                                <i class="fas fa-play mr-2"></i>Run Performance Test
                            </button>
                            <button onclick="window.performanceMonitor?.exportPerformanceData()" 
                                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                <i class="fas fa-download mr-2"></i>Export Performance Data
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Contact Management -->
                <div class="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 class="text-lg font-semibold mb-4 flex items-center">
                        <i class="fas fa-envelope mr-2 text-purple-600"></i>
                        Contact Management
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button onclick="this.testEmailSystem()" 
                                class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                            <i class="fas fa-paper-plane mr-2"></i>Test Email System
                        </button>
                        <button onclick="this.viewFormDrafts()" 
                                class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                            <i class="fas fa-drafts mr-2"></i>View Form Drafts
                        </button>
                        <button onclick="this.exportContactData()" 
                                class="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
                            <i class="fas fa-export mr-2"></i>Export Contact Data
                        </button>
                    </div>
                </div>

                <!-- System Information -->
                <div class="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 class="text-lg font-semibold mb-4 flex items-center">
                        <i class="fas fa-info-circle mr-2 text-gray-600"></i>
                        System Information
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p><strong>User Agent:</strong> ${navigator.userAgent.substring(0, 50)}...</p>
                            <p><strong>Screen Resolution:</strong> ${screen.width}x${screen.height}</p>
                            <p><strong>Viewport:</strong> ${window.innerWidth}x${window.innerHeight}</p>
                        </div>
                        <div>
                            <p><strong>Connection:</strong> ${navigator.connection?.effectiveType || 'Unknown'}</p>
                            <p><strong>Platform:</strong> ${navigator.platform}</p>
                            <p><strong>Language:</strong> ${navigator.language}</p>
                        </div>
                    </div>
                </div>

                <!-- Admin Actions -->
                <div class="flex flex-wrap gap-3 justify-center">
                    <button onclick="this.generateReport()" 
                            class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                        <i class="fas fa-file-alt mr-2"></i>Generate Full Report
                    </button>
                    <button onclick="this.clearAllData()" 
                            class="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                        <i class="fas fa-trash-alt mr-2"></i>Clear All Data
                    </button>
                    <button onclick="this.logout()" 
                            class="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                        <i class="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                </div>

                <div class="mt-6 text-center text-xs text-gray-500">
                    <p>Admin panel initialized at ${new Date().toLocaleString()}</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Bind methods to modal context
        modal.clearAnalytics = this.clearAnalytics.bind(this);
        modal.testEmailSystem = this.testEmailSystem.bind(this);
        modal.viewFormDrafts = this.viewFormDrafts.bind(this);
        modal.exportContactData = this.exportContactData.bind(this);
        modal.generateReport = this.generateReport.bind(this);
        modal.clearAllData = this.clearAllData.bind(this);
        modal.logout = this.logout.bind(this);
    }

    clearAnalytics() {
        if (confirm('Are you sure you want to clear all analytics data?')) {
            window.portfolioAnalytics?.clearData();
        }
    }

    testEmailSystem() {
        const testData = {
            user_name: 'Admin Test',
            user_email: 'admin@test.com',
            subject: 'Portfolio Email System Test',
            message: 'This is a test email from the admin panel to verify the email system is working correctly.',
            test_mode: true,
            timestamp: new Date().toISOString()
        };

        emailjs.send('service_onp2ylh', '__ejs-test-mail-service__', testData)
            .then((response) => {
                alert('✅ Email system test successful!\n\nStatus: ' + response.status + '\nResponse: ' + response.text);
            })
            .catch((error) => {
                alert('❌ Email system test failed!\n\nError: ' + error.text);
            });
    }

    viewFormDrafts() {
        const drafts = localStorage.getItem('contact_form_draft');
        if (drafts) {
            const data = JSON.parse(drafts);
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10003] p-4';
            modal.innerHTML = `
                <div class="bg-white rounded-lg p-6 max-w-2xl w-full">
                    <h3 class="text-xl font-bold mb-4">Form Drafts</h3>
                    <div class="space-y-2">
                        <p><strong>Name:</strong> ${data.user_name || 'N/A'}</p>
                        <p><strong>Email:</strong> ${data.user_email || 'N/A'}</p>
                        <p><strong>Subject:</strong> ${data.subject || 'N/A'}</p>
                        <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
                        <p><strong>Saved At:</strong> ${data.saved_at || 'N/A'}</p>
                    </div>
                    <div class="mt-4 text-center">
                        <button onclick="this.closest('.fixed').remove()" 
                                class="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Close
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            alert('No form drafts found.');
        }
    }

    exportContactData() {
        const data = {
            form_drafts: JSON.parse(localStorage.getItem('contact_form_draft') || '{}'),
            rate_limit_data: JSON.parse(localStorage.getItem('contact_rate_limit') || '[]'),
            analytics_data: JSON.parse(localStorage.getItem('portfolio_analytics') || '[]')
                .filter(event => event.event_type.startsWith('form_')),
            exported_at: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `contact-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateReport() {
        const analyticsData = window.portfolioAnalytics?.getAnalyticsSummary() || {};
        const performanceData = window.performanceMonitor?.metrics || {};
        
        const report = {
            generated_at: new Date().toISOString(),
            analytics_summary: analyticsData,
            performance_metrics: performanceData,
            system_info: {
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                viewport_size: `${window.innerWidth}x${window.innerHeight}`,
                connection_type: navigator.connection?.effectiveType || 'unknown',
                platform: navigator.platform,
                language: navigator.language
            },
            storage_usage: {
                analytics_events: JSON.parse(localStorage.getItem('portfolio_analytics') || '[]').length,
                performance_data: localStorage.getItem('performance_data') ? 1 : 0,
                form_drafts: localStorage.getItem('contact_form_draft') ? 1 : 0
            }
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('📊 Full report generated and downloaded!');
    }

    clearAllData() {
        if (confirm('⚠️ This will clear ALL data including analytics, performance data, and form drafts. This action cannot be undone. Are you sure?')) {
            if (confirm('🔴 Final confirmation: This will permanently delete all portfolio data. Continue?')) {
                localStorage.removeItem('portfolio_analytics');
                localStorage.removeItem('portfolio_user_id');
                localStorage.removeItem('performance_data');
                localStorage.removeItem('contact_form_draft');
                localStorage.removeItem('contact_rate_limit');
                
                alert('🗑️ All data has been cleared!');
                location.reload();
            }
        }
    }

    logout() {
        localStorage.removeItem('portfolio_admin_auth');
        this.isAuthenticated = false;
        
        // Remove admin indicator
        document.querySelector('.admin-indicator')?.remove();
        
        // Hide admin buttons
        const adminButtons = document.querySelectorAll('#analytics-trigger, #performance-trigger');
        adminButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Close admin panel
        document.querySelector('.fixed')?.remove();
        
        alert('👋 Logged out successfully!');
    }
}

// Initialize admin panel
window.addEventListener('DOMContentLoaded', () => {
    window.portfolioAdmin = new PortfolioAdminPanel();
});