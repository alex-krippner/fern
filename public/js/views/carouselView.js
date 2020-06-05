import { elements, slideElements, slideWidth } from "./base.js";

export const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

// how is the index assinged to the parameter index
// elements.slides.forEach(setSlidePosition);

// ARRANGING SLIDES

export const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("carousel__current-slide");
  targetSlide.classList.add("carousel__current-slide");
};

export const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("carousel__current-btn");
  targetDot.classList.add("carousel__current-btn");
};

export const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
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

// MOVE SLIDE FUNCTIONALITY

export const prevBtnClicked = () => {
  const currentSlide = elements.track.querySelector(".carousel__current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = elements.dotsNav.querySelector(".carousel__current-btn");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slideElements.slides.findIndex(
    (slide) => slide === prevSlide
  );

  moveToSlide(elements.track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(
    slideElements.slides,
    elements.prevBtn,
    elements.nextBtn,
    prevIndex
  );
};

export const nextBtnClicked = () => {
  const currentSlide = elements.track.querySelector(".carousel__current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = elements.dotsNav.querySelector(".carousel__current-btn");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slideElements.slides.findIndex(
    (slide) => slide === nextSlide
  );

  moveToSlide(elements.track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(
    slideElements.slides,
    elements.prevBtn,
    elements.nextBtn,
    nextIndex
  );
};
