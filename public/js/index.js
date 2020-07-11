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

const setupItemQuantityEventListener = (cart) => {
  document.querySelectorAll('.cart__quantity-drop-down').forEach((el) => {
    // const quantity = el.target.options[el.selectedIndex].text;
    el.addEventListener('change', async (e) => {
      const quantity = e.target.options[el.selectedIndex].text;
      const productId = Object.values(e.target.dataset)[0];
      // send patch request to update backend
      console.log(quantity, productId);
      const res = cart.updateCart(productId, quantity);
      // update frontend with response
      // update cartview
      console.log(res);
    });
  });
};

const controlCart = async () => {
  console.log('start controlCart');

  let storedCart = JSON.parse(localStorage.getItem('cart'));

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
    cartView.fillCart(state.cart);
  }

  // ADD TO CART EVENT LISTENER

  await elements.cartBtn.forEach((button) => {
    button.addEventListener('click', async (e) => {
      await state.cart.addToCart(Object.values(e.target.dataset)[0]);
      await cartView.updateBtnCartItemsCounter();
      console.log('filling cart');
      cartView.fillCart(state.cart);
      // DISABLE THE ADD TO CART BUTTONS FOR PRODUCTS ALREADY IN THE CART
      cartView.disableCartBtn(state.cart);
      storedCart = state.cart.addToStorage(
        state.cart.totalQty,
        state.cart.totalPrice,
        state.cart.products
      );
      cartView.renderCartBtn();
    });
  });

  // RENDER-CART BUTTON EVENT LISTENER
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

  setupItemQuantityEventListener(state.cart);

  // SAVE CART TO LOCAL STORAGE

  console.log('cart controller end');
};

window.addEventListener('DOMContentLoaded', controlCart());

// const controlCart = async (target) => {

//   console.log('cart controller start');
//   if (target !== undefined) {
//     console.log('target is defined');
//     const clickedProductId = Object.values(target.dataset)[0];
//     if (!state.cart) state.cart = new Cart();
//     try {
//       await state.cart.addToCart(clickedProductId);
//     } catch (err) {
//       console.log(err);
//     }
//     const storedCart = state.cart.addToStorage(
//       clickedProductId,
//       state.cart.totalQty,
//       state.cart.totalPrice,
//       state.cart.products
//     );
//     cartView.toggleAddToCartBtn(target, 'in cart');
//     cartView.renderCartBtn();
//     cartView.fillCart(storedCart);
//     setupItemQuantityEventListener(state.cart);

//     cartView.updateBtnCartItemsCounter();
//   }
//   console.log('cart controller end');
// };

// const setupCart = () => {
//   console.log('start setup');
//   const storedCart = JSON.parse(localStorage.getItem('cart'));
//   if (storedCart) {
//     console.log('there is a cart in storage');
//     // DISABLE THE ADD TO CART BUTTONS FOR PRODUCTS ALREADY IN THE CART
//     elements.cartBtn.forEach((button) => {
//       const buttonId = Object.values(button.dataset)[0];

//       if (storedCart.products[buttonId]) {
//         cartView.toggleAddToCartBtn(button, true);
//       }
//     });
//     cartView.fillCart(storedCart);
//     const storedCartInstance = new Cart(
//       storedCart.products,
//       storedCart.totalPrice,
//       storedCart.totalQty
//     );

//     setupItemQuantityEventListener(storedCartInstance);
//     cartView.updateBtnCartItemsCounter();
//     cartView.renderCartBtn();
//   }
//   console.log('end setup');
// };

/*
 ***************************
 * Shopping Cart Event Listeners
 ***************************
 */

// elements.cartBtn.forEach((button) => {
//   button.addEventListener('click', (e) => {
//     controlCart(e.target);
//   });
// });

// RENDER CART

// elements.btnCart.addEventListener('click', () => {
//   cartView.renderCart();
// });

// // CLOSE CART CONTAINER
// elements.cartCloseBtn.addEventListener('click', () => {
//   elements.cartContainer.classList.remove('cart-container--active');
//   elements.linkNav.forEach((link) =>
//     link.setAttribute('style', 'display:  inline-block')
//   );
// });

// GET STORED CART
// setupCart();
