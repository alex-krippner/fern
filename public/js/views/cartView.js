import { elements } from './base.js';

export const renderCartItems = (cartItem) => {
  const cartItemDetails = document.createElement('div');
  cartItemDetails.classList.add('cart__item-details');

  cartItemDetails.innerHTML = `
  <img class="cart__details-img" src="/img/products/${cartItem.imageCover}">
  <div>
    <h3 class="paragraph-primary">${cartItem.name}</h3>
    <p class="paragraph-primary">€ ${cartItem.price}</p>
    <p class="paragraph-secondary btn btn__remove-cart-item">Remove</p>
  </div> 
  <div class="cart__quantity-adjust" data-product-id=${cartItem._id}>
    <label class= "paragraph-secondary">Qty.
      <select class="cart__quantity-drop-down"  data-product-id=${cartItem._id} name="${cartItem.name}">
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
  const item = Object.values(cartData.products);
  item.forEach((el) => {
    if (el.item) {
      renderCartItems(el.item);
    }
  });
  // for (let [key, value] of Object.entries(cartData.products)) {
  //   console.log(key, value);
  // }
  // console.log(cartData.products);
  // for (let product in cartData.products) {
  //   console.log(cartData.products[product].item);
  // }
  renderCartTotalPrice(cartData.totalPrice.toString(10));
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

export const updateBtnCartItemsCounter = () => {
  // assign text content to the same value as value of totalQty key in local storage
  // get value from local storage
  const totalQty = JSON.parse(localStorage.getItem('cart')).totalQty;
  elements.cartItemDOM.textContent = totalQty;
};

export const setupItemQuantityEventListener = (cart) => {
  console.log(cart);
  document.querySelectorAll('.cart__quantity-drop-down').forEach((el) => {
    // const quantity = el.target.options[el.selectedIndex].text;
    el.addEventListener('change', async (e) => {
      const quantity = e.target.options[el.selectedIndex].text;
      const productId = Object.values(e.target.dataset)[0];
      console.log(productId, quantity);
      // send patch request to update backend
      const res = await cart.updateCart(productId, quantity);
      // update frontend with response
      // update cartview

      return res;
    });
  });
};

export const updateCartView = (res) => {
  console.log(res);
};

export const setupCart = () => {
  const storedCart = JSON.parse(localStorage.getItem('cart'));

  if (storedCart) {
    updateBtnCartItemsCounter();
    renderCartBtn();
    console.log('cart rendered');
    // DISABLE THE ADD TO CART BUTTONS FOR PRODUCTS ALREADY IN THE CART
    elements.cartBtn.forEach((button) => {
      const buttonId = Object.values(button.dataset)[0];

      if (storedCart.products[buttonId]) {
        toggleAddToCartBtn(button, true);
      }
    });
    fillCart(storedCart);
    console.log('cart filled');
    setupItemQuantityEventListener(storedCart);
    // .then((res) => {
    //   updateCartView(res);
    // });
  }
};
