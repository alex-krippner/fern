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
  let storedCart = JSON.parse(localStorage.getItem('cart'));

  /* ****************************** QUANTITY SELECT ITEM FUNCTION ***************************

  // THIS FUNCTION NEEDS TO BE CALLED EVERYTIME THE CART IS NEWLY RENDERED
  // IN ORDER FOR THE EVENT LISTENER TO WORK MORE THAN ONCE WITHOU RELOADING THE PAGE
*/

  const setupQuantitySelectListener = () => {
    document.querySelectorAll('.cart__quantity-drop-down').forEach((el) => {
      el.addEventListener('change', async (e) => {
        const quantity = e.target.options[el.selectedIndex].text;
        const productId = Object.values(e.target.dataset)[0];
        // send patch request to update backend and state.cart
        await state.cart.updateCart(productId, quantity);
        // Add updated cart to storage
        await state.cart.addToStorage(
          state.cart.totalQty,
          state.cart.totalPrice,
          state.cart.products
        );
        await cartView.fillCart(state.cart);
        cartView.updateBtnCartItemsCounter();
        // Setup listener again after cart has been newly rendered
        // IF SETUP LISTENER FUNCTION IS CALLED OUTSIDE THE EVENT LISTENER AND NOT AFTER NEWLY RENDERED CART THEN THERE WILL BE A INIFITE LOOP

        setupQuantitySelectListener();
        setupRemoveListener();
      });
    });
  };
  /* ****************************** REMOVE ITEM FUNCTION ***************************
  // THIS FUNCTION NEEDS TO BE CALLED EVERYTIME THE CART IS NEWLY RENDERED
  // IN ORDER FOR THE EVENT LISTENER TO WORK MORE THAN ONCE WITHOU RELOADING THE PAGE
  */
  const setupRemoveListener = () => {
    document.querySelectorAll('.btn__remove-cart-item').forEach((button) => {
      button.addEventListener('click', async (e) => {
        const productId = Object.values(e.target.dataset)[0];
        console.log(productId);
        // send patch request to update backend and state.cart
        await state.cart.removeItem(productId);
        // Add updated cart to storage
        await state.cart.addToStorage(
          state.cart.totalQty,
          state.cart.totalPrice,
          state.cart.products
        );
        await cartView.fillCart(state.cart);
        cartView.updateBtnCartItemsCounter();
        cartView.disableCartBtn(state.cart);
        // Setup listener again after cart has been newly rendered
        // IF SETUP LISTENER FUNCTION IS CALLED OUTSIDE THE EVENT LISTENER AND NOT AFTER NEWLY RENDERED CART THEN THERE WILL BE A INIFITE LOOP
        setupRemoveListener();
      });
    });
  };

  if (storedCart) {
    state.cart = new Cart(
      storedCart.totalQty,
      storedCart.totalPrice,
      storedCart.products
    );
  } else {
    state.cart = new Cart();
  }

  if (storedCart && storedCart.totalQty) {
    cartView.renderCartBtn();
    cartView.disableCartBtn(state.cart);
    cartView.updateBtnCartItemsCounter();
    await cartView.fillCart(state.cart);
    setupQuantitySelectListener();
    setupRemoveListener();
  }

  // 'ADD TO CART' BUTTON EVENT LISTENER

  elements.cartBtn.forEach((button) => {
    button.addEventListener('click', async (e) => {
      await state.cart.addToCart(Object.values(e.target.dataset)[0]);

      await cartView.fillCart(state.cart);
      // DISABLE THE ADD TO CART BUTTONS FOR PRODUCTS ALREADY IN THE CART
      cartView.disableCartBtn(state.cart);
      storedCart = state.cart.addToStorage(
        state.cart.totalQty,
        state.cart.totalPrice,
        state.cart.products
      );
      cartView.updateBtnCartItemsCounter();
      cartView.renderCartBtn();
      setupQuantitySelectListener();
      setupRemoveListener();
    });
  });

  // 'REMOVE' CART ITEM EVENT LISTENER

  // listen for click event

  // use class method to remove cart item from session and the current state's cart
  // remove cart from local storage
  // fill the cart with the updated current state

  // OPEN CART CONTAINER EVENT LISTENER
  elements.btnCart.addEventListener('click', () => {
    cartView.renderCart();
  });

  // CLOSE CART CONTAINER EVENT LISTENER

  elements.cartCloseBtn.addEventListener('click', () => {
    cartView.closeCart();
  });
};

if (window.location.pathname === '/shop')
  window.addEventListener('DOMContentLoaded', controlCart());
