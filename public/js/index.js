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
 *************
 * Shopping Cart
 *************
 */
const cartBtnContainer = document.querySelector('.cart-btn-container');
const cartItemDOM = document.querySelector('.btn__cart-items');
const btnCart = document.querySelector('.btn__cart');

const addToCart = async (productId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8000/shop/add-to-cart/${productId}`,
      withCredentials: true,
    });

    const { data } = res.data;
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

const renderCart = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8000/shop/shopping-cart`,
      withCredentials: true,
    });
    const { data } = res;
    console.log(data);
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

if (elements.cartBtn) {
  // SHOPPING CART EVENT HANDLERS

  elements.cartBtn.forEach((cartBtn) => {
    cartBtn.addEventListener('click', (e) => {
      const { productId } = e.target.dataset;
      console.log(e.currentTarget.parentNode);
      addToCart(productId).then((data) => {
        cartItemDOM.innerHTML = data.totalQty;
      });

      cartBtnContainer.classList.add('cart-btn-container--active');
    });
  });
}

btnCart.addEventListener('click', () => {
  renderCart();
});

// when clicking add to cart
// add item details to cart
// get item details from this card items in pug or through session?
// getting item data from rendered items
// img data from img html src
// product name data from
// get item data from session
// refactor cartSessionModel to include product image, name, price
