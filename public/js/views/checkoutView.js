import { elements } from './base.js';

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
