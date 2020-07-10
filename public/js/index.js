/* eslint-disable no-undef */

import { elements } from './views/base.js';
import * as navbarViews from './views/navbarView.js';
import * as cartView from './views/cartView.js';
import executeCarousel from './views/carouselView.js';

import * as cartModel from './models/Cart.js';

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
  console.log('found carousel');
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
  if (storedCart) {
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

  const clickedProductId = Object.values(target.dataset)[0];
  if (!state.cart) state.cart = new cartModel.Cart();
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
  console.log(localCart);
  cartView.toggleAddToCartBtn(target, 'in cart');
  cartView.fillCart(localCart);
  cartView.updateBtnCartItemsCounter();
  cartView.renderCartBtn();
};

elements.cartBtn.forEach((button) => {
  button.addEventListener('click', (e) => {
    controlCart(e.target);
  });
});

window.addEventListener('load', () => {
  controlCart();
});

/*
***************************
SHOPPING CART EVENT HANDLERS
***************************
*/

// ADD PRODUCT TO CART

// if (elements.cartBtn) {
//   const activeCart = localStorage.getItem('cart-btn-container');
//   const storedCartTotalQty = localStorage.getItem('cartTotalQty');

//   // IF ACTIVE CART PERSIST btn__cart
//   if (activeCart) {
//     elements.cartItemDOM.innerHTML = storedCartTotalQty.toString();
//     elements.cartBtnContainer.setAttribute('class', activeCart);
//   }

// ADD TO CART CLICK LISTENER
//   elements.cartBtn.forEach((cartBtn) => {
//     cartBtn.addEventListener('click', (e) => {
//       const { productId } = e.target.dataset;
//       cartModel.addToCart(productId).then((data) => {
//         const cartTotalQty = data.totalQty;

//         // UPDATE BUTTON CART ITEM COUNTER
//         elements.cartItemDOM.innerHTML = data.totalQty;

//         localStorage.setItem('cartTotalQty', cartTotalQty);
//       });

//       if (!activeCart) {
//         cartBtnContainer.classList.add('cart-btn-container--active');
//         localStorage.setItem(
//           'cart-btn-container',
//           'cart-btn-container cart-btn-container--active'
//         );
//       }

//       e.target.textContent = 'In Cart';
//     });
//   });
// }

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

// UPDATE CART

elements.cartDetailsGrid.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn__chevron-up')) {
    const { productId } = event.target.parentNode.dataset;
    cartModel.updateCart(productId, 'incr').then((data) => {
      cartView.renderCart();

      // update btn__cart counter
      localStorage.setItem('cartTotalQty', data.cartTotalQty);
      const storedCartTotalQty = localStorage.getItem('cartTotalQty');
      elements.cartItemDOM.innerHTML = storedCartTotalQty.toString();
    });
  } else if (event.target.classList.contains('btn__chevron-down')) {
    const { productId } = event.target.parentNode.dataset;
    cartModel.updateCart(productId, 'decr').then((data) => {
      cartView.renderCart().then(() => {});
      // update btn__cart counter
      // TODO: refactor into own function
      localStorage.setItem('cartTotalQty', data.cartTotalQty);
      const storedCartTotalQty = localStorage.getItem('cartTotalQty');
      elements.cartItemDOM.innerHTML = storedCartTotalQty.toString();
    });
  }
});

// listen for event 'change'
// get new quantity from DOM
// in index.js call updateCart function with the parameters productId and quantity
// in Cart.js write function to send patch request with productId and quantity
// in the backend shopController write a function updateQuantity that creates a new cart instance
// in the backend cartSessionModel write a class method that updates the quantity
// in the backend shopController sends back the new cart
// in the frontedn index.js update cartView using the sent data
