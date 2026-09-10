// Enhanced Contact System with Advanced Features
class EnhancedContactSystem {
    constructor() {
        this.init();
        this.autoSaveEnabled = true;
        this.autoSaveInterval = null;
        this.formData = {};
        this.submissionCount = 0;
        this.rateLimitCount = 0;
        this.rateLimitWindow = 3600000; // 1 hour in ms
    }

    init() {
        this.setupFormValidation();
        this.setupAutoSave();
        this.setupFormAnalytics();
        this.setupRateLimit();
        this.setupProgressIndicator();
        this.setupFormRecovery();
        this.enhanceEmailJS();
    }

    // Enhanced form validation with real-time feedback
    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Add validation container
            const validationDiv = document.createElement('div');
            validationDiv.className = 'validation-message mt-1 text-sm hidden';
            input.parentNode.appendChild(validationDiv);

            // Real-time validation
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('focus', () => this.clearValidation(input));
        });

        // Add form progress indicator
        this.addFormProgressIndicator(form);
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const validationDiv = field.parentNode.querySelector('.validation-message');
        
        let isValid = true;
        let message = '';

        switch (fieldName) {
            case 'user_name':
                if (!value) {
                    isValid = false;
                    message = 'Name is required';
                } else if (value.length < 2) {
                    isValid = false;
                    message = 'Name must be at least 2 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    isValid = false;
                    message = 'Name should only contain letters and spaces';
                }
                break;

            case 'user_email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    message = 'Email is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;

            case 'subject':
                if (!value) {
                    isValid = false;
                    message = 'Subject is required';
                } else if (value.length < 5) {
                    isValid = false;
                    message = 'Subject must be at least 5 characters';
                }
                break;

            case 'message':
                if (!value) {
                    isValid = false;
                    message = 'Message is required';
                } else if (value.length < 10) {
                    isValid = false;
                    message = 'Message must be at least 10 characters';
                } else if (value.length > 1000) {
                    isValid = false;
                    message = 'Message must be less than 1000 characters';
                }
                break;
        }

        this.updateFieldValidation(field, validationDiv, isValid, message);
        this.updateFormProgress();
        return isValid;
    }

    updateFieldValidation(field, validationDiv, isValid, message) {
        if (isValid) {
            field.classList.remove('border-red-300', 'focus:ring-red-500');
            field.classList.add('border-green-300', 'focus:ring-green-500');
            validationDiv.classList.add('hidden');
            validationDiv.classList.remove('text-red-600', 'text-green-600');
        } else {
            field.classList.remove('border-green-300', 'focus:ring-green-500');
            field.classList.add('border-red-300', 'focus:ring-red-500');
            validationDiv.textContent = message;
            validationDiv.classList.remove('hidden', 'text-green-600');
            validationDiv.classList.add('text-red-600');
        }
    }

    clearValidation(field) {
        const validationDiv = field.parentNode.querySelector('.validation-message');
        if (validationDiv) {
            validationDiv.classList.add('hidden');
        }
        field.classList.remove('border-red-300', 'focus:ring-red-500', 'border-green-300', 'focus:ring-green-500');
    }

    // Auto-save form data
    setupAutoSave() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (this.autoSaveEnabled) {
                    this.saveFormData();
                    this.showAutoSaveIndicator();
                }
            });
        });

        // Load saved data on page load
        this.loadFormData();
    }

    saveFormData() {
        const form = document.getElementById('contact-form');
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        data.saved_at = new Date().toISOString();
        localStorage.setItem('contact_form_draft', JSON.stringify(data));
    }

    loadFormData() {
        const savedData = localStorage.getItem('contact_form_draft');
        if (!savedData) return;

        const data = JSON.parse(savedData);
        const form = document.getElementById('contact-form');
        
        Object.entries(data).forEach(([key, value]) => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field && key !== 'saved_at') {
                field.value = value;
            }
        });

        if (Object.keys(data).length > 1) {
            this.showFormRecoveryNotification(data.saved_at);
        }
    }

    showAutoSaveIndicator() {
        // Remove existing indicator
        const existingIndicator = document.querySelector('.autosave-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }

        const indicator = document.createElement('div');
        indicator.className = 'autosave-indicator fixed top-20 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm z-50';
        indicator.innerHTML = '<i class="fas fa-save mr-1"></i> Auto-saved';
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 300);
        }, 2000);
    }

    showFormRecoveryNotification(savedAt) {
        const notification = document.createElement('div');
        notification.className = 'form-recovery-notification bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4';
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                    <span class="text-blue-800">Form data recovered from ${new Date(savedAt).toLocaleString()}</span>
                </div>
                <div>
                    <button onclick="this.closest('.form-recovery-notification').remove()" 
                            class="text-blue-500 hover:text-blue-700 mr-2">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(notification, form);
    }

    // Form progress indicator
    addFormProgressIndicator(form) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'form-progress mb-4';
        progressContainer.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">Form Completion</span>
                <span class="text-sm font-medium text-gray-700" id="progress-percentage">0%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300" 
                     id="progress-bar" style="width: 0%"></div>
            </div>
        `;

        form.parentNode.insertBefore(progressContainer, form);
        this.updateFormProgress();
    }

    updateFormProgress() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        const progressBar = document.getElementById('progress-bar');
        const progressPercentage = document.getElementById('progress-percentage');
        
        if (!progressBar || !progressPercentage) return;

        let completedFields = 0;
        inputs.forEach(input => {
            if (input.value.trim() && this.validateField(input)) {
                completedFields++;
            }
        });

        const percentage = Math.round((completedFields / inputs.length) * 100);
        progressBar.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage}%`;
    }

    // Enhanced form analytics
    setupFormAnalytics() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        let formStartTime = null;
        let fieldFocusTime = {};
        let fieldCompletionOrder = [];

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (!formStartTime) {
                    formStartTime = Date.now();
                }
                fieldFocusTime[input.name] = Date.now();
            });

            input.addEventListener('blur', () => {
                if (fieldFocusTime[input.name]) {
                    const timeSpent = Date.now() - fieldFocusTime[input.name];
                    
                    if (input.value.trim() && !fieldCompletionOrder.includes(input.name)) {
                        fieldCompletionOrder.push(input.name);
                    }

                    // Log field interaction
                    this.logFormEvent('field_interaction', {
                        field: input.name,
                        time_spent: timeSpent,
                        completion_order: fieldCompletionOrder.indexOf(input.name) + 1,
                        character_count: input.value.length
                    });
                }
            });
        });

        form.addEventListener('submit', () => {
            const totalTime = formStartTime ? Date.now() - formStartTime : 0;
            this.logFormEvent('form_completion', {
                total_time: totalTime,
                completion_order: fieldCompletionOrder,
                submission_attempt: this.submissionCount + 1
            });
        });
    }

    // Rate limiting
    setupRateLimit() {
        this.loadRateLimitData();
    }

    checkRateLimit() {
        const now = Date.now();
        const windowStart = now - this.rateLimitWindow;
        
        // Clean old submissions
        this.rateLimitData = this.rateLimitData.filter(time => time > windowStart);
        
        if (this.rateLimitData.length >= 5) { // Max 5 submissions per hour
            return false;
        }
        
        return true;
    }

    addToRateLimit() {
        this.rateLimitData.push(Date.now());
        localStorage.setItem('contact_rate_limit', JSON.stringify(this.rateLimitData));
    }

    loadRateLimitData() {
        this.rateLimitData = JSON.parse(localStorage.getItem('contact_rate_limit') || '[]');
    }

    // Enhanced EmailJS integration
    enhanceEmailJS() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEnhancedSubmission(form);
        });
    }

    async handleEnhancedSubmission(form) {
        const sendBtn = document.getElementById('send-btn');
        const originalText = sendBtn.innerHTML;

        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let allValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });

        if (!allValid) {
            this.showNotification('Please fix the errors before submitting', 'error');
            return;
        }

        // Check rate limit
        if (!this.checkRateLimit()) {
            this.showNotification('Too many submissions. Please wait an hour before trying again.', 'error');
            return;
        }

        // Show enhanced loading state
        sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        sendBtn.disabled = true;

        // Add submission metadata
        const formData = new FormData(form);
        const enhancedData = {
            user_name: formData.get('user_name'),
            user_email: formData.get('user_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            submission_time: new Date().toISOString(),
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            session_id: window.portfolioAnalytics?.sessionId || 'unknown',
            form_completion_time: this.getFormCompletionTime(),
            submission_count: this.submissionCount + 1
        };

        try {
            // Check if EmailJS is available
            if (typeof emailjs !== 'undefined') {
                // Try EmailJS first with working service
                const response = await emailjs.send(
                    'service_ak012_portfolio',
                    'template_ak_contact',
                    enhancedData
                );
                console.log('EmailJS Success:', response);
            } else {
                // Fallback to Formspree or direct email
                const response = await this.sendViaFormspree(enhancedData);
                console.log('Formspree Success:', response);
            }

            // Success handling
            this.submissionCount++;
            this.addToRateLimit();
            localStorage.removeItem('contact_form_draft'); // Clear draft
            
            this.showNotification('✨ Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
            form.reset();
            this.updateFormProgress();

            // Log successful submission
            this.logFormEvent('submission_success', {
                response_status: response.status,
                response_text: response.text
            });

        } catch (error) {
            console.error('All email sending methods failed:', error);
            
            // Fallback: Open user's email client
            const name = form.querySelector('#user_name').value;
            const email = form.querySelector('#user_email').value;
            const subject = form.querySelector('#subject').value;
            const message = form.querySelector('#message').value;
            
            const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const emailLink = `mailto:akshaykrishna.a.2002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Show success message and open email client
            this.showNotification(
                '📧 Opening your email client... If it doesn\'t open, please copy the details and email me directly at akshaykrishna.a.2002@gmail.com', 
                'info',
                8000
            );
            
            // Open email client
            window.location.href = emailLink;
            
            // Still count as a successful submission for user experience
            this.submissionCount++;
            this.addToRateLimit();
            localStorage.removeItem('contact_form_draft');
            form.reset();
            this.updateFormProgress();
            
            // Log failed submission
            this.logFormEvent('submission_error', {
                error_status: error.status,
                error_text: error.text
            });

        } finally {
            // Reset button state
            sendBtn.innerHTML = originalText;
            sendBtn.disabled = false;
        }
    }

    getFormCompletionTime() {
        const formData = JSON.parse(localStorage.getItem('contact_form_draft') || '{}');
        return formData.saved_at ? new Date().toISOString() : null;
    }

    // Enhanced notification system
    showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification');
        if (!container) return;

        // Clear existing notifications
        container.innerHTML = '';

        const notification = document.createElement('div');
        
        const typeClasses = {
            success: 'bg-green-500 border-green-600',
            error: 'bg-red-500 border-red-600',
            warning: 'bg-yellow-500 border-yellow-600',
            info: 'bg-blue-500 border-blue-600'
        };

        const iconClasses = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-triangle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };

        notification.className = `${typeClasses[type] || typeClasses.info} text-white px-6 py-4 rounded-lg shadow-lg border-l-4 flex items-center space-x-3 min-w-80 max-w-md transform transition-all duration-300`;
        
        notification.innerHTML = `
            <i class="${iconClasses[type] || iconClasses.info} text-xl flex-shrink-0"></i>
            <span class="flex-1 font-medium">${message}</span>
            <button class="text-white hover:text-gray-200 ml-4 focus:outline-none" onclick="this.closest('#notification').style.transform='translateX(100%)'">
                <i class="fas fa-times text-lg"></i>
            </button>
        `;

        container.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            container.style.transform = 'translateX(0)';
        }, 100);

        // Auto hide
        setTimeout(() => {
            container.style.transform = 'translateX(100%)';
            setTimeout(() => {
                container.innerHTML = '';
            }, 300);
        }, duration);
    }

    logFormEvent(eventType, data) {
        if (window.portfolioAnalytics) {
            window.portfolioAnalytics.logEvent(`form_${eventType}`, data);
        }
    }

    setupFormRecovery() {
        // Add clear draft button
        const form = document.getElementById('contact-form');
        if (!form) return;

        const clearDraftBtn = document.createElement('button');
        clearDraftBtn.type = 'button';
        clearDraftBtn.className = 'text-sm text-gray-500 hover:text-gray-700 mt-2';
        clearDraftBtn.innerHTML = '<i class="fas fa-trash-alt mr-1"></i> Clear Draft';
        clearDraftBtn.onclick = () => {
            if (confirm('Clear saved form data?')) {
                localStorage.removeItem('contact_form_draft');
                form.reset();
                this.updateFormProgress();
                this.showNotification('Draft cleared', 'info');
            }
        };

        form.appendChild(clearDraftBtn);
    }

    // Fallback email sending via Formspree
    async sendViaFormspree(data) {
        const formspreeData = new FormData();
        formspreeData.append('name', data.user_name);
        formspreeData.append('email', data.user_email);
        formspreeData.append('subject', data.subject);
        formspreeData.append('message', data.message);
        
        const response = await fetch('https://formspree.io/f/xvgpklnr', {
            method: 'POST',
            body: formspreeData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Formspree submission failed');
        }
        
        return response.json();
    }
}

// Initialize enhanced contact system
window.addEventListener('DOMContentLoaded', () => {
    window.enhancedContactSystem = new EnhancedContactSystem();
});