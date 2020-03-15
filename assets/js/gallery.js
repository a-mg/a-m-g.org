// Setup DOM references
const GALLERY = document.querySelector("div#gallery"),
      IMAGES  = document.querySelectorAll("div#gallery li"),
      NAV     = document.querySelectorAll("nav#details li");

window.addEventListener("DOMContentLoaded", () => {
  // Show first image
  change();
  // Add change listeners
  window.addEventListener("hashchange", change);
  window.addEventListener("keydown", handleKey);
  // Add transition
  // (prevents fade if hash already in URL)
  setTimeout(() => {
    IMAGES.forEach(i => i.style.transition = "opacity .25s ease");
  }, 200);
});

function change() {
  let index = current() - 1;
  // Change navigation
  NAV.forEach(n => n.classList.remove("viewing"));
  NAV[index].classList.add("viewing");
  // Change image
  IMAGES.forEach(i => i.classList.remove("viewing"));
  IMAGES[index].classList.add("viewing");
}



// Utilities

function current() {
  return (window.location.hash != "")
    ? Number(window.location.hash.replace("#", ""))
    : 1;
}

function setHash(h) {
  window.location.hash = "#" + ("00" + h).slice(-2);
}

function handleKey(e) {
  let actions = {
    '39': nextImage,   // right
    '37': prevImage,   // left
    '40': nextProject, // down
    '38': prevProject  // up
  }
  if (key = (e || window.event).keyCode) {
    actions[key]();
  }
}



// Navigation

function nextImage() {
  let nextHash = current() + 1;
  if (nextHash <= IMAGES.length) {
    setHash(nextHash);
  }
}

function prevImage() {
  let prevHash = current() - 1;
  if (prevHash > 0) {
    setHash(prevHash);
  }
}

function nextProject() {
 if (GALLERY.dataset.next != "") {
    location.replace(GALLERY.dataset.next);
  }
}

function prevProject() {
 if (GALLERY.dataset.prev != "") {
    location.replace(GALLERY.dataset.prev);
  }
}
