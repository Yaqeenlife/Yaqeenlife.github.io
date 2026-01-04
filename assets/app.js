const main = document.getElementById("app-main");
const buttons = document.querySelectorAll(".bottom-nav button");

/* ===============================
   LOAD PAGE
================================ */
function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      main.innerHTML = html;

      // Active nav state
      buttons.forEach(btn => btn.classList.remove("active"));
      document
        .querySelector(`[data-page="${page}"]`)
        .classList.add("active");

      // 🔥 Re-bind page-specific JS
      initThemeToggle();
    });
}

/* ===============================
   THEME TOGGLE (SAFE)
================================ */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme");

    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);

    localStorage.setItem("theme", nextTheme);
  });
}

/* ===============================
   INITIAL LOAD
================================ */
loadPage("home");

/* ===============================
   NAV CLICK
================================ */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    loadPage(btn.dataset.page);
  });
});

/* ===============================
   LOAD SAVED THEME (GLOBAL)
================================ */
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}
