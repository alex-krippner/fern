import { elements, slideElements } from "./views/base.js";
import * as carouselView from "./views/carouselView.js";

/**
 *********************
 * NAV TRANSITION
 *********************
 */

// const nav = document.querySelector(".navigation");
// const linkNav = document.querySelectorAll(".link__navigation");
// const sectionLanding = document.querySelector(".section-landing");

// const sectionLandingOptions = {
//   rootMargin: "-200px 0px 0px 0px",
// };

// const sectionLandingObserver = new IntersectionObserver(function (
//   entries,
//   sectionLandingObserver
// ) {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) {
//       nav.classList.add("navigation__scrolled");
//       linkNav.forEach((link) =>
//         link.classList.add("link__navigation--scrolled")
//       );
//     } else {
//       nav.classList.remove("navigation__scrolled");
//       linkNav.forEach((link) =>
//         link.classList.remove("link__navigation--scrolled")
//       );
//     }
//   });
// },
// sectionLandingOptions);

// sectionLandingObserver.observe(sectionLanding);

// const track = document.querySelector(".carousel__track");
// const slides = Array.from(track.children);
// const nextBtn = document.querySelector(".carousel__button--right");
// const prevBtn = document.querySelector(".carousel__button--left");
// const dotsNav = document.querySelector(".carousel__nav");
// const dots = Array.from(dotsNav.children);

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
