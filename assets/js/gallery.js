var gallery,
    images,
    nav;

window.addEventListener("DOMContentLoaded", () => {
  // Setup collections
  gallery = document.querySelector("#gallery");
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
    images.forEach(i => i.style.transition = "opacity .1s ease");
  }, 200);
});



function current() {
  return (window.location.hash != "")
    ? Number(window.location.hash.replace("#", ""))
    : 1;
}

function index() {
  return (current() - 1);
}

function setHash(h) {
  window.location.hash = "#" + ("00" + h).slice(-2);
}



function change() {
  // Change navigation
  nav.forEach(n => n.classList.remove("viewing"));
  nav[index()].classList.add("viewing");
  // Change image
  images.forEach(i => i.classList.remove("viewing"));
  images[index()].classList.add("viewing");
}

function next() {
  let nextHash = current() + 1;
  if (nextHash <= images.length) {
    setHash(nextHash);
  } else if (gallery.dataset.next != "") {
    location.replace(gallery.dataset.next);
  }
}

function prev() {
  let prevHash = current() - 1;
  if (prevHash > 0) {
    setHash(prevHash);
  } else if (gallery.dataset.prev != "") {
    location.replace(gallery.dataset.prev);
  }
}



function handleKey(e) {
  e = e || window.event;
  if (e.keyCode == '39') {
    // right arrow
    next();
  } else if (e.keyCode == '37') {
    // left arrow
    prev();
  }
}
