import { elements } from './base.js';
import * as cartView from './cartView.js';

export const slideAddress = () => {
  elements.formBillingCheckbox.addEventListener('change', () => {
    if (!elements.formBillingCheckbox.checked) {
      elements.formContainerAddress.classList.toggle(
        'form-container__address--slide'
      );
      elements.formContainerBilling.classList.toggle(
        'form-container__billing--slide'
      );
      elements.formChevronRight.classList.remove(
        'form-container__chevron-right--hidden'
      );
    } else {
      elements.formChevronRight.classList.add(
        'form-container__chevron-right--hidden'
      );

      elements.formChevronLeft.classList.add(
        'form-container__chevron-left--hidden'
      );
    }
  });

  elements.formChevronLeft.addEventListener('click', () => {
    elements.formContainerAddress.classList.toggle(
      'form-container__address--slide'
    );
    elements.formContainerBilling.classList.toggle(
      'form-container__billing--slide'
    );
  });

  elements.formChevronRight.addEventListener('click', () => {
    elements.formChevronLeft.classList.remove(
      'form-container__chevron-left--hidden'
    );

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
      setupCheckoutQuantitySelectListener(cart);
    });
  });
};

export const setupCheckoutQuantitySelectListener = (cart) => {
  document
    .querySelectorAll('.checkout-item__quantity-drop-down')
    .forEach((el) => {
      el.addEventListener('change', async (e) => {
        const quantity = e.target.options[el.selectedIndex].text;
        const productId = Object.values(e.target.dataset)[0];
        // send patch request to update backend and state.cart
        await cart.updateCart(productId, quantity);
        await cartView.fillCart(cart);
        // Setup listener again after cart has been newly rendered
        // IF SETUP LISTENER FUNCTION IS CALLED OUTSIDE THE EVENT LISTENER AND NOT AFTER NEWLY RENDERED CART THEN THERE WILL BE A INIFITE LOOP

        setupCheckoutQuantitySelectListener(cart);
        setupCheckoutRemoveListener(cart);
      });
    });
};
