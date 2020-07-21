/* eslint-disable no-undef */

import { elements } from './views/base.js';
import * as navbarViews from './views/navbarView.js';
import * as cartView from './views/cartView.js';
import * as checkoutView from './views/checkoutView.js';
import executeCarousel from './views/carouselView.js';

import Cart from './models/Cart.js';
import Checkout from './models/Checkout.js';

// import { doc } from 'prettier';

const state = {};

/**
 *********************
 * NAV TRANSITIONS
 *********************
 */

if (window.location.pathname !== '/checkout') {
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
 *************
 * CAROUSEL
 *************
 */

if (elements.carouselMain) {
  executeCarousel();
}

/*
 *************
 * HAMBURGER
 *************
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
 ***************************
 * Shopping Cart
 ***************************
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

      await cartView.fillCart(state.cart);
      // DISABLE THE ADD TO CART BUTTONS FOR PRODUCTS ALREADY IN THE CART
      cartView.disableCartBtn(state.cart);

      cartView.updateBtnCartItemsCounter(state.cart);
      cartView.renderCartBtn();
      cartView.setupQuantitySelectListener(state.cart);
      cartView.setupRemoveListener(state.cart);
    });
  });

  // OPEN CART CONTAINER EVENT LISTENER
  elements.btnCart.addEventListener('click', () => {
    cartView.renderCart();
  });

  // CLOSE CART CONTAINER EVENT LISTENER

  elements.cartCloseBtn.addEventListener('click', () => {
    cartView.closeCart();
  });

  // 'CHECKOUT' BUTTON EVENT LISTENER

  // listen for checkout button
  elements.btnCheckout.addEventListener('click', () => {
    state.cart.checkout();
  });
};

// CART CONTROLLER TRIGGER

if (window.location.pathname === '/shop')
  window.addEventListener('DOMContentLoaded', controlCart());

/*
 ***************************
 * Checkout
 ***************************
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
  // setup listeners
  checkoutView.setupCheckoutRemoveListener(state.cart);
  checkoutView.setupCheckoutQuantitySelectListener(state.cart);
  checkoutView.slideAddress();

  elements.btnAddress.addEventListener('click', async (e) => {
    e.target.textContent = 'Processing...';
    state.checkout.makePayment(stripe);
    state.checkout.deleteCartSession();
  });
};

if (window.location.pathname === '/checkout') {
  window.addEventListener('loaded ', controlCheckout());
}

// MAPBOX

if (window.location.pathname === '/contact') {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxleGFuZGVya3JpcHBuZXIiLCJhIjoiY2tidnhzdXJnMDJ1bzJwbGp4b2JwdHh2cCJ9.FyIFeUXJ2Bm3Fe4nztnCcw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [10.4515, 51.1657], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  elements.btnMap.addEventListener('click', () => {
    elements.contactLandingBg.classList.add(
      'contact-landing-bg-container--hidden'
    );
  });
}
