/* eslint-disable no-undef */

import { elements } from './views/base.js';
import * as navbarViews from './views/navbarView.js';
import executeCarousel from './views/carouselView.js';

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
 *************
 * Shopping Cart
 *************
 */
const cartContainer = document.querySelector('.cart-btn-container');

const addToCart = async (productId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8000/shop/add-to-cart/${productId}`,
      withCredentials: true,
    });

    console.log(res);
  } catch (err) {
    console.log('error', err);
  }
};

if (elements.cartBtn) {
  // SHOPPING CART EVENT HANDLERS

  elements.cartBtn.forEach((cartBtn) => {
    cartBtn.addEventListener('click', (e) => {
      const { productId } = e.target.dataset;
      console.log(`cart button of ${productId} clicked`);
      cartContainer.classList.toggle('cart-btn-container--active');
      addToCart(productId);
    });
  });
}
