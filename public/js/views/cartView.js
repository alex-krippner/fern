import { elements } from './base.js';

export const renderCartItems = (cartItemData) => {
  console.log(cartItemData);
  const cartItemDetails = document.createElement('div');

  cartItemDetails.classList.add('cart__item-details');
  cartItemDetails.innerHTML = `
  <img class="cart__details-img" src="/img/products/${cartItemData.item.imageCover}">
  <div>
    <h3 class="paragraph-primary">${cartItemData.item.name}</h3>
    <p class="paragraph-primary">€ ${cartItemData.price}</p>
    <p class="paragraph-secondary btn btn__remove-cart-item">Remove</p>
  </div> 
  <div class="cart__quantity-adjust" data-product-id=${cartItemData.item._id}>
    <label class= "paragraph-secondary">Qty.
      <select class="cart__quantity-drop-down"  data-product-id=${cartItemData.item._id} name="${cartItemData.item.name}" id="${cartItemData.item.name}">
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

export const renderCartTotalPrice = (cartData) => {
  elements.cartTotal.textContent = `€ ${cartData}`;
};

export const populateCart = (cartData) => {
  const item = Object.entries(cartData.products);
  item.forEach((el) => {
    if (el[1]) {
      renderCartItems(el[1]);
    }
  });

  renderCartTotalPrice(cartData.totalPrice.toString(10));
  console.log('finished rendering cart');
};

export const fillCart = (cart) => {
  // IF CART IS EMPTY POPULATE
  if (
    !elements.cartDetailsGrid.hasChildNodes() ||
    !elements.cartTotalPriceText.hasChildNodes()
  ) {
    populateCart(cart);
  } else {
    // IF CART IS POPULATED CLEAR CART AND THEN POPULATE
    elements.cartDetailsGrid.innerHTML = '';
    elements.cartTotal.textContent = '';
    populateCart(cart);
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

export const toggleAddToCartBtn = (target, status) => {
  if (status) {
    target.disabled = true;
    target.textContent = 'In Cart';
  }
};

export const disableCartBtn = (cart) => {
  elements.cartBtn.forEach((button) => {
    const buttonId = Object.values(button.dataset)[0];
    // Disable the product's 'add to cart' button if the products ID is in local storage
    if (cart.products[buttonId]) {
      toggleAddToCartBtn(button, true);
    }
  });
};

export const updateBtnCartItemsCounter = () => {
  // assign text content to the same value as value of totalQty key in local storage
  // get value from local storage
  if (JSON.parse(localStorage.getItem('cart')))
    elements.cartItemDOM.textContent = JSON.parse(
      localStorage.getItem('cart')
    ).totalQty;
};

export const updateCartView = (res) => {
  console.log(res);
};
