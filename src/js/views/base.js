export const elements = {
  track: document.querySelector(".carousel__track"),
  nextBtn: document.querySelector(".carousel__button--right"),
  prevBtn: document.querySelector(".carousel__button--left"),
  dotsNav: document.querySelector(".carousel__nav"),
  nav: document.querySelector(".navigation"),
  linkNav: document.querySelectorAll(".link__navigation"),
  sectionLanding: document.querySelector(".section-landing"),
};

export const slideElements = {
  slides: Array.from(elements.track.children),
  dots: Array.from(elements.dotsNav.children),
};

export const slideWidth = slideElements.slides[0].getBoundingClientRect().width;
