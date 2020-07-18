import { elements } from './base.js';
import * as cartView from './cartView.js';

export const slideAddress = () => {
  elements.btnAddress.addEventListener('click', () => {
    let textContent = elements.btnAddress.textContent;
    textContent === 'Billing Address'
      ? (textContent = 'Delivery Address')
      : (textContent = 'Billing Address');

    elements.btnAddress.textContent = textContent;
    elements.formContainerAddress.classList.toggle(
      'form-container__address--slide'
    );
    elements.formContainerBilling.classList.toggle(
      'form-container__billing--slide'
    );
  });
};

export const setupRemoveListener = (cart) => {
  elements.removeCheckoutItem.forEach((button) => {
    button.addEventListener('click', async (e) => {
      const productId = Object.values(e.target.dataset)[0];
      await cart.removeItem(productId);
      await cartView.fillCart(cart);
    });
  });
  // loop button class
  // add eventlistener
  // get productId from target
  // api call to remove item in backend
  // update view
  // setup listener again??
};
