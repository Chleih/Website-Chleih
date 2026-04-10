import { MAX_ANGLE_SPEED, MAX_RADIUS_FACTOR, MIN_ANGLE_SPEED, MIN_RADIUS_FACTOR, PARTICLE_COUNT } from './constants';

function animateParticle(particle, container) {
    const minRadius = (MIN_RADIUS_FACTOR * container.offsetWidth) / 2;
    const maxRadius = (MAX_RADIUS_FACTOR * container.offsetWidth) / 2;
    const radius = minRadius + Math.random() * (maxRadius - minRadius);

    const angleSpeed = MIN_ANGLE_SPEED + Math.random() * (MAX_ANGLE_SPEED - MIN_ANGLE_SPEED);
    let angle = Math.random() * Math.PI * 2;

    function move() {
        const x = container.offsetWidth / 2 + radius * Math.cos(angle) - particle.offsetWidth / 2;
        const y = container.offsetHeight / 2 + radius * Math.sin(angle) - particle.offsetHeight / 2;

        particle.style.transform = `translate(${x}px, ${y}px)`;
        angle += angleSpeed;

        window.requestAnimationFrame(move);
    }

    move();
}

export function initParticles() {
    const container = document.getElementById('particle-container');

    if (!container) {
        return;
    }

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        container.appendChild(particle);

        animateParticle(particle, container);
    }
}
