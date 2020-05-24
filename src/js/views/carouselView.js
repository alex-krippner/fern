import { elements } from "./base.js";

// Clear all images
export const resetCarousel = () => {
  for (let i = 0; i < elements.sliderImages.length; i++) {
    elements.sliderImages[i].style.display = "none";
  }
};

// Init carousel
export const startSlide = () => {
  resetCarousel();
  elements.sliderImages[0].style.cssText =
    "display: block; background-size: cover";
};

// Show prev
export const slideLeft = (current) => {
  resetCarousel();
  elements.sliderImages[current - 1].style.cssText =
    "display: block; background-size: cover";
};

// Show next

export const slideRight = (current) => {
  resetCarousel();
  elements.sliderImages[current + 1].style.cssText =
    "display: block; background-size: cover";
};
