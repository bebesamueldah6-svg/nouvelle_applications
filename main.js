(function () {
  document.documentElement.classList.add("js");

  // Placeholder images: if one fails to load, hide it so the earthy
  // gradient behind it shows instead of a broken-image icon.
  document.querySelectorAll("img").forEach(function (img) {
    function hide() { img.style.visibility = "hidden"; }
    if (img.complete && img.naturalWidth === 0 && img.src) hide();
    img.addEventListener("error", hide);
  });

  // Nav: solid background once scrolled past the top
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function setMenu(open) {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Gallery lightbox
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var lbCap = document.getElementById("lightboxCap");
  var lbClose = document.getElementById("lightboxClose");
  var lastFocus = null;

  function openLightbox(tile) {
    var img = tile.querySelector("img");
    lastFocus = tile;
    lbImg.src = img.src.replace(/w=\d+/, "w=1800");
    lbImg.alt = img.alt;
    lbCap.textContent = tile.querySelector("figcaption").textContent;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lbImg.removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".tile").forEach(function (tile) {
    tile.tabIndex = 0;
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", "Voir l’image : " + tile.querySelector("figcaption").textContent);
    tile.addEventListener("click", function () { openLightbox(tile); });
    tile.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(tile); }
    });
  });
  lbClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  // Signup form (front-end only — wire to a real endpoint later)
  var form = document.getElementById("signupForm");
  var note = document.getElementById("signupNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll("input[required]").forEach(function (input) {
      var ok = input.checkValidity() && input.value.trim() !== "";
      input.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      note.classList.remove("is-success");
      note.textContent = "Merci d’indiquer votre nom et une adresse e-mail valide.";
      return;
    }
    var name = form.elements.name.value.trim().split(" ")[0];
    note.classList.add("is-success");
    note.textContent = "Bienvenue dans la tribu, " + name + " ! Nous vous enverrons un horaire de séance par e-mail sous 24 h.";
    form.reset();
  });
})();
