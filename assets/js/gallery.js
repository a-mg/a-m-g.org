var gallery,
    images,
    nav;

window.addEventListener("DOMContentLoaded", () => {
  // Setup collections
  gallery = document.querySelector("div#gallery");
  images  = document.querySelectorAll("div#gallery li");
  nav     = document.querySelectorAll("nav#details li");
  // Show first image
  change();
  // Add change listeners
  window.addEventListener("hashchange", change);
  window.addEventListener("keydown", handleKey);
  // Add transition
  // (prevents fade if hash already in URL)
  setTimeout(() => {
    images.forEach(i => i.style.transition = "opacity .25s ease");
  }, 200);
});

function change() {
  let index = current() - 1;
  // Change navigation
  nav.forEach(n => n.classList.remove("viewing"));
  nav[index].classList.add("viewing");
  // Change image
  images.forEach(i => i.classList.remove("viewing"));
  images[index].classList.add("viewing");
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
  if (nextHash <= images.length) {
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
 if (gallery.dataset.next != "") {
    location.replace(gallery.dataset.next);
  }
}

function prevProject() {
 if (gallery.dataset.prev != "") {
    location.replace(gallery.dataset.prev);
  }
}
