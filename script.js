const message = "亲爱的李奕璇，和你在一起的每一天都像是上天的恩赐。\n\n你的笑、你的声音、你的温柔，都悄悄占据了我的全部。\n\n谢谢你包容我的小脾气，也谢谢你一直以来的陪伴。\n\n未来的路还很长，我想一直牵着你的手走下去。\n\n你要不要继续爱我一辈子？";
const speed = 75; // Typing speed in ms
let index = 0;

const typeWriter = () => {
    if (index < message.length) {
        const textContainer = document.getElementById("typewriter");

        // Handle newline characters
        if (message.charAt(index) === '\n') {
            textContainer.innerHTML += '<br>';
        } else {
            textContainer.innerHTML += message.charAt(index);
        }

        index++;
        // If it's a newline, we can speed it up slightly to avoid "stutter" feeling,
        // or just keep uniform speed. 75ms is faster than 100ms.
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
    const starCount = 50;

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

const moveNoButton = () => {
    const containerRect = document.querySelector('.card').getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate new position within the card or viewport safely
    // We'll move it by translating it relative to its current position
    // to avoid layout thrashing, but simpler to just set absolute/fixed
    // Let's just use transform translate for smoothness

    // Increase movement range to make it harder to catch
    const x = getRandomNumber(-200, 200);
    const y = getRandomNumber(-200, 200);

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    // Optional: make it smaller each time? Nah, just moving is annoying enough :)
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
