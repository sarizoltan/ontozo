document.addEventListener('DOMContentLoaded', function() {
    const waterContainer = document.querySelector('.water-drops');
    if (!waterContainer) return;

    const dropsCount = 70; // Ez a sűrűség maradhat, de növelhető ha szeretnéd

    for (let i = 0; i < dropsCount; i++) {
        let drop = document.createElement('div');
        drop.className = 'drop';

        // Véletlenszerű pálya és késleltetés
        const angle = (Math.random() * Math.PI) - (Math.PI / 2); // -90 és +90 fok között
        
        // --- MÓDOSÍTÁS ITT ---
        // A sebességet ismét megduplázzuk a még nagyobb szóráshoz
        const velocity = 500 + Math.random() * 300; // Eredetileg: 250 + Math.random() * 150

        const xEnd = Math.sin(angle) * velocity;
        const yEnd = -Math.cos(angle) * velocity;

        drop.style.setProperty('--x-end', `${xEnd}px`);
        drop.style.setProperty('--y-end', `${yEnd}px`);

        // Késleltetés, hogy ne egyszerre induljanak
        drop.style.animationDelay = `${Math.random() * 1.5}s`;

        waterContainer.appendChild(drop);
    }
});