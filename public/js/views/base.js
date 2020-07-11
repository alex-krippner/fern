/* eslint-disable import/prefer-default-export */
/* eslint-disable node/no-unsupported-features/es-syntax */
export const elements = {
  // NAV TRANSITION DOM ELEMENTS

  nav: document.querySelector('.navigation'),
  linkNav: document.querySelectorAll('.navigation__link'),
  sectionLanding: document.querySelector('.section-landing'),
  carouselMain: document.querySelector('.carousel__main'),
  hamburger: document.querySelectorAll('.btn__toggle--bar'),
  navTitle: document.querySelector('.navigation__title'),

  // HAMBURGER DOM ELEMENTS
  toggleButton: document.querySelector('.btn__toggle'),
  hamburgerBar: document.querySelectorAll('.btn__toggle--bar'),
  navBar: document.querySelector('.navigation'),
  navList: document.querySelector('.navigation__list'),
  navLogo: document.querySelector('.navigation__logo-box'),
  navLinks: document.querySelectorAll('.navigation__link'),

  // CART DOM ELEMENTS
  cartBtn: document.querySelectorAll('.cart-btn'),
  cartBtnContainer: document.querySelector('.cart-btn-container'),
  cartItemDOM: document.querySelector('.btn__cart-items'),
  btnCart: document.querySelector('.btn__cart'),
  cartDetailsGrid: document.querySelector('.cart__details-grid'),
  cartCloseBtn: document.querySelector('.cart__header-close'),
  cartContainer: document.querySelector('.cart-container'),
  cartTotalPriceText: document.querySelector('.totalPrice-text'),
  cartTotal: document.querySelector('.cart__total'),
  cartItemQuantity: document.querySelectorAll('.cart__quantity-drop-down'),
};
