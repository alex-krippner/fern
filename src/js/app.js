import { elements, slideElements } from "./views/base.js";
import * as carouselView from "./views/carouselView.js";
import * as navbarViews from "./views/navbarView.js";

/**
 *********************
 * NAV TRANSITION
 *********************
 */

if (document.documentElement.clientWidth >= 600) {
  navbarViews.sectionLandingObserver.observe(elements.sectionLanding);
}

navbarViews.hamburgerObserver.observe(elements.sectionLanding);

/*
 *************
 * CAROUSEL
 *************
 */

// ARRANGING SLIDES

slideElements.slides.forEach(carouselView.setSlidePosition);

// MOVE CAROUSEL SLIDE FUNCTIONALITY

elements.prevBtn.addEventListener("click", () => {
  carouselView.prevBtnClicked();
});

elements.nextBtn.addEventListener("click", () => {
  carouselView.nextBtnClicked();
});

elements.dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked?
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = elements.track.querySelector(".carousel__current-slide");
  const currentDot = elements.dotsNav.querySelector(".carousel__current-btn");
  const targetIndex = slideElements.dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slideElements.slides[targetIndex];

  carouselView.moveToSlide(elements.track, currentSlide, targetSlide);
  carouselView.updateDots(currentDot, targetDot);
  carouselView.hideShowArrows(
    slideElements.slides,
    elements.prevBtn,
    elements.nextBtn,
    targetIndex
  );
});

const toggleButton = document.querySelector(".btn__toggle");
const hamburgerBar = document.querySelectorAll(".btn__toggle--bar");
const navBar = document.querySelector(".navigation");
const navList = document.querySelector(".navigation__list");
const navLogo = document.querySelector(".navigation__logo-box");
const navLinks = document.querySelectorAll(".navigation__link");

toggleButton.addEventListener("click", () => {
  navBar.classList.toggle("navigation--active");
  navList.classList.toggle("navigation__list--active");
  navLogo.classList.toggle("navigation__logo-box--active");

  navLinks.forEach((link) => {
    link.classList.toggle("navigation__link--active");
  });

  hamburgerBar.forEach((bar) => {
    bar.classList.toggle("btn__toggle--bar-active");
  });
});
