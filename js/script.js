/**
 * Full-Stack Fetch Sandbox Core Script
 */

// --- GLOBAL DEVELOPMENT SETTINGS ---
// Modes available: "console" (quiet logging) or "screen" (renders error box in UI)
const ERROR_MODE = "screen"; 

document.getElementById("fetchData").addEventListener("click", getRandomQuote);

function getRandomQuote() {
  clearDisplayErrors();

  fetch("server.php")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status}`);
      }
      return res.text();
    })
    .then((data) => {
      // Dump raw unstyled text straight into the container
     
      const quoteContainer = document.getElementById("result");
      quoteContainer.innerHTML = data;
      
      //document.getElementById("result").innerHTML = data;
      
       // --- TRANSITION CONTROLLER ---
      // Remove the class, force a browser reflow trick, then re-add the class
      quoteContainer.classList.remove("fade-in");
      void quoteContainer.offsetWidth; 
      quoteContainer.classList.add("fade-in");

      
    })
    .catch((err) => {
      handleRoutingError(err);
    });
}

// --- AUTOMATION ENGINE ---
// 1. Run the function immediately when the DOM layout is loaded stable
document.addEventListener("DOMContentLoaded", () => {
    getRandomQuote(); 
    
    // 2. Set an infinite recurring timer loop (5000ms = 5 seconds)
    setInterval(getRandomQuote, 5000);
});


function handleRoutingError(error) {
  const errorMessage = `⚠️ FETCH FAILURE DETAILS:\n-------------------------\nMessage: ${error.message}\nType: ${error.name}`;
  
  if (ERROR_MODE === "screen") {
    const errorBox = document.getElementById("error-display");
    errorBox.textContent = errorMessage;
    errorBox.style.display = "block";
  } else {
    console.error("❌ AJAX Routing Error:", error);
  }
}

/**
 * Resets the visual layout state before firing a clean request
 */
function clearDisplayErrors() {
  const errorBox = document.getElementById("error-display");
  errorBox.textContent = "";
  errorBox.style.display = "none";
}
