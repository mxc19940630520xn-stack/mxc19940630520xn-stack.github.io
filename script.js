const message = "亲爱的李奕璇，和你在一起的每一天都像是上天的恩赐。\n\n你的笑、你的声音、你的温柔，都悄悄占据了我的全部。\n\n谢谢你包容我的小脾气，也谢谢你一直以来的陪伴。\n\n未来的路还很长，我想一直牵着你的手走下去。\n\n你要不要继续爱我一辈子？";
const speed = 75; // Typing speed in ms
let index = 0;

const typeWriter = () => {
    if (index < message.length) {
        const textContainer = document.getElementById("typewriter");
        const char = message.charAt(index);

        // Handle newline characters
        if (char === '\n') {
            textContainer.appendChild(document.createElement('br'));
        } else {
            // Append text node to avoid re-parsing innerHTML (fixes jitter)
            textContainer.appendChild(document.createTextNode(char));
        }

        index++;
        setTimeout(typeWriter, speed);
    } else {
        // Typing finished
        const textContainer = document.getElementById("typewriter");
        textContainer.classList.add('typing-done');

        // Show buttons with fade-in animation
        const buttons = document.getElementById("buttons-container");
        buttons.style.display = "flex";
        buttons.style.animation = "fadeIn 2s ease forwards";
    }
};

// Start typing when page loads
window.onload = () => {
    createStars();
    setTimeout(typeWriter, 1000); // Small delay before start
};

function createStars() {
    const starContainer = document.getElementById('background-animation');
    // Reduce stars on mobile for performance
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 20 : 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position
        const x = Math.random() * 100 + '%';
        const y = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 3 + 2 + 'px'; // 2px to 5px

        // Random animation duration
        const duration = Math.random() * 5 + 5 + 's'; // 5s to 10s
        const delay = Math.random() * 5 + 's';

        star.style.left = x;
        star.style.top = y;
        star.style.width = size;
        star.style.height = size;
        star.style.animationDuration = duration;
        star.style.animationDelay = delay;

        starContainer.appendChild(star);
    }
}

// "No" button runs away
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");

// Helper to get random number
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let noScale = 1;
let yesScale = 1;

const moveNoButton = () => {
    // Shrink "No" button
    if (noScale > 0.1) {
        noScale -= 0.1;
    }

    // Grow "Yes" button
    yesScale += 0.3;

    // Calculate viewport bounds
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate safe area (ensure it stays fully visible with padding)
    // We use a safe margin of 20px
    const maxLeft = viewportWidth - btnWidth - 20;
    const maxTop = viewportHeight - btnHeight - 20;

    // Ensure we don't have negative range if screen is tiny
    const safeMaxLeft = Math.max(20, maxLeft);
    const safeMaxTop = Math.max(20, maxTop);

    // Generate random position within safe bounds
    const randomLeft = Math.floor(Math.random() * (safeMaxLeft - 20) + 20);
    const randomTop = Math.floor(Math.random() * (safeMaxTop - 20) + 20);

    // Apply position using fixed positioning to guarantee screen coordinates
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';

    // Apply scale (translate is no longer needed since we position absolutely/fixed)
    noBtn.style.transform = `scale(${noScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;
};

// Desktop: hover
noBtn.addEventListener('mouseover', moveNoButton);
// Mobile: touchstart (tap)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click
    moveNoButton();
});
// Failsafe: if they manage to click, move it and do nothing else
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
    return false;
});

// "Yes" button handler
yesBtn.addEventListener('click', () => {
    // 1. Confetti explosion
    launchConfetti();

    // 2. Show Success Modal
    setTimeout(() => {
        const modal = document.getElementById('success-modal');
        modal.style.display = "flex"; // Using flex to center
        modal.classList.add('show');
    }, 1000);
});

// Confetti logic using canvas-confetti
function launchConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        // launch a few confetti from the left edge
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff6b81', '#ff9a9e', '#fad0c4']
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#a29bfe', '#74b9ff', '#81ecec']
        });

        // keep going until we are out of time
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
