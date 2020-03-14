var gallery,
    nav;

window.addEventListener("DOMContentLoaded", () => {
  // Setup collections
  gallery = document.querySelectorAll("div#gallery li");
  nav     = document.querySelectorAll("nav#details li");
  // Show first image
  change();
  // Add change listeners
  window.addEventListener("hashchange", change);
  window.addEventListener("keydown", handleKey);
  // Add transition
  // (prevents fade if hash already in URL)
  setTimeout(() => {
    gallery.forEach(g => g.style.transition = "opacity .1s ease");
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
  gallery.forEach(g => g.classList.remove("viewing"));
  gallery[index()].classList.add("viewing");
}

function next() {
  let nextHash = current() + 1;
  if (nextHash <= gallery.length) {
    setHash(nextHash);
  }
}

function prev() {
  let prevHash = current() - 1;
  if (prevHash > 0) {
    setHash(prevHash);
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
