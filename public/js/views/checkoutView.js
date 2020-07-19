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

export const setupCheckoutRemoveListener = (cart) => {
  document.querySelectorAll('.checkout-item__remove').forEach((button) => {
    button.addEventListener('click', async (e) => {
      console.log('click');
      const productId = Object.values(e.target.dataset)[0];
      await cart.removeItem(productId);
      cartView.fillCart(cart);
      setupCheckoutRemoveListener(cart);
    });
  });
  // loop button class
  // add eventlistener
  // get productId from target
  // api call to remove item in backend
  // update view
  // setup listener again??
};
