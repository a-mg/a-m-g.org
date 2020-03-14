var gallery;
var nav;

function setup() {
  gallery = document.getElementById("gallery");
  nav     = document.querySelectorAll("nav#details li");
  window.addEventListener("hashchange", change);
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
  gallery.style.top = "-" + (index * 100) + "vh";
}



window.addEventListener("DOMContentLoaded", setup);
