// Setup DOM references
const GALLERY = document.querySelector("div#gallery"),
      IMAGES  = document.querySelectorAll("div#gallery li"),
      NAV     = document.querySelectorAll("nav#details li"),
      A_PREV  = document.querySelector("nav#page-images a.prev"),
      A_NEXT  = document.querySelector("nav#page-images a.next");

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
  let cardinal = current();
  let index    = cardinal - 1;

  // Change navigation
  NAV.forEach(n => n.classList.remove("viewing"));
  NAV[index].classList.add("viewing");

  // Change pager targets
  if (index > 0) {
    A_PREV.style.visibility = "";
    A_PREV.href = hash(cardinal - 1);
  } else {
    A_PREV.style.visibility = "hidden";
  }
  if (index < (IMAGES.length - 1)) {
    A_NEXT.style.visibility = "";
    A_NEXT.href = hash(cardinal + 1);
  } else {
    A_NEXT.style.visibility = "hidden";
  }

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

function hash(n) {
  return ("#" + ("00" + n).slice(-2));
}

function handleKey(e) {
  let actions = {
    '39': nextImage,   // right
    '37': prevImage,   // left
    '40': nextProject, // down
    '38': prevProject  // up
  }
  if (handler = actions[(e || window.event).keyCode]) {
    handler();
  }
}



// Navigation

function nextImage() {
  if ((current() + 1) <= IMAGES.length) {
    window.location.hash = hash(current() + 1);
  }
}

function prevImage() {
  if ((current() - 1) > 0) {
    window.location.hash = hash(current() - 1);
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
