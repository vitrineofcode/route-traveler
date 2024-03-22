const player = document.getElementById('player');
let playerX = 0;
let playerY = 0;
const stepSize = 32; // Size of one step in pixels

document.addEventListener('keydown', function(event) {
    const character = document.querySelector('.character');
    const board = document.getElementById('game-board');
    const boardRect = board.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();

    let left = characterRect.left - boardRect.left;
    let top = characterRect.top - boardRect.top;

    switch(event.key) {
        case 'ArrowUp':
            top = Math.max(0, top - 10);
            break;
        case 'ArrowDown':
            top = Math.min(boardRect.height - characterRect.height, top + 10);
            break;
        case 'ArrowLeft':
            left = Math.max(0, left - 10);
            break;
        case 'ArrowRight':
            left = Math.min(boardRect.width - characterRect.width, left + 10);
            break;
    }

    character.style.left = left + 'px';
    character.style.top = top + 'px';
});


    // Update player position
    player.style.top = `${playerY}px`;
    player.style.left = `${playerX}px`;

    // Check for random battle
    if (Math.random() < 0.1) { // 10% chance for a battle to start
        alert('A wild enemy appears!');
        // You can replace this alert with a function to start the battle
    }
});
