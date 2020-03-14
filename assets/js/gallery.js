var gallery;
var nav;

function setup() {
  // Setup collections
  gallery = document.querySelectorAll("div#gallery li");
  nav     = document.querySelectorAll("nav#details li");
  // Show first image
  change();
  // Add change listeners
  window.addEventListener("hashchange", change);
  // Add transition
  // (prevents fade if hash already in URL)
  setTimeout(() => {
    gallery.forEach(g => g.style.transition = "opacity .1s ease");
  }, 0);
}

function change() {
  // Get index
  index = (window.location.hash != "")
          ? (Number(window.location.hash.replace("#", "")) - 1)
          : 0;
  // Change navigation
  nav.forEach(n => n.classList.remove("viewing"));
  nav[index].classList.add("viewing");
  // Change image
  gallery.forEach(g => g.classList.remove("viewing"));
  gallery[index].classList.add("viewing");
}

window.addEventListener("DOMContentLoaded", setup);
