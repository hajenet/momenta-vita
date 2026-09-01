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
    layer.style.setProperty("--dragonfly-distance", random(260, 600) + "px");
    layer.style.setProperty("--dragonfly-size", (random(72, 118) / 100).toFixed(2));
    layer.style.setProperty("--dragonfly-tilt", random(-12, 12) + "deg");
    layer.innerHTML = '<svg viewBox="0 0 220 140" aria-hidden="true" focusable="false"><g class="dragonfly"><path class="dragonfly-wing wing-a" d="M108 67 26 35Q20 33 27 42l79 32Z"/><path class="dragonfly-wing wing-b" d="m112 67 82-32q6-2-1 7l-79 32Z"/><path class="dragonfly-wing wing-c" d="m107 74-73 37q-6 4 2 5l76-37Z"/><path class="dragonfly-wing wing-d" d="m113 74 73 37q6 4-2 5l-76-37Z"/><path class="dragonfly-vein" d="M105 71 34 40M115 71l71-31M108 77l-66 34M112 77l66 34"/><path class="dragonfly-leg" d="M111 73 77 91M115 74l35 18M109 70 80 61M117 70l29-9"/><path class="dragonfly-tail" d="M112 70C91 68 67 70 39 77"/><path class="dragonfly-body" d="M99 70c20-5 49-5 76 0-27 5-56 5-76 0Z"/><path class="dragonfly-segment" d="M55 74l-4 5M66 72l-3 6M78 70l-2 6M90 69l-1 6"/><circle class="dragonfly-head" cx="181" cy="70" r="10"/><circle class="dragonfly-eye" cx="185" cy="66" r="3"/><circle class="dragonfly-eye" cx="185" cy="74" r="3"/></g></svg>';
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
    flyTimer = window.setTimeout(createDragonfly, random(5000, 8000));
  }

  function observe() {
    window.clearTimeout(timer);
    if (!dialog.open) return;
    if (!dialog.open || !slideshowButton || !slideshowButton.classList.contains("is-playing")) return;
    window.clearTimeout(flyTimer);
    flyTimer = window.setTimeout(createDragonfly, random(5000, 8000));
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
