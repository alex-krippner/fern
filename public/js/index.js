/* eslint-disable no-undef */

import { elements } from './views/base.js';
import * as navbarViews from './views/navbarView.js';
import * as cartView from './views/cartView.js';
import * as checkoutView from './views/checkoutView.js';
import * as contactView from './views/contactView.js';
import * as reservationsView from './views/reservationsView.js';
import executeCarousel from './views/carouselView.js';

import Cart from './models/Cart.js';
import Checkout from './models/Checkout.js';

// import { doc } from 'prettier';

const state = {};

const paramAllowList = [
  '/home',
  '/dinner',
  '/wanderlust',
  '/about',
  '/shop',
  '/contact',
];

const allowedPath = paramAllowList.find(
  (path) => window.location.pathname === path
);

/**
 *********************************************************************************
 * NAV TRANSITIONS
 *********************************************************************************
 */

// if (
//   window.location.pathname !== '/checkout' ||
//   window.location.pathname !== '/payment-confirmation/success'
// )
if (allowedPath) {
  if (document.documentElement.clientWidth > 600) {
    navbarViews.sectionLandingObserver.observe(elements.sectionLanding);
  }
  navbarViews.hamburgerObserver.observe(elements.sectionLanding);

  if (window.location.pathname === '/shop') {
    navbarViews.cartBtnContainerObserver.observe(elements.sectionLanding);

    navbarViews.cartContainerObserver.observe(elements.sectionLanding);
  }
}

/*
 *********************************************************************************
 * CAROUSEL
 *********************************************************************************
 */

if (window.location.pathname.includes('/' || '/dinner' || '/wanderlust')) {
  executeCarousel();
}

/*
 *********************************************************************************
 * HAMBURGER
 *********************************************************************************
 */

if (window.location.pathname !== '/checkout') {
  elements.toggleButton.addEventListener('click', () => {
    elements.navBar.classList.toggle('navigation--active');
    elements.navList.classList.toggle('navigation__list--active');
    elements.navLogo.classList.toggle('navigation__logo-box--active');

    elements.navLinks.forEach((link) => {
      link.classList.toggle('navigation__link--active');
    });

    elements.hamburgerBar.forEach((bar) => {
      bar.classList.toggle('btn__toggle--bar-active');
    });
  });
}
/*
 *********************************************************************************
 * Shopping Cart
 *********************************************************************************
 */

// SHOPPING CART CONTROLLER

const controlCart = async () => {
  state.cart = new Cart();
  const sessionCart = await state.cart.getCart();
  if (sessionCart) {
    state.cart = new Cart(
      sessionCart.totalQty,
      sessionCart.totalPrice,
      sessionCart.products
    );
  }

  if (state.cart && state.cart.totalQty) {
    cartView.renderCartBtn();
    cartView.disableCartBtn(state.cart);
    cartView.updateBtnCartItemsCounter(state.cart);
    await cartView.fillCart(state.cart);
    cartView.setupQuantitySelectListener(state.cart);
    cartView.setupRemoveListener(state.cart);
  }

  // 'ADD TO CART' BUTTON EVENT LISTENER

  elements.cartBtn.forEach((button) => {
    button.addEventListener('click', async (e) => {
      await state.cart.addToCart(Object.values(e.target.dataset)[0]);

      cartView.fillCart(state.cart);
      // DISABLE THE ADD TO CART BUTTONS FOR PRODUCTS ALREADY IN THE CART
      cartView.disableCartBtn(state.cart);

      cartView.updateBtnCartItemsCounter(state.cart);
      cartView.renderCartBtn();
      cartView.setupQuantitySelectListener(state.cart);
      cartView.setupRemoveListener(state.cart);
    });
  });

  // OPEN CART CONTAINER EVENT LISTENER
  elements.btnCart.addEventListener('click', cartView.renderCart);

  // CLOSE CART CONTAINER EVENT LISTENER

  elements.cartCloseBtn.addEventListener('click', cartView.closeCart);

  // 'CHECKOUT' BUTTON EVENT LISTENER

  // listen for checkout button
  elements.btnCheckout.addEventListener('click', state.cart.checkout);
};

// CART CONTROLLER TRIGGER

if (window.location.pathname === '/shop')
  window.addEventListener('DOMContentLoaded', controlCart());

/*
 *********************************************************************************
 * Checkout
 *********************************************************************************
 */

// CHECKOUT CONTROLLER

const controlCheckout = async () => {
  const stripe = Stripe(
    'pk_test_51H74ejCIYBumLJhusAkwZ5S1IHhm5UP13kqt5onNeOpzLPfQSspqXT3bppBF3HgPOiAXS8DTrFz92YFtlYSi52mf00mGO0JEMC'
  );

  state.cart = new Cart();
  const sessionCart = await state.cart.getCart();
  if (sessionCart) {
    state.cart = new Cart(
      sessionCart.totalQty,
      sessionCart.totalPrice,
      sessionCart.products
    );
  }

  state.checkout = new Checkout();

  if (state.cart.totalPrice === 0) cartView.renderCartEmptyText();

  // Setup listeners
  checkoutView.setupCheckoutRemoveListener(state.cart);
  checkoutView.setupCheckoutQuantitySelectListener(state.cart);
  checkoutView.validationListener();
  checkoutView.slideAddress();

  // Event listener for payment button
  elements.btnAddress.addEventListener('click', async (e) => {
    if (
      (elements.formBillingCheckbox.checked &&
        checkoutView.checkDeliveryInputs()) ||
      (!elements.formBillingCheckbox.checked &&
        checkoutView.checkBillingInputs() &&
        checkoutView.checkDeliveryInputs())
    ) {
      e.preventDefault();
      e.target.textContent = 'Processing...';
      state.checkout.makePayment(stripe);
    }

    // When checkbox is not checked,  billing address is not fillled out and user tries to submit slide to the billing address
    // Without the conditional below, a bug occurs where the billing address container only slide half-way to alert the empty inputs
    else if (
      !elements.formBillingCheckbox.checked &&
      checkoutView.checkDeliveryInputs() &&
      !checkoutView.checkBillingInputs()
    ) {
      elements.formContainerAddress.classList.add(
        'form-container__address--slide'
      );
      elements.formContainerBilling.classList.add(
        'form-container__billing--slide'
      );
    }
    // When checkbox is not checked, delivery address has not been filled out, and currently on billing address slide
    // Switch to delivery address slide and prompt user for input
    else if (
      !elements.formBillingCheckbox.checked &&
      !checkoutView.checkDeliveryInputs() &&
      elements.formContainerBilling.classList.contains(
        'form-container__billing--slide'
      )
    ) {
      // Slide to delivery address
      elements.formContainerAddress.classList.remove(
        'form-container__address--slide'
      );
      elements.formContainerBilling.classList.remove(
        'form-container__billing--slide'
      );

      // Display 'prompt message'
      elements.formHeadPara.classList.add('form__header-paragraph--reveal');
    }
  });
};

if (window.location.pathname === '/checkout') {
  window.addEventListener('loaded ', controlCheckout());
}

/*
 *********************************************************************************
 * Reservations
 *********************************************************************************
 */

const controlReservations = () => {
  // RENDER CALENDAR
  reservationsView.renderCalendar();

  // CALENDAR EVENT HANDLERS
  elements.btnCalLeft.addEventListener('click', reservationsView.previous);

  elements.btnCalRight.addEventListener('click', reservationsView.next);

  // Book Table button

  reservationsView.bookTableListener();
  reservationsView.validationListener();
};

if (window.location.pathname === '/dinner') {
  window.addEventListener('loaded ', controlReservations());
}

/*
 *********************************************************************************
 * CONTACT
 *********************************************************************************
 */

const controlContact = () => {
  /*****************  MAP ***************** */
  // SETUP MAP
  contactView.setupMap();

  // MAP EVENT HANDLER
  elements.btnMap.addEventListener('click', () => {
    // Change navbar styles
    elements.contactLandingBg.classList.add(
      'contact-landing-bg-container--hidden'
    );
    elements.nav.classList.add('navigation__scrolled');
    elements.linkNav.forEach((link) =>
      link.classList.add('navigation__link--scrolled')
    );
    elements.navTitle.classList.add('navigation__title--scrolled');

    // Turn off observer to stop navbar transition
    navbarViews.sectionLandingObserver.disconnect();
  });

  /*****************  NEWSLETTER  ***************** */

  // SETUP NEWSLETTER VALIDATOR
  contactView.newsletterValidator();

  // EVENT HANDLERS
  elements.trigger.addEventListener('click', contactView.toggleModal);
  elements.closeButton.addEventListener('click', contactView.toggleModal);
  window.addEventListener('click', contactView.windowOnClick);
};

if (window.location.pathname === '/contact') {
  window.addEventListener('loaded ', controlContact());
}
