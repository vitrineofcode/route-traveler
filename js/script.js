let enemyHealth = 100;
let playerHealth = 100;

function updateHealthBar(healthBarId, currentHealth) {
    const healthBar = document.getElementById(healthBarId);
    const healthPercentage = Math.max(currentHealth, 0) + '%';
    healthBar.style.width = healthPercentage;
}

function getRandomDamage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enemyAttack() {
    const damage = getRandomDamage(5, 15);
    playerHealth -= damage;
    updateHealthBar('player-health-bar', playerHealth);

    if (playerHealth <= 0) {
        displayMessage('You have been defeated!');
        playerHealth = 0;
    }
}

function displayMessage(message) {
    const messageArea = document.getElementById('game-message');
    messageArea.textContent = message;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('attack-button').addEventListener('click', () => {
        const damage = getRandomDamage(5, 15);
        enemyHealth -= damage;
        updateHealthBar('enemy-health-bar', enemyHealth);

        if (enemyHealth <= 0) {
            displayMessage('Enemy defeated!');
            enemyHealth = 0;
        } else {
            setTimeout(() => {
                enemyAttack();
            }, 1000);
        }
    });

    updateHealthBar('player-health-bar', 100);
    updateHealthBar('enemy-health-bar', 100);
});
