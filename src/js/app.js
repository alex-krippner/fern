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

const nav = document.querySelector(".navigation");
const linkNav = document.querySelectorAll(".link__navigation");
const sectionLanding = document.querySelector(".section-landing");

const sectionLandingOptions = {
  rootMargin: "-200px 0px 0px 0px",
};

const sectionLandingObserver = new IntersectionObserver(function (
  entries,
  sectionLandingObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add("navigation__scrolled");
      linkNav.forEach((link) =>
        link.classList.add("link__navigation--scrolled")
      );
    } else {
      nav.classList.remove("navigation__scrolled");
      linkNav.forEach((link) =>
        link.classList.remove("link__navigation--scrolled")
      );
    }
  });
},
sectionLandingOptions);

sectionLandingObserver.observe(sectionLanding);
