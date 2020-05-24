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
  elements.sliderImages[0].style.display = "block";
};

// Show prev
export const slideLeft = (current) => {
  console.log(current);
  resetCarousel();
  elements.sliderImages[current - 1].style.display = "block";
};

// Show next

export const slideRight = (current) => {
  resetCarousel();
  elements.sliderImages[current + 1].style.display = "block";
};
