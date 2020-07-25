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
  btnCheckout: document.querySelector('.btn__checkout'),
  btnRemoveItem: document.querySelectorAll('.btn__remove-cart-item'),
  cartDetailsGrid: document.querySelector('.cart__details-grid'),
  cartCloseBtn: document.querySelector('.cart__header-close'),
  cartContainer: document.querySelector('.cart-container'),
  cartTotalPriceText: document.querySelector('.totalPrice-text'),
  cartTotal: document.querySelector('.cart__total'),
  cartItemQuantity: document.querySelectorAll('.cart__quantity-drop-down'),

  // CHECKOUT DOM ELEMENTS
  sectionSummary: document.querySelector('.section-summary'),
  btnAddress: document.getElementById('btn-address'),
  checkoutItem: document.querySelectorAll('.checkout-item'),
  checkoutItemDetailsCompact: document.querySelector(
    '.checkout-item__details--compact'
  ),
  sectionForm: document.querySelector('.section-form'),
  checkoutContainer: document.querySelector('.checkout-container'),
  checkoutItemsContainer: document.querySelector('.items-container'),
  checkoutItemContainer: document.querySelector('.checkout-item-container'),
  checkoutItemDetailsRemove: document.querySelector('.checkout-item__remove'),
  checkoutItemDetailsPrice: document.querySelector('.checkout-item__price'),
  checkoutItemDetailsQty: document.querySelector('.checkout-item__qty'),
  checkoutTotalPrice: document.querySelector('.checkout-total'),
  formAddress: document.querySelector('.form__address'),
  formBilling: document.querySelector('.form__billing'),
  formBillingCheckbox: document.querySelector('.form__billing-checkbox'),
  formChevron: document.querySelector('.form-container__chevron'),
  formChevronRight: document.querySelector('.form-container__chevron-right'),
  formChevronLeft: document.querySelector('.form-container__chevron-left'),
  formContainer: document.querySelector('.form-container'),
  formContainerAddress: document.querySelector('.form-container__address'),
  formContainerBilling: document.querySelector('.form-container__billing'),
  removeCheckoutItem: document.querySelectorAll('.checkout-item__remove'),

  // CONTACT DOM ELEMENTS
  btnMap: document.getElementById('btn-map'),
  contactLandingBg: document.querySelector('.contact-landing-bg-container'),
  modal: document.querySelector('.modal'),
  trigger: document.querySelector('.newsletter-form__button'),
  closeButton: document.querySelector('.close-button'),
  newsletterInput: document.getElementById('newsletter__input'),

  // DINNER DOM ELEMENTS
  btnCalRight: document.querySelector('.btn-calendar-right'),
  btnCalLeft: document.querySelector('.btn-calendar-left'),
  btnReservations: document.querySelector('.btn-reservations'),
  calDates: document.querySelectorAll('.calendar__dates'),
  dateGrid: document.querySelector('.calendar__date-grid'),
  monthIndicator: document.querySelector('.calendar__month-indicator'),
  resBody: document.querySelector('.reservations__body'),
  resCal: document.querySelector('.reservations__calendar'),
  resFormDetails: document.querySelector('.reservations__form-details'),
  resSummary: document.querySelector('.reservations__summary'),
};
