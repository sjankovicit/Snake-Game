// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!validateForm(name, email, subject, message)) {
                return;
            }
            
            // Prepare form data
            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
            
            // Send email (using mailto as a simple solution)
            // For production, you would use a backend service like Formspree, EmailJS, or your own server
            sendEmail(formData);
        });
    }
});

/**
 * Validate form inputs
 */
function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (subject === '') {
        showError('subject', 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for a field
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        
        // Create error message element if it doesn't exist
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '-15px';
            errorElement.style.display = 'block';
            errorElement.style.marginBottom = '15px';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
}

/**
 * Clear all error messages
 */
function clearErrors() {
    const fields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    fields.forEach(field => {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    });
    
    // Remove form-wide messages
    const formMessages = document.querySelectorAll('.form-message');
    formMessages.forEach(msg => msg.remove());
}

/**
 * Send email using mailto (client-side solution)
 * For a real email sending capability, you would need:
 * 1. A backend server with PHP/Node.js/Python
 * 2. A service like Formspree, EmailJS, or SendGrid
 * 3. Or use the Web Speech API for more advanced features
 */
function sendEmail(formData) {
    // Create mailto link
    const mailtoLink = `mailto:email@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showFormMessage('Message prepared! Your email client should open shortly.', 'success');
    
    // Reset form after a delay
    setTimeout(() => {
        document.getElementById('contactForm').reset();
        clearErrors();
    }, 1000);
}

/**
 * Show a message after form submission
 */
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Additional features: Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            header.style.backgroundColor = '#2c3e50';
        }
    }
});

// Form field animations
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    formFields.forEach(field => {
        // Add focus animation
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Real-time validation
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                const value = this.value.trim();
                let isValid = true;
                
                if (this.type === 'email' && value !== '') {
                    isValid = isValidEmail(value);
                } else if (value === '') {
                    isValid = false;
                }
                
                if (isValid) {
                    this.classList.remove('error');
                    const errorElement = this.parentNode.querySelector('.field-error');
                    if (errorElement) {
                        errorElement.remove();
                    }
                }
            }
        });
    });
});