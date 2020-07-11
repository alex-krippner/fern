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

navbarViews.cartBtnContainerObserver.observe(elements.sectionLanding);

navbarViews.cartContainerObserver.observe(elements.sectionLanding);

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

const controlCart = async (target) => {
  const storedCart = JSON.parse(localStorage.getItem('cart'));

  if (target !== undefined) {
    const clickedProductId = Object.values(target.dataset)[0];
    if (!state.cart) state.cart = new Cart();
    try {
      await state.cart.addToCart(clickedProductId);
    } catch (err) {
      console.log(err);
    }
    const localCart = state.cart.addToStorage(
      clickedProductId,
      state.cart.totalQty,
      state.cart.totalPrice,
      state.cart.products
    );
    cartView.toggleAddToCartBtn(target, 'in cart');
    await cartView.fillCart(localCart);
    console.log('after fill');
    cartView.setupEventListener();

    cartView.updateBtnCartItemsCounter();
    cartView.renderCartBtn();
  } else if (storedCart) {
    cartView.updateBtnCartItemsCounter();
    cartView.renderCartBtn();

    // DISABLE THE ADD TO CART BUTTONS FOR PRODUCTS ALREADY IN THE CART
    elements.cartBtn.forEach((button) => {
      const buttonId = Object.values(button.dataset)[0];

      if (storedCart.products[buttonId]) {
        cartView.toggleAddToCartBtn(button, true);
      }
    });
    cartView.fillCart(storedCart);
  }
};

/*
 ***************************
 * Shopping Cart Event Handlers
 ***************************
 */

elements.cartBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    controlCart(e.target);
  });
});

window.addEventListener('load', () => {
  controlCart();
});

// RENDER CART

elements.btnCart.addEventListener('click', () => {
  cartView.renderCart();
});

// CLOSE CART CONTAINER
elements.cartCloseBtn.addEventListener('click', () => {
  elements.cartContainer.classList.remove('cart-container--active');
  elements.linkNav.forEach((link) =>
    link.setAttribute('style', 'display:  inline-block')
  );
});

// ADJUST QUANTITY

(function setupEventListener() {
  document.querySelectorAll('.cart__quantity-drop-down').forEach((el) => {
    el.addEventListener('change', () => {
      console.log(el.value);
      // send patch request to update backend
      console.log(state.cart);
      // update frontend with response
      // update cartview
    });
  });
})();

// setTimeout(
//   () =>
//     document.querySelectorAll('.cart__quantity-drop-down').forEach((el) => {
//       el.addEventListener('change', () => {
//         console.log(el.value);
//         // send patch request to update backend
//         console.log(state.cart);
//         // update frontend with response
//         // update cartview
//       });
//     }),
//   100
// );
