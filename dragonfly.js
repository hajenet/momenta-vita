(function () {
  "use strict";

  var media = document.querySelector(".lightbox-media");
  var dialog = document.querySelector("#lightbox");
  var image = document.querySelector("#lightbox-image");
  if (!media || !dialog || !image) return;

  var timer = null;
  var flyTimer = null;

  function random(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  function createDragonfly() {
    if (!dialog.open) return;
    var old = media.querySelector(".dragonfly-layer");
    if (old) old.remove();

    var layer = document.createElement("div");
    layer.className = "dragonfly-layer";
    layer.style.setProperty("--dragonfly-top", random(12, 76) + "%");
    layer.style.setProperty("--dragonfly-start", random(-18, 8) + "%");
    layer.style.setProperty("--dragonfly-end", random(104, 122) + "%");
    layer.style.setProperty("--dragonfly-size", (random(72, 118) / 100).toFixed(2));
    layer.style.setProperty("--dragonfly-tilt", random(-12, 12) + "deg");
    layer.innerHTML = '<svg viewBox="0 0 160 100" aria-hidden="true" focusable="false"><g class="dragonfly-body"><ellipse class="dragonfly-wing wing-a" cx="62" cy="39" rx="50" ry="16" transform="rotate(-23 62 39)"/><ellipse class="dragonfly-wing wing-b" cx="98" cy="39" rx="50" ry="16" transform="rotate(23 98 39)"/><ellipse class="dragonfly-wing wing-c" cx="62" cy="61" rx="42" ry="12" transform="rotate(22 62 61)"/><ellipse class="dragonfly-wing wing-d" cx="98" cy="61" rx="42" ry="12" transform="rotate(-22 98 61)"/><path class="dragonfly-core" d="M48 50 C70 45 91 45 116 50 C91 55 70 55 48 50Z"/><circle class="dragonfly-head" cx="43" cy="50" r="7"/></g></svg>';
    media.appendChild(layer);
    layer.addEventListener("animationend", function () {
      layer.remove();
      schedule();
    }, { once: true });
  }

  function schedule() {
    window.clearTimeout(flyTimer);
    if (!dialog.open) return;
    flyTimer = window.setTimeout(createDragonfly, random(3200, 7600));
  }

  function observe() {
    window.clearTimeout(timer);
    if (!dialog.open) return;
    timer = window.setTimeout(createDragonfly, random(1800, 3600));
  }

  new MutationObserver(function () {
    if (dialog.open) observe();
    else {
      window.clearTimeout(timer);
      window.clearTimeout(flyTimer);
      var current = media.querySelector(".dragonfly-layer");
      if (current) current.remove();
    }
  }).observe(dialog, { attributes: true, attributeFilter: ["open"] });

  new MutationObserver(function () {
    if (dialog.open) observe();
  }).observe(image, { attributes: true, attributeFilter: ["src"] });
})();

