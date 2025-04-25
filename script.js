document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.querySelector('.confetti');
    const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#4d908e', '#577590', '#277da1'];

    function createConfetti() {
        const confetti = document.createElement('div');
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.position = 'absolute';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        
        confettiContainer.appendChild(confetti);

        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.2, 0.3, 1)'
        });

        animation.onfinish = () => {
            confetti.remove();
        };
    }

    // Create initial confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 100);
    }

    // Continue creating confetti periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            createConfetti();
        }
    }, 200);
}); 