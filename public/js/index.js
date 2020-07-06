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
const cartDetailsGrid = document.querySelector('.cart__details-grid');
const cartCloseBtn = document.querySelector('.cart__header-close');
const cartContainer = document.querySelector('.cart-container');
const cartTotalPriceText = document.querySelector('.totalPrice-text');

/*
***************************
SHOPPING CART MODEL
***************************
*/

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

const getCart = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8000/shop/shopping-cart`,
      withCredentials: true,
    });
    const { data } = res.data;
    // console.log(data);
    // console.log(data.products[0].item.name);
    return data;
  } catch (err) {
    console.log('error', err);
  }
};

/*
***************************
SHOPPING CART VIEWS
***************************
*/

const renderCartItems = (cartItem) => {
  const cartItemDetails = document.createElement('div');

  cartItemDetails.classList.add('cart__item-details');

  cartItemDetails.innerHTML = `
<img class="cart__details-img" src="/img/products/${cartItem.item.imageCover}">
<div>
  <h3 class="paragraph-primary">${cartItem.item.name}</h3>
  <p class="paragraph-primary">€ ${cartItem.price}</p>
  <p class="paragraph-secondary btn btn__remove-cart-item">Remove</p>
</div> 
<div class="cart__quantity-adjust">
  <i class="fas fa-sort-up btn btn__chevron" aria-hidden="true"></i>
  <p class="paragraph-primary">${cartItem.qty}</p>
  <i class="fas fa-sort-down btn btn__chevron" aria-hidden="true"></i>
</div>
`;

  cartDetailsGrid.appendChild(cartItemDetails);
};

const renderCartTotalPrice = (cartData) => {
  const cartTotalPrice = document.createElement('span');
  cartTotalPrice.classList.add('paragraph-primary', 'cart__total');

  cartTotalPrice.innerHTML = ` € ${cartData}`;
  cartTotalPriceText.appendChild(cartTotalPrice);
};

const populateCart = (cartData) => {
  const cartTotalPrice = cartData.totalPrice.toString(10);
  cartData.products.forEach((product) => {
    renderCartItems(product);
  });
  renderCartTotalPrice(cartTotalPrice);
};

/*
***************************
SHOPPING CART HANDLERS
***************************
*/

// ADD PRODUCT TO CART

if (elements.cartBtn) {
  elements.cartBtn.forEach((cartBtn) => {
    cartBtn.addEventListener('click', (e) => {
      const { productId } = e.target.dataset;
      console.log(e.currentTarget.parentNode);
      addToCart(productId).then((data) => {
        cartItemDOM.innerHTML = data.totalQty;
      });

      cartBtnContainer.classList.add('cart-btn-container--active');
      // localStorage.setItem('cart-btn-container', 'cart-btn-container--active');
      // let activeCart = localStorage.getItem('cart-btn-container');
      // console.log(activeCart);
    });
  });
}

// RENDER CART

btnCart.addEventListener('click', () => {
  getCart().then((cartData) => {
    console.log(cartData.totalPrice);
    // IF CART IS EMPTY POPULATE
    if (
      !cartDetailsGrid.hasChildNodes() ||
      !cartTotalPriceText.hasChildNodes()
    ) {
      populateCart(cartData);
    } else {
      // IF CART IS POPULATE CLEAR CART AND THEN POPULATE
      cartDetailsGrid.innerHTML = '';
      cartTotalPriceText.innerHTML = '';
      populateCart(cartData);
    }

    cartContainer.classList.add('cart-container--active');
  });
});

cartCloseBtn.addEventListener('click', () => {
  cartContainer.classList.remove('cart-container--active');
});

// when clicking add to cart
// get cart details object with properties 1) array of product objects 2) the total price

// insert data into html

// render cart on the client side
