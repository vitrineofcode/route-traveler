// Initialize player and enemy stats
let playerHealth = 100;
let playerMana = 50;
let enemyHealth = 80;
let playerPotions = 2;
let isPlayerTurn = true;
let difficulty = 'normal';

// Update the display of player and enemy stats on the webpage
function updateStats() {
    document.getElementById('playerHealth').textContent = Math.max(playerHealth, 0);
    document.getElementById('playerMana').textContent = Math.max(playerMana, 0);
    document.getElementById('enemyHealth').textContent = Math.max(enemyHealth, 0);
    document.getElementById('playerPotions').textContent = playerPotions;
}

// Add a message to the battle log
function addMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom of the messages div
}

// Clear the battle log
function clearMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
}

// Enable all action buttons
function enableButtons() {
    document.getElementById('attackButton').disabled = false;
    document.getElementById('healButton').disabled = false;
    document.getElementById('magicButton').disabled = false;
    document.getElementById('itemButton').disabled = false;
    document.getElementById('specialSkillButton').disabled = false;
}

// Player's attack action
function playerAttack() {
    if (isPlayerTurn) {
        const damage = 10;
        enemyHealth -= damage;
        addMessage(`Player attacks Enemy for ${damage} damage.`);
        updateStats();
        checkGameOver(); // Check if the game is over after the attack
        isPlayerTurn = false;
        if (enemyHealth > 0) {
            setTimeout(enemyTurn, 1000); // Enemy's turn after 1 second
        }
        flashEnemy(); // Visual effect for the enemy being attacked
    }
}

// Player's heal action
function playerHeal() {
    if (isPlayerTurn && playerMana >= 10) {
        const healAmount = 20;
        playerHealth = Math.min(playerHealth + healAmount, 100); 
        playerMana -= 10;
        addMessage(`Player heals for ${healAmount} health.`);
        updateStats();
        isPlayerTurn = false;
        setTimeout(enemyTurn, 1000); // Enemy's turn after 1 second
        healPlayer(); // Visual effect for the player healing
    } else {
        addMessage(`Not enough mana!`);
    }
}

// Player's magic attack action
function playerMagic() {
    if (isPlayerTurn && playerMana >= 15) {
        const damage = 15;
        enemyHealth -= damage;
        playerMana -= 15;
        addMessage(`Player uses Magic for ${damage} damage.`);
        updateStats();
        checkGameOver(); // Check if the game is over after the attack
        isPlayerTurn = false;
        if (enemyHealth > 0) {
            setTimeout(enemyTurn, 1000); // Enemy's turn after 1 second
        }
    } else {
        addMessage(`Not enough mana!`);
    }
}

// Player's special skill attack action
function playerSpecialSkill() {
    if (isPlayerTurn && playerMana >= 20) {
        const damage = Math.random() > 0.1 ? 25 : 50; // 90% chance to deal 25 damage, 10% chance to deal 50 damage
        enemyHealth -= damage;
        playerMana -= 20;
        addMessage(`Player uses Special Skill for ${damage} damage.`);
        updateStats();
        checkGameOver(); // Check if the game is over after the attack
        isPlayerTurn = false;
        if (enemyHealth > 0) {
            setTimeout(enemyTurn, 1000); // Enemy's turn after 1 second
        }
    } else {
        addMessage(`Not enough mana!`);
    }
}

// Player's potion use action
function playerUsePotion() {
    if (isPlayerTurn && playerPotions > 0) {
        const healAmount = 30;
        playerHealth = Math.min(playerHealth + healAmount, 100);
        playerPotions -= 1;
        addMessage(`Player uses a potion to heal ${healAmount} health.`);
        updateStats();
        isPlayerTurn = false;
        setTimeout(enemyTurn, 1000); // Enemy's turn after 1 second
    } else if (playerPotions === 0) {
        addMessage(`No potions left!`);
    }
}

// Enemy's turn action
function enemyTurn() {
    if (enemyHealth > 0) {
        const action = Math.random() > 0.5 ? 'attack'        : 'heal';
        let damage;

        switch (difficulty) {
            case 'easy':
                damage = Math.floor(Math.random() * 5) + 3; // Range: 3-7
                break;
            case 'normal':
                damage = Math.floor(Math.random() * 6) + 5; // Range: 5-10
                break;
            case 'hard':
                damage = Math.floor(Math.random() * 7) + 8; // Range: 8-14
                break;
            default:
                damage = 8; // Default damage if difficulty is not set
        }

        if (action === 'attack') {
            playerHealth -= damage;
            addMessage(`Enemy attacks Player for ${damage} damage.`);
        } else {
            const healAmount = 10;
            enemyHealth += healAmount;
            addMessage(`Enemy heals for ${healAmount} health.`);
        }

        updateStats();
        checkGameOver(); // Check if the game is over after the enemy's turn
        isPlayerTurn = true; // Switch back to player's turn
    }
}

// Check if the game is over (either player or enemy health reaches 0 or below)
function checkGameOver() {
    if (enemyHealth <= 0 || playerHealth <= 0) {
        const gameOverOverlay = document.getElementById('gameOverOverlay');
        const gameOverImage = document.getElementById('gameOverImage');
        const message = document.getElementById('gameOverMessage');

        if (playerHealth <= 0) {
            message.textContent = 'Game Over';
            gameOverImage.src = 'images/game-over.png';
        } else {
            message.textContent = 'You Win';
            gameOverImage.src = 'images/you-win.png';
        }

        gameOverOverlay.classList.add('active');
        disableButtons(); // Disable all buttons when the game is over
    }
}

// Disable all action buttons
function disableButtons() {
    document.getElementById('attackButton').disabled = true;
    document.getElementById('healButton').disabled = true;
    document.getElementById('magicButton').disabled = true;
    document.getElementById('itemButton').disabled = true;
    document.getElementById('specialSkillButton').disabled = true;
}

// Visual effect for enemy being attacked
function flashEnemy() {
    const enemyPortrait = document.querySelector('.enemySection .characterPortrait');
    enemyPortrait.classList.add('flashEffect');
    setTimeout(() => {
        enemyPortrait.classList.remove('flashEffect');
    }, 500);
}

// Visual effect for player healing
function healPlayer() {
    const playerPortrait = document.querySelector('.playerSection .characterPortrait');
    playerPortrait.classList.add('healEffect');
    setTimeout(() => {
        playerPortrait.classList.remove('healEffect');
    }, 1000);
}

// Start a new game with initial settings
function startGame() {
    playerHealth = 100;
    playerMana = 50;
    playerPotions = 2;
    isPlayerTurn = true;

    switch (difficulty) {
        case 'easy':
            enemyHealth = 100;
            break;
        case 'normal':
            enemyHealth = 150;
            break;
        case 'hard':
            enemyHealth = 200;
            break;
    }

    clearMessages();
    updateStats();
    enableButtons();
    addMessage(`The battle begins on ${difficulty} difficulty!`);
}

// Set the game difficulty and restart the game
function setDifficulty(diff) {
    difficulty = diff;
    startGame(); // Restart the game with the new difficulty
}

// Event listeners for buttons and difficulty settings
document.getElementById('attackButton').addEventListener('click', playerAttack);
document.getElementById('healButton').addEventListener('click', playerHeal);
document.getElementById('magicButton').addEventListener('click', playerMagic);
document.getElementById('itemButton').addEventListener('click', playerUsePotion);
document.getElementById('specialSkillButton').addEventListener('click', playerSpecialSkill);
document.getElementById('restartButton').addEventListener('click', function() {
    const gameOverOverlay = document.getElementById('gameOverOverlay');
    gameOverOverlay.classList.remove('active');
    startGame();
});
document.getElementById('easy').addEventListener('click', function() { 
    setDifficulty('easy'); });
document.getElementById('normal').addEventListener('click', function() { 
    setDifficulty('normal'); });
document.getElementById('hard').addEventListener('click', function() { 
    setDifficulty('hard'); });

document.getElementById('toggleMusicButton').addEventListener('click', () => {
    const gameMusic = document.getElementById('gameMusic');
    if (gameMusic.paused) {
        gameMusic.play();
    } else {
        gameMusic.pause();
    }
});
        
// Start the game when the page loads
startGame();
