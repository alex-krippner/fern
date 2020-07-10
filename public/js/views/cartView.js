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
    <label> Item Qty.
      <select class="cart__quantit-drop-down" name="${cartItem.itemname}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      <option value="10">10</option>
     </select>
    </label>
  </div>
  `;

  elements.cartDetailsGrid.appendChild(cartItemDetails);
};

export const renderCartTotalPrice = (cartData) => {
  elements.cartTotal.textContent = `€ ${cartData}`;
};

export const populateCart = (cartData) => {
  cartData.products.forEach((product) => {
    renderCartItems(product);
  });
  renderCartTotalPrice(cartData.totalPrice.toString(10));
};

export const fillCart = async () => {
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
      // elements.cartContainer.classList.add('cart-container--active');
    });
  } catch (err) {
    console.log(err);
  }
};

export const renderCartBtn = () => {
  elements.cartBtnContainer.classList.add('cart-btn-container--active');
};

export const renderCart = () => {
  fillCart();
  elements.cartContainer.classList.add('cart-container--active');
};

export const toggleAddToCartBtn = (target, status) => {
  if (status) {
    target.disabled = true;
    target.textContent = 'In Cart';
  }
};
