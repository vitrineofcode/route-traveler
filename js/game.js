let playerHealth = 100;
let playerMana = 50;
let enemyHealth = 80;
let playerPotions = 2;
let isPlayerTurn = true;
let difficulty = 'easy';

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
        flashEnemy(); // Trigger visual effect
    }
}

function playerHeal() {
    if (isPlayerTurn && playerMana >= 10) {
        const healAmount = 20;
        playerHealth += healAmount;
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
        playerHealth += healAmount;
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
        if (action === 'attack') {
            const damage = 8;
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
    if (enemyHealth <= 0) {
        addMessage('Enemy is defeated! You win!');
        disableButtons();
    } else if (playerHealth <= 0) {
        addMessage('You are defeated! Game over!');
        disableButtons();
    }
}

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
    enemyHealth = difficulty === 'hard' ? 120 : 80;
    playerPotions = 2;
    isPlayerTurn = true;
    clearMessages();
    updateStats();
    enableButtons();
    addMessage(`The battle begins on ${difficulty} difficulty!`);
}

document.getElementById('attack-button').addEventListener('click', playerAttack);
document.getElementById('heal-button').addEventListener('click', playerHeal);
document.getElementById('magic-button').addEventListener('click', playerMagic);
document.getElementById('item-button').addEventListener('click', playerUsePotion);
document.getElementById('special-skill-button').addEventListener('click', playerSpecialSkill);

startGame();


