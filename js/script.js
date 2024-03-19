let aldricHealth = 100;
let varickHealth = 100;
let isPlayerTurn = true;
const statusElement = document.querySelector("p");
const music = document.getElementById("backgroundMusic");

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

function hideButtons() {
  document.getElementById("playerAttackButton").style.display = "none";
  document.getElementById("playerHealButton").style.display = "none";
}

// Function to generate a random number for attacking damage
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to simulate an attack
function playerAttack() {
  if (isPlayerTurn && aldricHealth > 0) {
    isPlayerTurn = false;
    const damage = getRandomNumber(5, 15);
    console.log(`Aldric attacks Varick for ${damage} damage!`);
    varickHealth = Math.max(0, varickHealth - damage); // Ensure health doesn't go below 0
    updateHealthBars(); // Update health bars before checking for game over
    checkGameOver();
    setTimeout(() => {
      varickAttack();
      isPlayerTurn = true;
    }, 1000);
  }
}

// Function for Varick's attack
function varickAttack() {
  if (varickHealth > 0) {
    const damage = getRandomNumber(5, 15);
    console.log(`Varick attacks Aldric for ${damage} damage!`);
    aldricHealth = Math.max(0, aldricHealth - damage); // Ensure health doesn't go below 0
    updateHealthBars(); // Update health bars before checking for game over
    checkGameOver();
  }
}

// Function to simulate healing
function playerHeal() {
  if (isPlayerTurn && aldricHealth > 0) {
    isPlayerTurn = false;
    const healAmount = getRandomNumber(5, 10);
    console.log(`Aldric heals for ${healAmount}!`);
    aldricHealth = Math.min(aldricHealth + healAmount, 100);
    updateHealthBars();
    setTimeout(() => {
      varickAttack();
      isPlayerTurn = true;
    }, 1000);
  }
}

// Function to update health bars
function updateHealthBars() {
  const playerHealthBar = document.querySelector(
    "#playerHealth .health-bar-fill"
  );
  const enemyHealthBar = document.querySelector(
    "#enemyHealth .health-bar-fill"
  );
  playerHealthBar.style.width = `${aldricHealth}%`;
  enemyHealthBar.style.width = `${varickHealth}%`;
}

// Function to check if the game is over
function checkGameOver() {
  if (varickHealth <= 0) {
    console.log("Aldric wins!");
    statusElement.textContent = "You Win!"; // Display "You Win" message
    document.getElementById("varickImg").style.opacity = "0"; // Reduce Varick's image opacity to zero
    document.getElementById("restartButton").style.display = "block";
  } else if (aldricHealth <= 0) {
    console.log("Varick wins!");
    statusElement.textContent = "You Lose!"; // Display "You Lose" message
    document.getElementById("aldricImg").style.opacity = "0"; // Reduce Aldric's image opacity to zero
    document.getElementById("restartButton").style.display = "block";
    hideButtons();
  }
}

// Function to restart the battle
function restartBattle() {
  aldricHealth = 100;
  varickHealth = 100;
  isPlayerTurn = true;
  updateHealthBars();
  document.getElementById("restartButton").style.display = "none";
  document.getElementById("playerAttackButton").style.display = "block";
  document.getElementById("playerHealButton").style.display = "block";
  document.getElementById("aldricImg").style.opacity = "1"; // Restore Aldric's image opacity
  document.getElementById("varickImg").style.opacity = "1"; // Restore Varick's image opacity
  statusElement.textContent = ""; // Clear the status message
  console.clear();
}

// Add event listeners to buttons
document
  .getElementById("playerAttackButton")
  .addEventListener("click", playerAttack);
document
  .getElementById("playerHealButton")
  .addEventListener("click", playerHeal);
document
  .getElementById("restartButton")
  .addEventListener("click", restartBattle);
