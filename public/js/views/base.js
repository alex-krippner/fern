/* eslint-disable node/no-unsupported-features/es-syntax */
export const elements = {
  track: document.querySelector('.carousel__track'),
  nextBtn: document.querySelector('.carousel__button--right'),
  prevBtn: document.querySelector('.carousel__button--left'),
  dotsNav: document.querySelector('.carousel__nav'),
  nav: document.querySelector('.navigation'),
  linkNav: document.querySelectorAll('.navigation__link'),
  sectionLanding: document.querySelector('.section-landing'),
  hamburger: document.querySelectorAll('.btn__toggle--bar'),
  navTitle: document.querySelector('.navigation__title'),
};

export const slideElements = {
  slides: Array.from(elements.track.children),
  dots: Array.from(elements.dotsNav.children),
};

export const slideWidth = document.documentElement.clientWidth;
