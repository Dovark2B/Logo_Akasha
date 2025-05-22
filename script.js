const path = document.querySelector('.logo-wrapper');
let offset = 3000;
let direction = -1; // -1 = vers 0 (dessin), 1 = retour à 3000 (effacement)
let duration = 10000; // durée de l'animation en ms
let startTime = null; // point de départ de l’animation

function animateStroke(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const progress = Math.min(elapsed / duration, 1);
    const value = direction === -1
        ? 3000 * (1 - progress)
        : 3000 * progress;

    path.style.strokeDashoffset = value;

    if (progress < 1) {
        requestAnimationFrame(animateStroke);
    } else {
        // Pause 2s puis inverse
        setTimeout(() => {
            direction *= -1;
            startTime = null;
            requestAnimationFrame(animateStroke);
        }, 0);
    }
}

const logo = document.querySelector('.logo-wrapper');
let animationQueue = [];
let isAnimating = false;

function triggerAnimation(animationName, duration = '3s') {
    animationQueue.push({ animationName, duration });
    runNextAnimation();
}

function runNextAnimation() {
    if (isAnimating || animationQueue.length === 0) return;
    const { animationName, duration } = animationQueue.shift();
    isAnimating = true;

    logo.style.animation = 'none';
    void logo.offsetWidth;
    logo.style.animation = `${animationName} ${duration} ease-in-out`;

    setTimeout(() => {
        isAnimating = false;
        runNextAnimation();
    }, parseFloat(duration) * 2000);
}

// Ajout dans la file d’attente
setInterval(() => triggerAnimation('rotateY360'), 20000);
setInterval(() => triggerAnimation('bounce'), 10000);
setInterval(() => triggerAnimation('pulse'), 5000);


// Lancer l’animation
requestAnimationFrame(animateStroke);


