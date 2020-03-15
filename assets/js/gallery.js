// Setup DOM references
const GALLERY = document.querySelector("div#gallery"),
      IMAGES  = document.querySelectorAll("div#gallery li"),
      NAV     = document.querySelectorAll("nav#details li"),
      A_PREV  = document.querySelector("nav#page-images li.prev"),
      A_NEXT  = document.querySelector("nav#page-images li.next"),
      WAIT    = document.querySelector("p#waiting");

window.addEventListener("load", () => {
  // Show first image
  let first = (Number(window.location.hash.replace("#", "")) || 1) - 1;
  setTimeout(() => {
    change(first);
    WAIT.style.transition = "opacity .25s ease";
    WAIT.style.opacity = "0";
  }, 200);
  // Add event listeners
  window.addEventListener("keydown", handleKey);
  NAV.forEach((n) =>
    n.addEventListener("click", (e) =>
      change(e.target.dataset.index)));
  A_PREV.addEventListener("click", (e) =>
    change(e.target.dataset.index));
  A_NEXT.addEventListener("click", (e) =>
    change(e.target.dataset.index));
});

function change(index) {
  index = Number(index);
  // Change navigation
  NAV.forEach(n => n.classList.remove("viewing"));
  NAV[index].classList.add("viewing");
  // Change pager targets
  A_PREV.dataset.index = inRange(i = index - 1) ? i : "";
  A_NEXT.dataset.index = inRange(i = index + 1) ? i : "";
  // Change image
  IMAGES.forEach(i => i.classList.remove("viewing"));
  IMAGES[index].classList.add("viewing");
  // Change hash
  history.replaceState(null, null, hash(index + 1));
}



// Utilities

function hash(n) {
  return ("#" + ("00" + n).slice(-2));
}

function inRange(i) {
  return (i >= 0) && (i < IMAGES.length);
}

function handleKey(e) {
  let actions = {
    '39': nextImage,   // right
    '37': prevImage,   // left
    '40': nextProject, // down
    '38': prevProject  // up
  }
  if (handler = actions[(e || window.event).keyCode])
    handler();
}



// Navigation

function nextImage() {
  if (i = A_NEXT.dataset.index)
    change(i);
}

function prevImage() {
  if (i = A_PREV.dataset.index)
    change(i);
}

function nextProject() {
 if (l = GALLERY.dataset.next)
    window.location = l;
}

function prevProject() {
 if (l = GALLERY.dataset.prev)
    window.location = l;
}
