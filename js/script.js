// Set the time for the transition (in milliseconds)
let time = 5000; // 5 seconds

setTimeout(function () {
  // Fade out the page
  document.body.classList.add("hidden");

  // Wait for the fade out to finish before redirecting
  setTimeout(function () {
    window.location.href = "title-screen.html";
  }, 2000); // Match the duration of the CSS transition
}, time - 2000); // Start the fade out 2 seconds before the redirect
