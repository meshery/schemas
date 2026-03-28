(function () {
  const root = document.documentElement;
  const storageKey = "schemas-theme";
  const saved = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);
  const toggle = document.getElementById("theme-toggle");
  const nav = document.getElementById("header-links");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const dropdowns = document.querySelectorAll("[data-dropdown]");
  function updateLogo() {
    const logo = document.getElementById("meshery-logo");
    if (!logo) return;

    const theme = document.documentElement.getAttribute("data-theme");

    if (theme === "dark") {
      logo.src = logo.dataset.dark;
    } else {
      logo.src = logo.dataset.light;
    }
  }
  function updateThemeIcon() {
    const icon = document.getElementById("theme-icon");
    if (!icon) return;

    const theme = document.documentElement.getAttribute("data-theme");

    if (theme === "dark") {
      icon.src = icon.dataset.dark;
    } else {
      icon.src = icon.dataset.light;
    }
  }

  updateThemeIcon();

  updateLogo();
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(storageKey, next);
      updateThemeIcon();
      updateLogo();
    });
  }

  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      mobileToggle.classList.toggle("open", nav.classList.contains("open"));
    });
  }

  dropdowns.forEach(function (dropdown) {
    var button = dropdown.querySelector(".dropdown-toggle");
    if (!button) return;

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = dropdown.classList.contains("open");

      dropdowns.forEach(function (item) {
        item.classList.remove("open");
        var b = item.querySelector(".dropdown-toggle");
        if (b) b.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        dropdown.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest("[data-dropdown]")) {
      dropdowns.forEach(function (item) {
        item.classList.remove("open");
        var b = item.querySelector(".dropdown-toggle");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }
  });
})();