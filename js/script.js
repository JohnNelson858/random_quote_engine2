/**
 * Random Quote Engine
 */

// --- GLOBAL DEVELOPMENT SETTINGS ---
const ERROR_MODE = "screen";

// Typography rotation configuration
const fonts = [
  "Qwitcher Grypen",
  "Tulpen One",
  "Shadows Into Light"
];

var rotating = 0;

// Button-triggered fetch
document.getElementById("fetchData").addEventListener("click", getRandomQuote);

/**
 * Fetches a random quote from the PHP server
 */
function getRandomQuote() {

  clearDisplayErrors();

  // Cache-busting timestamp added
  fetch("https://newmanix.com/classes/it102/random_quotes.php?_=" + new Date().getTime())

    .then((res) => {

      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status} (${res.statusText || 'Unknown State'})`);
      }

      return res.text();
    })

    .then((data) => {

      const quoteContainer = document.getElementById("result");

      // Insert quote text
      quoteContainer.innerHTML = data;

      // Typography rotation
      quoteContainer.style.fontFamily = fonts[rotating];

      rotating = (rotating + 1) % fonts.length;

      // Restart animation
      quoteContainer.classList.remove("fade-in");

      // Force browser reflow
      void quoteContainer.offsetWidth;

      quoteContainer.classList.add("fade-in");
    })

    .catch((err) => {
      handleRoutingError(err);
    });
}

/**
 * Error handling dispatcher
 */
function handleRoutingError(error) {

  const errorMessage =
`⚠️ FETCH FAILURE DETAILS:
-------------------------
Message: ${error.message}
Type: ${error.name}`;

  if (ERROR_MODE === "screen") {

    const errorBox = document.getElementById("error-display");

    errorBox.textContent = errorMessage;

    errorBox.style.display = "block";

  } else {

    console.error("❌ AJAX Routing Error:", error);
  }
}

/**
 * Clears visible error display
 */
function clearDisplayErrors() {

  const errorBox = document.getElementById("error-display");

  errorBox.textContent = "";

  errorBox.style.display = "none";
}

// --- AUTOMATION ENGINE ---

document.addEventListener("DOMContentLoaded", () => {

  // Initial quote on page load
  getRandomQuote();

  // Auto-refresh every 5 seconds
  setInterval(getRandomQuote, 5000);

});
