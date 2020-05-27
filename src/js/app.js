// let sliderImages = document.querySelectorAll(".carousel__slide"),
//   btnCarouselOne = document.querySelector(".btn-carousel--1"),
//   btnCarouselTwo = document.querySelector(".btn-carousel--2");

// import { elements } from "./views/base.js";
// import * as carouselView from "./views/carouselView.js";
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
// const state = {
//   current: 0,
// };

/**
 *
 * Carousel
 *
 */

// button 1 click

// elements.btnCarouselOne.addEventListener("click", function () {
//   if (state.current === 0) {
//     state.current = elements.sliderImages.length;
//   }

//   carouselView.slideLeft(state.current);
//   state.current--;
// });

// // button 2 click

// elements.btnCarouselTwo.addEventListener("click", function () {
//   if (state.current === elements.sliderImages.length - 1) {
//     state.current = -1;
//   }
//   carouselView.slideRight(state.current);
//   state.current++;
// });

// carouselView.startSlide();

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

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".carousel__button--right");
const prevBtn = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arranging slides

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("carousel__current-slide");
  targetSlide.classList.add("carousel__current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("carousel__current-slide");
  targetDot.classList.add("carousel__current-slide");
};

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add("carousel__button--hidden");
    nextBtn.classList.remove("carousel__button--hidden");
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove("carousel__button--hidden");
    nextBtn.classList.add("carousel__button--hidden");
  } else {
    prevBtn.classList.remove("carousel__button--hidden");
    nextBtn.classList.remove("carousel__button--hidden");
  }
};

// move slide  functionality

prevBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".carousel__current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".carousel__current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

nextBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".carousel__current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".carousel__current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked?
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".carousel__current-slide");
  const currentDot = dotsNav.querySelector(".carousel__current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
});
