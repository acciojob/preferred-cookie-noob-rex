// Utility function to set a cookie
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Utility function to get a cookie value by name
function getCookie(name) {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, val] = cookie.split("=");
    acc[key] = val;
    return acc;
  }, {});
  return cookies[name];
}

// Apply stored preferences from cookies
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty("--fontsize", `${savedFontSize}px`);
    document.getElementById("fontsize").value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty("--fontcolor", savedFontColor);
    document.getElementById("fontcolor").value = savedFontColor;
  }
}

// Handle the form submission
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload

  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Update CSS variables
  document.documentElement.style.setProperty("--fontsize", `${fontSize}px`);
  document.documentElement.style.setProperty("--fontcolor", fontColor);

  // Save preferences in cookies
  setCookie("fontsize", fontSize, 365);
  setCookie("fontcolor", fontColor, 365);

  alert("Preferences saved!"); // Notify the user
});

// Apply preferences on page load
document.addEventListener("DOMContentLoaded", applyPreferences);
