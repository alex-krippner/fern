/* eslint-disable no-undef */

import { elements } from './views/base.js';
import * as navbarViews from './views/navbarView.js';
import * as cartView from './views/cartView.js';
import executeCarousel from './views/carouselView.js';

import Cart from './models/Cart.js';

// import { doc } from 'prettier';

const state = {};

/**
 *********************
 * NAV TRANSITIONS
 *********************
 */

if (document.documentElement.clientWidth > 600) {
  navbarViews.sectionLandingObserver.observe(elements.sectionLanding);
}
navbarViews.hamburgerObserver.observe(elements.sectionLanding);

if (window.location.pathname === '/shop') {
  navbarViews.cartBtnContainerObserver.observe(elements.sectionLanding);

  navbarViews.cartContainerObserver.observe(elements.sectionLanding);
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
  document.querySelector('.btn__checkout').addEventListener('click', () => {
    console.log('checkout clicked');
  });

  // redirect to order summary
  // render order summary
  // listen for 'continue to payment' button
  // render payment page
};

if (window.location.pathname === '/shop')
  window.addEventListener('DOMContentLoaded', controlCart());
