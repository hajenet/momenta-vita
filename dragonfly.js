(function () {
  "use strict";

  var media = document.querySelector(".lightbox-media");
  var dialog = document.querySelector("#lightbox");
  var image = document.querySelector("#lightbox-image");
  if (!media || !dialog || !image) return;

  var timer = null;
  var flyTimer = null;
  var slideshowButton = document.querySelector("#slideshow-button");

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
    layer.innerHTML = '<svg viewBox="0 0 220 140" aria-hidden="true" focusable="false"><g class="dragonfly"><path class="dragonfly-wing wing-a" d="M108 65C83 23 41 8 9 24c24 31 61 47 101 48Z"/><path class="dragonfly-wing wing-b" d="M112 65c25-42 67-57 99-41-24 31-61 47-101 48Z"/><path class="dragonfly-wing wing-c" d="M108 75c-35 4-67 24-86 54 36 0 70-19 91-47Z"/><path class="dragonfly-wing wing-d" d="M112 75c35 4 67 24 86 54-36 0-70-19-91-47Z"/><path class="dragonfly-leg" d="M111 73 77 91M115 74l35 18M109 70 80 61M117 70l29-9"/><path class="dragonfly-tail" d="M112 70C91 68 67 70 39 77"/><path class="dragonfly-body" d="M99 70c20-5 49-5 76 0-27 5-56 5-76 0Z"/><path class="dragonfly-segment" d="M55 74l-4 5M66 72l-3 6M78 70l-2 6M90 69l-1 6"/><circle class="dragonfly-head" cx="181" cy="70" r="10"/><circle class="dragonfly-eye" cx="185" cy="66" r="3"/><circle class="dragonfly-eye" cx="185" cy="74" r="3"/></g></svg>';
    media.appendChild(layer);
    layer.addEventListener("animationend", function () {
      layer.remove();
      schedule();
    }, { once: true });
  }

  function schedule() {
    window.clearTimeout(flyTimer);
    if (!dialog.open) return;
    if (!dialog.open || !slideshowButton || !slideshowButton.classList.contains("is-playing")) return;
    flyTimer = window.setTimeout(createDragonfly, random(7000, 10000));
  }

  function observe() {
    window.clearTimeout(timer);
    if (!dialog.open) return;
    if (!dialog.open || !slideshowButton || !slideshowButton.classList.contains("is-playing")) return;
    window.clearTimeout(flyTimer);
    flyTimer = window.setTimeout(createDragonfly, random(7000, 10000));
  }

  new MutationObserver(function () {
    if (dialog.open && slideshowButton && slideshowButton.classList.contains("is-playing")) observe();
    else {
      window.clearTimeout(timer);
      window.clearTimeout(flyTimer);
      var current = media.querySelector(".dragonfly-layer");
      if (current) current.remove();
    }
  }).observe(dialog, { attributes: true, attributeFilter: ["open"] });

  if (slideshowButton) {
    new MutationObserver(function () {
      if (slideshowButton.classList.contains("is-playing")) observe();
      else {
        window.clearTimeout(timer);
        window.clearTimeout(flyTimer);
        var current = media.querySelector(".dragonfly-layer");
        if (current) current.remove();
      }
    }).observe(slideshowButton, { attributes: true, attributeFilter: ["class"] });
  }

  new MutationObserver(function () {
    if (dialog.open && slideshowButton && slideshowButton.classList.contains("is-playing")) observe();
  }).observe(image, { attributes: true, attributeFilter: ["src"] });
})();
