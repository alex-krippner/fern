// let sliderImages = document.querySelectorAll(".carousel__slide"),
//   btnCarouselOne = document.querySelector(".btn-carousel--1"),
//   btnCarouselTwo = document.querySelector(".btn-carousel--2");

import { elements } from "./views/base.js";
import * as carouselView from "./views/carouselView.js";
/** Global state of the app
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
  if (state.current === 0) {
    state.current = elements.sliderImages.length;
  }

  carouselView.slideLeft(state.current);
  state.current--;
});

// button 2 click

elements.btnCarouselTwo.addEventListener("click", function () {
  if (state.current === elements.sliderImages.length - 1) {
    state.current = -1;
  }
  carouselView.slideRight(state.current);
  state.current++;
});

carouselView.startSlide();
