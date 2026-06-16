/* =============================================================
   HYPERDYNE — script.js
   ============================================================= */

/* -------------------------------------------------------------
   Hero rotating product image — 2.5s interval, soft crossfade,
   edges masked invisible via CSS radial mask.
   ------------------------------------------------------------- */
const PRODUCT_IMAGES = [
  "assets/products/m01_long_motor1.png",
  "assets/products/m06_bldc_hollow1.png",
  "assets/products/QRHD.png",
  "assets/products/m02_long_motor2.png",
  "assets/products/m07_bldc_hollow2.png",
  "assets/products/m08_elastic_single.png",
  "assets/products/m11_wolform_reducer2.png",
  "assets/products/RHD.png",
  "assets/products/m09_elastic2.png",
  "assets/products/m04_rotor_long1.png",
];

const orbitImages = Array.from(document.querySelectorAll(".orbit-img"));

// Preload every image so transitions are instant.
PRODUCT_IMAGES.forEach((src) => {
  const im = new Image();
  im.src = src;
});

let visibleLayer = 0;          // index in orbitImages currently shown
let activeIndex = 0;            // index in PRODUCT_IMAGES currently shown
let isTransitioning = false;

async function preload(el, src) {
  el.src = src;
  if (el.decode) { try { await el.decode(); } catch (_) {} }
}

async function rotateHero() {
  if (isTransitioning || orbitImages.length < 2) return;
  isTransitioning = true;

  const nextIndex = (activeIndex + 1) % PRODUCT_IMAGES.length;
  const nextLayer = visibleLayer === 0 ? 1 : 0;

  const incoming = orbitImages[nextLayer];
  const outgoing = orbitImages[visibleLayer];

  await preload(incoming, PRODUCT_IMAGES[nextIndex]);

  requestAnimationFrame(() => {
    incoming.classList.add("is-active");
    outgoing.classList.remove("is-active");
    visibleLayer = nextLayer;
    activeIndex = nextIndex;
    setTimeout(() => { isTransitioning = false; }, 1500);
  });
}

// 2.5s interval as requested
setInterval(rotateHero, 2500);

/* -------------------------------------------------------------
   Starfield canvas — subtle parallax twinkle
   ------------------------------------------------------------- */
(function starfield() {
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let stars = [];
  let w = 0, h = 0;
  let raf = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width  = Math.floor(window.innerWidth  * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width  = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    // density scaled to area
    const count = Math.floor((window.innerWidth * window.innerHeight) / 5200);
    stars = new Array(count).fill(0).map(() => makeStar(dpr));
  }

  function makeStar(dpr) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 0.9 + 0.15) * dpr,
      a: Math.random() * 0.6 + 0.2,
      speed: (Math.random() * 0.18 + 0.05) * dpr,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.008 + Math.random() * 0.018,
      tint: Math.random() > 0.85 ? "rgba(170,210,255," : "rgba(255,255,255,"
    };
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (let s of stars) {
      s.twinkle += s.twinkleSpeed;
      const alpha = s.a * (0.55 + 0.45 * Math.sin(s.twinkle));
      ctx.fillStyle = s.tint + alpha.toFixed(3) + ")";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      // slow drift
      s.y += s.speed;
      if (s.y > h + 4) {
        s.y = -4;
        s.x = Math.random() * w;
      }
    }
    raf = requestAnimationFrame(tick);
  }

  resize();
  tick();

  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { cancelAnimationFrame(raf); resize(); tick(); }, 150);
  });

  // pause when offscreen / tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else tick();
  });
})();

/* -------------------------------------------------------------
   Hero marquee — 13 technology items from the catalog index
   ------------------------------------------------------------- */
(function buildMarquee() {
  const inner = document.getElementById("marqueeInner");
  if (!inner) return;
  const items = [
    "QRHD · QUASI ROTARY HYPER DRIVE",
    "QLHD · QUASI LINEAR HYPER DRIVE",
    "RHD · ROTARY HYPER DRIVE",
    "LHD · LINEAR HYPER DRIVE",
    "FOUR-WHEEL INDEPENDENT ACTIVE SUSPENSION",
    "ACTIVE ROLL STABILIZER (ARS)",
    "NEXT-GEN LINEAR ACTIVE STRUT",
    "EXCAVATOR ROBOT PLATFORM",
    "FIVE-BAR LINKAGE 2-DOF HOPPING PLATFORM",
    "DYNAMOMETER TEST INFRASTRUCTURE",
    "FOUR-STAGE EVALUATION PROTOCOL",
    "QUARTER / HALF-CAR HILS TESTER",
    "ROBOTIC HILS PLATFORM",
  ];
  // duplicate the list so the -50% translate loop is seamless
  const html = items.map((t) => `<span>· ${t}</span>`).join("");
  inner.innerHTML = html + html;
})();

/* -------------------------------------------------------------
   Language toggle — default English, persisted in localStorage
   ------------------------------------------------------------- */
(function langToggle() {
  const KEY = "hd-lang";
  const buttons = Array.from(document.querySelectorAll("[data-set-lang]"));
  function apply(lang) {
    const l = lang === "ko" ? "ko" : "en";
    document.body.classList.toggle("lang-en", l === "en");
    document.body.classList.toggle("lang-ko", l === "ko");
    document.documentElement.lang = l;
    buttons.forEach((b) => b.classList.toggle("is-active", b.dataset.setLang === l));
    try { localStorage.setItem(KEY, l); } catch (_) {}
  }
  buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.setLang)));
  let saved = "en";
  try { saved = localStorage.getItem(KEY) || "en"; } catch (_) {}
  apply(saved);
})();

/* -------------------------------------------------------------
   Partner logo marquee — right-to-left, seamless loop
   ------------------------------------------------------------- */
(function buildLogoMarquee() {
  const track = document.getElementById("logoTrack");
  if (!track) return;
  // common = same logo for both languages; en/ko = language-specific variants
  const logos = [
    { common: "assets/partners/hmg.png",  name: "Hyundai Motor Group" },
    { common: "assets/partners/hmc.png",  name: "Hyundai Motor Company" },
    { common: "assets/partners/hwia.png", name: "Hyundai WIA" },
    { en: "assets/partners/snt_en.png",   ko: "assets/partners/snt_ko.png",   name: "SNT Motiv" },
    { en: "assets/partners/mss_en.png",   ko: "assets/partners/mss_ko.png",   name: "Ministry of SMEs and Startups", cls: "lg-tall" },
    { en: "assets/partners/motie_en.png", ko: "assets/partners/motie_ko.png", name: "Ministry of Trade, Industry and Resources", cls: "lg-tall" },
    { common: "assets/partners/kstartup.png", name: "K-Startup" },
    { en: "assets/partners/kiria_en.png", ko: "assets/partners/kiria_ko.png", name: "KIRIA", cls: "lg-kiria" },
    { en: "assets/partners/repa_en.png",  ko: "assets/partners/repa_ko.png",  name: "REPA", cls: "lg-wide" },
    { en: "assets/partners/yu_en.png",    ko: "assets/partners/yu_ko.png",    name: "Yeungnam University" },
  ];
  const makeItem = (entry) => {
    const card = document.createElement("div");
    card.className = "logo-card" + (entry.cls ? " " + entry.cls : "");
    if (entry.common) {
      const img = document.createElement("img");
      img.src = entry.common; img.alt = entry.name; img.loading = "lazy";
      card.appendChild(img);
    } else {
      ["en", "ko"].forEach((lng) => {
        const img = document.createElement("img");
        img.src = entry[lng]; img.alt = entry.name; img.loading = "lazy";
        img.setAttribute("data-lang", lng);
        card.appendChild(img);
      });
    }
    return card;
  };
  const frag = document.createDocumentFragment();
  logos.concat(logos).forEach((l) => frag.appendChild(makeItem(l)));
  track.appendChild(frag);

  /* JS-driven scroll so arrows can nudge it; auto-drifts right→left, seamless loop */
  const marquee = track.closest(".logo-marquee");
  const prevBtn = marquee && marquee.querySelector(".lm-prev");
  const nextBtn = marquee && marquee.querySelector(".lm-next");

  let half = 0;                 // width of one logo set (track holds two)
  let offset = 0;               // current translateX (<= 0)
  let paused = false;
  const SPEED = 0.42;           // px per frame auto-drift
  let nudge = 0;                // remaining px to add from arrow clicks
  let last = performance.now();

  function measure() { half = track.scrollWidth / 2; }
  measure();
  window.addEventListener("resize", () => { measure(); });
  // re-measure once images have loaded (logo widths change layout)
  track.querySelectorAll("img").forEach((im) => {
    if (!im.complete) im.addEventListener("load", measure, { once: true });
  });

  function wrap() {
    if (half <= 0) return;
    if (offset <= -half) offset += half;
    if (offset > 0) offset -= half;
  }

  function frame(now) {
    const dt = Math.min(50, now - last); last = now;
    if (!paused && nudge === 0) offset -= SPEED * (dt / 16.67);
    if (nudge !== 0) {
      const step = nudge * 0.12;          // ease toward target
      offset += step;
      nudge -= step;
      if (Math.abs(nudge) < 0.5) { offset += nudge; nudge = 0; }
    }
    wrap();
    track.style.transform = "translateX(" + offset.toFixed(2) + "px)";
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  marquee.addEventListener("mouseenter", () => { paused = true; });
  marquee.addEventListener("mouseleave", () => { paused = false; });

  const jump = 3 * 226;                    // ~3 logos per click
  if (prevBtn) prevBtn.addEventListener("click", () => { nudge += jump; });
  if (nextBtn) nextBtn.addEventListener("click", () => { nudge -= jump; });
})();

/* -------------------------------------------------------------
   CEO email — assembled in JS so Cloudflare's email-obfuscation
   scanner never sees a literal address (no "[email protected]")
   ------------------------------------------------------------- */
(function ceoEmail() {
  const a = document.getElementById("ceoMail");
  if (!a) return;
  const user = a.dataset.user || "ceo";
  const domain = a.dataset.domain || "hyperdyne.co.kr";
  const addr = user + "@" + domain;
  a.href = "mailto:" + addr;
  const label = a.querySelector(".ceo-mail-text");
  if (label) label.textContent = addr.toUpperCase();
})();

/* -------------------------------------------------------------
   Header scroll shadow
   ------------------------------------------------------------- */
const header = document.getElementById("siteHeader");
function onScroll() {
  if (!header) return;
  if (window.scrollY > 24) header.classList.add("is-scrolled");
  else                     header.classList.remove("is-scrolled");
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* -------------------------------------------------------------
   Mobile nav toggle
   ------------------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const navMenu   = document.querySelector(".primary-nav");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navToggle.classList.toggle("is-open");
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}
