const player = document.getElementById('player');
let playerX = 0;
let playerY = 0;
const stepSize = 32; // Size of one step in pixels

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            playerY -= stepSize;
            break;
        case 'ArrowDown':
            playerY += stepSize;
            break;
        case 'ArrowLeft':
            playerX -= stepSize;
            break;
        case 'ArrowRight':
            playerX += stepSize;
            break;
    }

    // Update player position
    player.style.top = `${playerY}px`;
    player.style.left = `${playerX}px`;

    // Check for random battle
    if (Math.random() < 0.1) { // 10% chance for a battle to start
        alert('A wild enemy appears!');
        // You can replace this alert with a function to start the battle
    }
});
