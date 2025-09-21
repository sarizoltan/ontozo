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
});