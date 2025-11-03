document.addEventListener('DOMContentLoaded', function() {
    // Aktuális év a láblécben
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Gördülékeny scroll animáció az oldalon belüli linkekhez
    // (Bár a CSS `scroll-behavior: smooth` ezt megoldja a modern böngészőkben,
    // ez egy fallback lehet régebbiekhez, vagy ha bonyolultabb logikát szeretnénk)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Main contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Facebook Pixel tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Főoldal kapcsolati űrlap',
                    value: 0,
                    currency: 'HUF'
                });
            }
            
            // Simple success message (in real implementation, send to server)
            alert('Köszönjük az érdeklődését! Kollégánk hamarosan felveszi Önnel a kapcsolatot!');
            
            // Reset form
            this.reset();
        });
    }

    // Track scroll depth for Facebook
    let scrollDepths = [25, 50, 75, 90];
    let scrollDepthTriggered = [];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !scrollDepthTriggered.includes(depth)) {
                scrollDepthTriggered.push(depth);
                
                if (typeof fbq !== 'undefined') {
                    fbq('trackCustom', 'ScrollDepth', {
                        percentage: depth
                    });
                }
            }
        });
    });

    // Track time on page
    let timeOnPage = 0;
    const timeIntervals = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m
    let timeTriggered = [];
    
    setInterval(function() {
        timeOnPage += 10;
        
        timeIntervals.forEach(interval => {
            if (timeOnPage >= interval && !timeTriggered.includes(interval)) {
                timeTriggered.push(interval);
                
                if (typeof fbq !== 'undefined') {
                    fbq('trackCustom', 'TimeOnPage', {
                        seconds: interval
                    });
                }
            }
        });
    }, 10000); // Check every 10 seconds

    // Track CTA button clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', 'CTAClick', {
                    button_text: buttonText,
                    button_location: this.closest('section').id || 'unknown'
                });
            }
        });
    });

    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    contact_method: 'phone'
                });
            }
        });
    });

    // Track WhatsApp button clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {
                    contact_method: 'whatsapp'
                });
            }
        });
    });
});