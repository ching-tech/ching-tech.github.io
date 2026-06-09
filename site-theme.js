(function () {
  var key = "chingtech-site-theme";
  var root = document.documentElement;

  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function currentTheme() {
    var saved = localStorage.getItem(key);
    return saved === "light" || saved === "dark" ? saved : systemTheme();
  }

  function icon(theme) {
    if (theme === "light") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 7.8A9 9 0 1 1 12 3Z"/></svg>';
  }

  function apply(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.innerHTML = icon(theme);
      button.setAttribute("aria-label", theme === "light" ? "切換為暗色模式" : "切換為淺色模式");
      button.setAttribute("title", theme === "light" ? "切換為暗色模式" : "切換為淺色模式");
    });
  }

  apply(currentTheme());

  function mountToggle() {
    if (document.querySelector(".theme-toggle")) {
      apply(currentTheme());
      return;
    }

    var button = document.createElement("button");
    button.className = "theme-toggle";
    button.type = "button";
    button.addEventListener("click", function () {
      var next = root.dataset.theme === "light" ? "dark" : "light";
      localStorage.setItem(key, next);
      apply(next);
    });

    var navToggle = document.querySelector(".nav-toggle");
    var navContainer = document.querySelector("nav .container") || document.querySelector("nav");
    if (navToggle && navToggle.parentNode) {
      navToggle.parentNode.insertBefore(button, navToggle);
    } else if (navContainer) {
      navContainer.appendChild(button);
    } else {
      button.style.position = "fixed";
      button.style.right = "16px";
      button.style.top = "16px";
      button.style.zIndex = "200";
      document.body.appendChild(button);
    }

    apply(currentTheme());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountToggle);
  } else {
    mountToggle();
  }
})();
