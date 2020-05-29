import { elements, slideElements } from "./views/base.js";
import * as carouselView from "./views/carouselView.js";
import * as navbarViews from "./views/navbarView.js";

/**
 *********************
 * NAV TRANSITION
 *********************
 */

navbarViews.sectionLandingObserver.observe(elements.sectionLanding);

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
