(function () {
  "use strict";

  var dialog = document.querySelector("#lightbox");
  var media = document.querySelector(".lightbox-media");
  var slideshowButton = document.querySelector("#slideshow-button");
  if (!dialog || !media || !slideshowButton) return;

  var timer = null;

  function schedule() {
    window.clearTimeout(timer);
    if (!dialog.open || !slideshowButton.classList.contains("is-playing")) return;
    timer = window.setTimeout(showWord, 8000 + Math.random() * 4000);
  }

  function showWord() {
    if (!dialog.open || !slideshowButton.classList.contains("is-playing")) return;
    var old = media.querySelector(".magic-word-layer");
    if (old) old.remove();

    var layer = document.createElement("div");
    layer.className = "magic-word-layer";
    layer.style.setProperty("--magic-top", (12 + Math.random() * 34).toFixed(1) + "%");
    layer.style.setProperty("--magic-duration", (5.2 + Math.random() * 1.4).toFixed(2) + "s");
    layer.innerHTML = "MOMENTA VITA".split("").map(function (letter, index) {
      return '<span style="--magic-delay:' + (index * 65) + 'ms">' + (letter === " " ? "&nbsp;" : letter) + "</span>";
    }).join("");
    media.appendChild(layer);
    layer.addEventListener("animationend", function () {
      layer.remove();
      schedule();
    }, { once: true });
  }

  new MutationObserver(function () {
    if (slideshowButton.classList.contains("is-playing")) schedule();
    else {
      window.clearTimeout(timer);
      var current = media.querySelector(".magic-word-layer");
      if (current) current.remove();
    }
  }).observe(slideshowButton, { attributes: true, attributeFilter: ["class"] });

  new MutationObserver(function () {
    if (!dialog.open) {
      window.clearTimeout(timer);
      var current = media.querySelector(".magic-word-layer");
      if (current) current.remove();
    }
  }).observe(dialog, { attributes: true, attributeFilter: ["open"] });
})();

