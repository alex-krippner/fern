// let sliderImages = document.querySelectorAll(".carousel__slide"),
//   btnCarouselOne = document.querySelector(".btn-carousel--1"),
//   btnCarouselTwo = document.querySelector(".btn-carousel--2");

import { elements } from "./views/base.js";
import * as carouselView from "./views/carouselView.js";
export /** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {
  current: 0,
};

console.log(state.current);

/**
 *
 * Carousel
 *
 */

// button 1 click

elements.btnCarouselOne.addEventListener("click", function () {
  console.log(state.current);
  if (state.current === 0) {
    state.current = elements.sliderImages.length;
  }
  console.log(state.current);

  carouselView.slideLeft(state.current);
});

// button 2 click

elements.btnCarouselTwo.addEventListener("click", function () {
  if (current === elements.sliderImages.length - 1) {
    current = -1;
  }
  carouselView.slideRight();
});

carouselView.startSlide();
