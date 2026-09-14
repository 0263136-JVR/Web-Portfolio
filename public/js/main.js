/* ==========================================================================
   SITE-WIDE BEHAVIOR
   Edit SITE.name / SITE.role / SITE.nav / SITE.socials to update the whole
   site from one place (header + footer are built from this object).
   ========================================================================== */

const SITE = {
  name: "Jaime Valencia",
  initials: "JV",
  role: "Mechatronical Engineer & 3D CAD Designer",
  email: "vrjaime05@gmail.com",
  linkedin: "https://www.linkedin.com/in/jaime-valencia-n11d23a05/",
  instagram: "https://www.instagram.com/your-handle",
  location: "Zapopan, Mexico",
  nav: [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Projects", href: "projects.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Resume", href: "resume.html" },
    { label: "Contact", href: "contact.html" }
  ]
};

function currentPage(){
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function renderHeader(){
  const mount = document.getElementById("site-header");
  if(!mount) return;
  const page = currentPage();
  const links = SITE.nav.map(item => {
    const current = item.href === page ? ' aria-current="page"' : '';
    return `<a href="${item.href}"${current}>${item.label}</a>`;
  }).join("");

  mount.innerHTML = `
    <header class="site-header" id="siteHeader">
      <nav class="nav">
        <a href="index.html" class="nav__mark">${SITE.name} <span>${SITE.initials}</span></a>
        <ul class="nav__links" id="navLinks" style="display:contents">${links}</ul>
        <div class="nav__cta">
          <button class="nav__toggle" id="navToggle" aria-label="Toggle menu"><span></span></button>
        </div>
      </nav>
    </header>`;

  // fix: nav__links needs to actually be the flex/collapsible element, not display:contents on desktop only
  const navLinksEl = document.getElementById("navLinks");
  navLinksEl.removeAttribute("style");
  navLinksEl.classList.add("nav__links");

  const toggle = document.getElementById("navToggle");
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("is-open");
    navLinksEl.classList.toggle("is-open");
  });

  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    header.classList.toggle("is-compact", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function renderFooter(){
  const mount = document.getElementById("site-footer");
  if(!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <h4>${SITE.name}</h4>
            <p>${SITE.role}. Designing and validating mechanical components from concept to manufacturable, simulation-tested geometry.</p>
          </div>
          <div>
            <h4>Site</h4>
            <ul>
              ${SITE.nav.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              <li><a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></li>
              <li><span>${SITE.location}</span></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${year} ${SITE.name}. All rights reserved.</span>
          <span>Built with precision.</span>
        </div>
      </div>
    </footer>`;
}

function initReveal(){
  const items = document.querySelectorAll(".reveal");
  if(!("IntersectionObserver" in window) || items.length === 0){
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ---------- Lightbox (used by gallery.html) ---------- */
function initLightbox(items){
  const lightbox = document.getElementById("lightbox");
  if(!lightbox) return;
  const frame = lightbox.querySelector(".lightbox__frame");
  const title = lightbox.querySelector("[data-lb-title]");
  const desc = lightbox.querySelector("[data-lb-desc]");
  const disc = lightbox.querySelector("[data-lb-discipline]");
  const soft = lightbox.querySelector("[data-lb-software]");

  function open(item){
    frame.innerHTML = item.art;
    title.textContent = item.title;
    desc.textContent = item.description;
    disc.textContent = item.discipline;
    soft.textContent = item.software;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function close(){
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox-index]").forEach(el => {
    el.addEventListener("click", () => {
      const idx = Number(el.getAttribute("data-lightbox-index"));
      open(items[idx]);
    });
  });
  lightbox.querySelector(".lightbox__close").addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if(e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") close(); });
}

/* ---------- Contact form (static demo — wire to a form service or Hatchable's own form handling) ---------- */
function initContactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = document.getElementById("formNote");
    note.textContent = "Thanks — this form is a static template. Connect it to Hatchable's form handling or a service like Formspree to receive real messages.";
    note.style.color = "var(--green-deep)";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initReveal();
  initContactForm();
});
