const main = document.getElementById("app-main");
const buttons = document.querySelectorAll(".bottom-nav button");

function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      main.innerHTML = html;

      buttons.forEach(btn => btn.classList.remove("active"));
      document.querySelector(`[data-page="${page}"]`)
        .classList.add("active");
    });
}

// Load home by default
loadPage("home");

// Handle nav click
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    loadPage(btn.dataset.page);
  });
});
