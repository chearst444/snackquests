(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && header && nav) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var chips = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll(".game-card");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");
      chips.forEach(function (item) {
        var active = item === chip;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", active ? "true" : "false");
      });
      cards.forEach(function (card) {
        var track = card.getAttribute("data-track");
        var show = filter === "all" || track === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
})();
