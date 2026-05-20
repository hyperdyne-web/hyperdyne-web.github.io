const productImages = [
  "assets/bldc-motor.jpeg",
  "assets/hollow-bldc-motor.jpeg",
  "assets/long-rotor.jpg",
  "assets/wolfrom-reducer.png",
  "assets/motor-winding.png"
];

const imageElements = Array.from(document.querySelectorAll(".hero-product-image"));
const pendingLinks = document.querySelectorAll("[data-pending]");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

let currentImageIndex = 0;
let visibleLayer = 0;
let isTransitioning = false;

productImages.forEach((src) => {
  const image = new Image();
  image.src = src;
});

function showPendingMessage(event) {
  event.preventDefault();
  alert("페이지 준비 중입니다.");

  if (mainNav.classList.contains("is-open")) {
    closeMobileNav();
  }
}

function closeMobileNav() {
  navToggle.classList.remove("is-open");
  mainNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function toggleMobileNav() {
  const isOpen = navToggle.classList.toggle("is-open");
  mainNav.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

async function prepareImage(element, src) {
  element.src = src;

  if (element.decode) {
    await element.decode().catch(() => {});
  }
}

async function rotateHeroImage() {
  if (isTransitioning || imageElements.length < 2) {
    return;
  }

  isTransitioning = true;
  currentImageIndex = (currentImageIndex + 1) % productImages.length;
  visibleLayer = visibleLayer === 0 ? 1 : 0;

  const activeImage = imageElements[visibleLayer];
  const inactiveImage = imageElements[visibleLayer === 0 ? 1 : 0];

  await prepareImage(activeImage, productImages[currentImageIndex]);

  window.requestAnimationFrame(() => {
    activeImage.classList.add("is-active");
    inactiveImage.classList.remove("is-active");
    isTransitioning = false;
  });
}

pendingLinks.forEach((item) => {
  item.addEventListener("click", showPendingMessage);
});

navToggle.addEventListener("click", toggleMobileNav);

// Two image layers cross-fade while the next product image loads into the hidden layer.
window.setInterval(rotateHeroImage, 4600);
