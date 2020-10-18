import { elements } from './base.js';

export const renderCartItems = (cartItemData) => {
  const cartItemDetails = document.createElement('div');

  cartItemDetails.classList.add('cart__item-details');
  cartItemDetails.innerHTML = `
  <img class="cart__details-img" src="/img/products/${cartItemData.item.imageCover}">
  <div>
    <h3 class="paragraph-primary">${cartItemData.item.name}</h3>
    <p class="paragraph-primary">€ ${cartItemData.price}</p>
    <button class="paragraph-secondary btn btn__remove-cart-item"  data-product-id=${cartItemData.item._id}>Remove</button>
  </div> 
  <div class="cart__quantity-adjust" data-product-id=${cartItemData.item._id}>
    <label class= "paragraph-secondary">Qty.
      <select class="cart__quantity-drop-down paragraph-secondary"  data-product-id=${cartItemData.item._id} name="${cartItemData.item.name}" id="${cartItemData.item.name}">
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
  document.getElementById(`${cartItemData.item.name}`).value = cartItemData.qty;
  document.getElementById(`${cartItemData.item.name}`).text =
    cartItemData.price;
};

const renderCheckoutItems = (cartItemData) => {
  const cartItemDetails = document.createElement('div');

  cartItemDetails.classList.add('checkout-item');
  cartItemDetails.innerHTML = `
  <div class="checkout-item__remove checkout-item__details" data-product-id=${
    cartItemData.item._id
  }">
    <i class="fas fa-times btn btn__remove-checkout-item" data-product-id=${
      cartItemData.item._id
    }></i>
  </div> 
  <div class="checkout-item__name paragraph-primary">${
    cartItemData.item.name
  }</div>
  <div class="checkout-item__price checkout-item__details checkout-item__details--animate">€ ${
    cartItemData.item.price
  } / ${cartItemData.item.weight}</div>
  <select class="checkout-item__qty checkout-item__quantity-drop-down checkout-item__details checkout-item__details--animate" data-product-id=${
    cartItemData.item._id
  } name="${cartItemData.item.name}" id="${cartItemData.item._id}" value="${
    cartItemData.qty
  }">
    <option value="${cartItemData.qty}">${cartItemData.qty}</option>
    ${Array(10)
      .fill()
      .map((item, i) =>
        i + 1 !== cartItemData.qty
          ? ` <option value="${i + 1}" >${i + 1}</option>`
          : ` <option value="${cartItemData.qty}" >${cartItemData.qty}</option>`
      )
      .join('')}
  </select>
  <div class= "checkout-item__totalPrice checkout-item__details checkout-item__details--animate" >€ ${
    cartItemData.price
  }</div>
  `;
  elements.checkoutItemContainer.appendChild(cartItemDetails);
};

export const renderCartTotalPrice = (cartData) => {
  if (window.location.pathname === '/shop') {
    elements.cartTotal.textContent = `€ ${cartData}`;
  } else if (window.location.pathname === '/checkout') {
    elements.checkoutTotalPrice.textContent = `€ ${cartData}`;
  }
};

export const renderCartEmptyText = () => {
  // SHOP CART
  if (window.location.pathname === '/shop') {
    const cartEmptyText = document.createElement('div');
    cartEmptyText.classList.add('cart-empty');
    cartEmptyText.innerHTML = `
<div class="heading-secondary cart-empty__text">The Cart is Empty</div>
`;
    elements.cartDetailsGrid.appendChild(cartEmptyText);
    // CHECKOUT CART
  } else if (window.location.pathname === '/checkout') {
    const cartEmptyText = document.createElement('div');
    cartEmptyText.classList.add('cart-empty');
    cartEmptyText.innerHTML = `
<div class="heading-secondary cart-empty__text">The Cart is Empty</div>
<a class="btn btn__text--green-basil" href="/shop">Return to Shop</a>
`;
    elements.checkoutItemsContainer.setAttribute('style', 'display: none');
    elements.checkoutContainer.appendChild(cartEmptyText);
  }
};

export const populateCart = (cartData) => {
  const item = Object.entries(cartData.products);
  item.forEach((el) => {
    if (el[1] && window.location.pathname === '/shop') {
      renderCartItems(el[1]);
    } else if (el[1] && window.location.pathname === '/checkout') {
      renderCheckoutItems(el[1]);
    }
  });

  renderCartTotalPrice(cartData.totalPrice.toString(10));
  if (cartData.totalPrice === 0) renderCartEmptyText();
};

export const fillCart = (cart) => {
  if (window.location.pathname === '/shop') {
    // IF CART IS EMPTY POPULATE
    if (!elements.cartDetailsGrid.hasChildNodes()) {
      populateCart(cart);
    } else {
      // IF CART IS POPULATED CLEAR CART AND THEN POPULATE
      elements.cartDetailsGrid.innerHTML = '';
      elements.cartTotal.textContent = '';
      populateCart(cart);
    }
  } else if (window.location.pathname === '/checkout') {
    // IF CART IS EMPTY POPULATE
    if (!elements.checkoutItemContainer.hasChildNodes()) {
      populateCart(cart);
    } else {
      // IF CART IS POPULATED CLEAR CART AND THEN POPULATE
      elements.checkoutItemContainer.innerHTML = '';
      elements.checkoutTotalPrice.textContent = '';
      populateCart(cart);
    }
  }
};

export const renderCartBtn = () => {
  elements.cartBtnContainer.classList.add('cart-btn-container--active');
};

export const renderCart = () => {
  elements.cartContainer.classList.add('cart-container--active');
  elements.linkNav.forEach((link) =>
    link.setAttribute('style', 'display: none')
  );
};

export const closeCart = () => {
  elements.cartContainer.classList.remove('cart-container--active');
  elements.linkNav.forEach((link) =>
    link.setAttribute('style', 'display:  inline-block')
  );
};

export const toggleAddToCartBtn = (target, status) => {
  if (status) {
    target.disabled = true;
    target.textContent = 'In Cart';
  } else if (!status) {
    target.disabled = false;
    target.textContent = 'Add to Cart';
  }
};

export const disableCartBtn = (cart) => {
  elements.cartBtn.forEach((button) => {
    const buttonId = Object.values(button.dataset)[0];
    // Disable the product's 'add to cart' button if the products ID is in local storage
    if (cart.products[buttonId]) {
      toggleAddToCartBtn(button, true);
    } else {
      toggleAddToCartBtn(button, false);
    }
  });
};

export const updateBtnCartItemsCounter = (cart) => {
  // assign text content to the same value as value of totalQty key in local storage
  // get value from local storage
  if (cart) elements.cartItemDOM.textContent = cart.totalQty;
};

/* ****************************** QUANTITY SELECT ITEM FUNCTION ***************************

  // THIS FUNCTION NEEDS TO BE CALLED EVERYTIME THE CART IS NEWLY RENDERED
  // IN ORDER FOR THE EVENT LISTENER TO WORK MORE THAN ONCE WITHOU RELOADING THE PAGE
*/

export const setupQuantitySelectListener = (cart) => {
  document.querySelectorAll('.cart__quantity-drop-down').forEach((el) => {
    el.addEventListener('change', async (e) => {
      const quantity = e.target.options[el.selectedIndex].text;
      const productId = Object.values(e.target.dataset)[0];
      // send patch request to update backend and state.cart
      await cart.updateCart(productId, quantity);
      await fillCart(cart);
      updateBtnCartItemsCounter(cart);
      // Setup listener again after cart has been newly rendered
      // IF SETUP LISTENER FUNCTION IS CALLED OUTSIDE THE EVENT LISTENER AND NOT AFTER NEWLY RENDERED CART THEN THERE WILL BE A INIFITE LOOP

      setupQuantitySelectListener(cart);
      setupRemoveListener(cart);
    });
  });
};

/* ****************************** REMOVE ITEM FUNCTION ***************************
  // THIS FUNCTION NEEDS TO BE CALLED EVERYTIME THE CART IS NEWLY RENDERED
  // IN ORDER FOR THE EVENT LISTENER TO WORK MORE THAN ONCE WITHOU RELOADING THE PAGE
  */

export const setupRemoveListener = (cart) => {
  document.querySelectorAll('.btn__remove-cart-item').forEach((button) => {
    button.addEventListener('click', async (e) => {
      const productId = Object.values(e.target.dataset)[0];
      // send patch request to update backend and state.cart
      await cart.removeItem(productId);
      await fillCart(cart);
      updateBtnCartItemsCounter(cart);
      disableCartBtn(cart);
      // Setup listener again after cart has been newly rendered
      // IF SETUP LISTENER FUNCTION IS CALLED OUTSIDE THE EVENT LISTENER AND NOT AFTER NEWLY RENDERED CART THEN THERE WILL BE A INIFITE LOOP
      setupQuantitySelectListener(cart);
      setupRemoveListener(cart);
    });
  });
};
