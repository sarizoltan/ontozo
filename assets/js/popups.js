// Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Lead magnet popup elements
    const leadPopup = document.getElementById('lead-popup');
    const exitPopup = document.getElementById('exit-popup');
    const leadForm = document.getElementById('lead-form');
    const exitForm = document.getElementById('exit-form');
    
    // Close button handlers
    document.querySelectorAll('.popup-close').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.popup-overlay').classList.remove('active');
        });
    });
    
    // Close popup when clicking outside
    document.querySelectorAll('.popup-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Lead magnet popup - show after 10 seconds
    setTimeout(function() {
        if (!localStorage.getItem('leadPopupShown')) {
            leadPopup.classList.add('active');
            localStorage.setItem('leadPopupShown', 'true');
        }
    }, 10000);
    
    // Exit intent popup
    let exitShown = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitShown && !localStorage.getItem('exitPopupShown')) {
            exitPopup.classList.add('active');
            exitShown = true;
            localStorage.setItem('exitPopupShown', 'true');
        }
    });
    
    // Form submissions
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('popup-name');
        const phone = formData.get('popup-phone');
        const email = formData.get('popup-email');
        
        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Ingyenes felmérés - Lead popup',
                value: 0,
                currency: 'HUF'
            });
        }
        
        // Simple success message (in real implementation, send to server)
        alert('Köszönjük! Felvesszük Önnel a kapcsolatot 24 órán belül!');
        leadPopup.classList.remove('active');
        
        // Mark as converted to prevent showing again
        localStorage.setItem('leadConverted', 'true');
    });
    
    exitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('exit-name');
        const phone = formData.get('exit-phone');
        
        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: '40% kedvezmény - Exit popup',
                value: 0,
                currency: 'HUF'
            });
        }
        
        // Simple success message (in real implementation, send to server)
        alert('Fantasztikus! A 40% kedvezményes ajánlatot 1 órán belül elküldjük!');
        exitPopup.classList.remove('active');
        
        // Mark as converted
        localStorage.setItem('exitConverted', 'true');
    });
    
    // Don't show popups if user already converted
    if (localStorage.getItem('leadConverted') || localStorage.getItem('exitConverted')) {
        return;
    }
    
    // Mobile scroll-based lead popup (alternative to exit intent)
    let scrollTriggered = false;
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 70 && !scrollTriggered && !localStorage.getItem('leadPopupShown')) {
            leadPopup.classList.add('active');
            scrollTriggered = true;
            localStorage.setItem('leadPopupShown', 'true');
        }
    });
});