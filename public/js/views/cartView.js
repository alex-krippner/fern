import { elements } from './base.js';
import * as cartModel from '../models/Cart.js';

export const renderCartItems = (cartItem) => {
  const cartItemDetails = document.createElement('div');
  cartItemDetails.classList.add('cart__item-details');

  cartItemDetails.innerHTML = `
  <img class="cart__details-img" src="/img/products/${cartItem.item.imageCover}">
  <div>
    <h3 class="paragraph-primary">${cartItem.item.name}</h3>
    <p class="paragraph-primary">€ ${cartItem.price}</p>
    <p class="paragraph-secondary btn btn__remove-cart-item">Remove</p>
  </div> 
  <div class="cart__quantity-adjust" data-product-id=${cartItem.item._id}>
    <i class="fas fa-sort-up btn btn__chevron btn__chevron-up" aria-hidden="true"></i>
    <p class="paragraph-primary cart__item-quantity">${cartItem.qty}</p>
    <i class="fas fa-sort-down btn btn__chevron btn__chevron-down" aria-hidden="true"></i>
  </div>
  `;

  elements.cartDetailsGrid.appendChild(cartItemDetails);
};

export const renderCartTotalPrice = (cartData) => {
  elements.cartTotal.textContent = `€ ${cartData}`;
};

export const populateCart = (cartData) => {
  const cartTotalPrice = cartData.totalPrice.toString(10);
  cartData.products.forEach((product) => {
    renderCartItems(product);
  });
  renderCartTotalPrice(cartTotalPrice);
};

export const renderCart = async () => {
  try {
    cartModel.getCart().then((cartData) => {
      // IF CART IS EMPTY POPULATE
      if (
        !elements.cartDetailsGrid.hasChildNodes() ||
        !elements.cartTotalPriceText.hasChildNodes()
      ) {
        populateCart(cartData);
      } else {
        // IF CART IS POPULATED CLEAR CART AND THEN POPULATE
        elements.cartDetailsGrid.innerHTML = '';
        elements.cartTotal.textContent = '';
        populateCart(cartData);
      }

      // RENDER CART CONTAINER
      elements.cartContainer.classList.add('cart-container--active');
    });
  } catch (err) {
    console.log(err);
  }
};
