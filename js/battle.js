let playerHealth = 100;
let playerMana = 50;
let enemyHealth = 80;
let playerPotions = 2;
let isPlayerTurn = true;
let difficulty = 'normal';

function updateStats() {
    document.getElementById('player-health').textContent = Math.max(playerHealth, 0);
    document.getElementById('player-mana').textContent = Math.max(playerMana, 0);
    document.getElementById('enemy-health').textContent = Math.max(enemyHealth, 0);
    document.getElementById('player-potions').textContent = playerPotions;
}

function addMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function clearMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
}

function enableButtons() {
    document.getElementById('attack-button').disabled = false;
    document.getElementById('heal-button').disabled = false;
    document.getElementById('magic-button').disabled = false;
    document.getElementById('item-button').disabled = false;
    document.getElementById('special-skill-button').disabled = false;
}

function playerAttack() {
    if (isPlayerTurn) {
        const damage = 10;
        enemyHealth -= damage;
        addMessage(`Player attacks Enemy for ${damage} damage.`);
        updateStats();
        checkGameOver();
        isPlayerTurn = false;
        if (enemyHealth > 0) {
            setTimeout(enemyTurn, 1000);
        }
        flashEnemy(); 
    }
}

function playerHeal() {
    if (isPlayerTurn && playerMana >= 10) {
        const healAmount = 20;
        playerHealth = Math.min(playerHealth + healAmount, 100); // Cap player health at 100
        playerMana -= 10;
        addMessage(`Player heals for ${healAmount} health.`);
        updateStats();
        isPlayerTurn = false;
        setTimeout(enemyTurn, 1000);
        healPlayer(); // Trigger visual effect
    } else {
        addMessage(`Not enough mana!`);
    }
}


function playerMagic() {
    if (isPlayerTurn && playerMana >= 15) {
        const damage = 15;
        enemyHealth -= damage;
        playerMana -= 15;
        addMessage(`Player uses Magic for ${damage} damage.`);
        updateStats();
        checkGameOver();
        isPlayerTurn = false;
        if (enemyHealth > 0) {
            setTimeout(enemyTurn, 1000);
        }
    } else {
        addMessage(`Not enough mana!`);
    }
}

function playerSpecialSkill() {
    if (isPlayerTurn && playerMana >= 20) {
        const damage = Math.random() > 0.1 ? 25 : 50;
        enemyHealth -= damage;
        playerMana -= 20;
        addMessage(`Player uses Special Skill for ${damage} damage.`);
        updateStats();
        checkGameOver();
        isPlayerTurn = false;
        if (enemyHealth > 0) {
            setTimeout(enemyTurn, 1000);
        }
    } else {
        addMessage(`Not enough mana!`);
    }
}

function playerUsePotion() {
    if (isPlayerTurn && playerPotions > 0) {
        const healAmount = 30;
        playerHealth = Math.min(playerHealth + healAmount, 100); // Cap player health at 100
        playerPotions -= 1;
        addMessage(`Player uses a potion to heal ${healAmount} health.`);
        updateStats();
        isPlayerTurn = false;
        setTimeout(enemyTurn, 1000);
    } else if (playerPotions === 0) {
        addMessage(`No potions left!`);
    }
}


function enemyTurn() {
    if (enemyHealth > 0) {
        const action = Math.random() > 0.5 ? 'attack' : 'heal';
        let damage; // Declare a variable to hold the damage value

        // Set the damage range based on the difficulty level
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
                damage = 8; // Default value if difficulty is not set
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
        checkGameOver();
        isPlayerTurn = true;
    }
}


function checkGameOver() {
    if (enemyHealth <= 0 || playerHealth <= 0) {
        const gameOverOverlay = document.getElementById('game-over-overlay');
        const gameOverImage = document.getElementById('game-over-image');
        const message = document.getElementById('game-over-message');

        if (playerHealth <= 0) {
            message.textContent = 'Game Over';
            gameOverImage.src = 'images/game-over.png';
        } else {
            message.textContent = 'You Win!';
            gameOverImage.src = 'images/you-win.png';
        }

        gameOverOverlay.classList.add('active');
        disableButtons();
    }
}


document.getElementById('restart-button').addEventListener('click', () => {
    const gameOverOverlay = document.getElementById('game-over-overlay');
    gameOverOverlay.classList.remove('active');
    startGame();
});


function disableButtons() {
    document.getElementById('attack-button').disabled = true;
    document.getElementById('heal-button').disabled = true;
    document.getElementById('magic-button').disabled = true;
    document.getElementById('item-button').disabled = true;
    document.getElementById('special-skill-button').disabled = true;
}

function flashEnemy() {
    const enemyPortrait = document.querySelector('.enemy-section .character-portrait');
    enemyPortrait.classList.add('flash-effect');
    setTimeout(() => {
        enemyPortrait.classList.remove('flash-effect');
    }, 500);
}

function healPlayer() {
    const playerPortrait = document.querySelector('.player-section .character-portrait');
    playerPortrait.classList.add('heal-effect');
    setTimeout(() => {
        playerPortrait.classList.remove('heal-effect');
    }, 1000);
}

function startGame() {
    playerHealth = 100;
    playerMana = 50;
    playerPotions = 2;
    isPlayerTurn = true;

    // Set enemy health based on difficulty
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


document.getElementById('easy').addEventListener('click', function() {
    setDifficulty('easy');
});

document.getElementById('normal').addEventListener('click', function() {
    setDifficulty('normal');
});

document.getElementById('hard').addEventListener('click', function() {
    setDifficulty('hard');
});

function setDifficulty(diff) {
    difficulty = diff;
    startGame(); // Restart the game with the new difficulty
}


document.getElementById('attack-button').addEventListener('click', playerAttack);
document.getElementById('heal-button').addEventListener('click', playerHeal);
document.getElementById('magic-button').addEventListener('click', playerMagic);
document.getElementById('item-button').addEventListener('click', playerUsePotion);
document.getElementById('special-skill-button').addEventListener('click', playerSpecialSkill);

startGame();


