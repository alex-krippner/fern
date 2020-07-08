/* eslint-disable no-undef */

import { elements } from './views/base.js';
import * as navbarViews from './views/navbarView.js';
import * as cartViews from './views/cartView.js';
import executeCarousel from './views/carouselView.js';

import * as cartModel from './models/Cart.js';

// import { doc } from 'prettier';

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

/*
***************************
SHOPPING CART EVENT HANDLERS
***************************
*/

// ADD PRODUCT TO CART

if (elements.cartBtn) {
  const activeCart = localStorage.getItem('cart-btn-container');
  const storedCartTotalQty = localStorage.getItem('cartTotalQty');

  // IF ACTIVE CART PERSIST btn__cart
  if (activeCart) {
    elements.cartItemDOM.innerHTML = storedCartTotalQty.toString();
    elements.cartBtnContainer.setAttribute('class', activeCart);
  }

  // ADD TO CART CLICK LISTENER
  elements.cartBtn.forEach((cartBtn) => {
    cartBtn.addEventListener('click', (e) => {
      const { productId } = e.target.dataset;
      cartModel.addToCart(productId).then((data) => {
        const cartTotalQty = data.totalQty;

        // UPDATE BUTTON CART ITEM COUNTER
        elements.cartItemDOM.innerHTML = data.totalQty;

        localStorage.setItem('cartTotalQty', cartTotalQty);
      });

      if (!activeCart) {
        cartBtnContainer.classList.add('cart-btn-container--active');
        localStorage.setItem(
          'cart-btn-container',
          'cart-btn-container cart-btn-container--active'
        );
      }
    });
  });
}

// RENDER CART

elements.btnCart.addEventListener('click', () => {
  cartViews.renderCart();
});

// CLOSE CART CONTAINER
elements.cartCloseBtn.addEventListener('click', () => {
  elements.cartContainer.classList.remove('cart-container--active');
});

// UPDATE CART

elements.cartDetailsGrid.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn__chevron-up')) {
    const { productId } = event.target.parentNode.dataset;
    cartModel.updateCart(productId, 'incr').then((data) => {
      cartViews.renderCart();

      // update btn__cart counter
      localStorage.setItem('cartTotalQty', data.cartTotalQty);
      const storedCartTotalQty = localStorage.getItem('cartTotalQty');
      elements.cartItemDOM.innerHTML = storedCartTotalQty.toString();
    });
  } else if (event.target.classList.contains('btn__chevron-down')) {
    const { productId } = event.target.parentNode.dataset;
    cartModel.updateCart(productId, 'decr').then((data) => {
      cartViews.renderCart();

      // update btn__cart counter
      // TODO: refactor into own function
      localStorage.setItem('cartTotalQty', data.cartTotalQty);
      const storedCartTotalQty = localStorage.getItem('cartTotalQty');
      elements.cartItemDOM.innerHTML = storedCartTotalQty.toString();
    });
  }
});
