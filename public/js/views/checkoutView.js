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
      const productId = Object.values(e.target.dataset)[0];
      await cart.removeItem(productId);
      cartView.fillCart(cart);

      // Setup listener again after cart has been newly rendered
      // IF SETUP LISTENER FUNCTION IS CALLED OUTSIDE THE EVENT LISTENER AND NOT AFTER NEWLY RENDERED CART THEN THERE WILL BE A INIFITE LOOP

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

export const checkAllInputs = () => {
  const checkedAllInputs = [...elements.formInputs].filter((input) => {
    return input.validity.patternMismatch;
  });
  if (!checkedAllInputs.length) return true;
};

export const checkDeliveryInputs = () => {
  const checkedDeliveryInputs = [...elements.formInputDelivery].filter(
    (input) => {
      return !input.validity.valid;
    }
  );

  if (!checkedDeliveryInputs.length) return true;
};

export const checkBillingInputs = () => {
  const checkedBillingInputs = [...elements.formInputBilling].filter(
    (input) => {
      return !input.validity.valid;
    }
  );

  if (!checkedBillingInputs.length) return true;
};

export const validationListener = () => {
  const formInputs = document.querySelectorAll('input');

  // Create custom validation methods
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.setCustomValidity('');
      input.checkValidity();
    });
  });
  formInputs.forEach((input) => {
    input.addEventListener('invalid', () => {
      if (!formInputs[0].value.match(/^(\w\w+)\s(\w+)$/)) {
        input.setCustomValidity('Please enter first and last name');
      } else {
        input.setCustomValidity('This field is required');
      }
    });
  });

  // When page loads remove required attribute from Billing Address form when checkbox is checked
  elements.formInputBilling.forEach((billingInput) => {
    billingInput.removeAttribute('required');
  });

  // Event Listener for checkbox
  // When checkbox is ticked the Billing inputs are not required
  elements.formBillingCheckbox.addEventListener('change', function () {
    if (this.checked) {
      elements.formInputBilling.forEach((billingInput) => {
        billingInput.removeAttribute('required');
      });
    } else if (!this.checked) {
      elements.formInputBilling.forEach((billingInput) => {
        billingInput.required = true;
      });
    }
  });

  elements.formInputDelivery.forEach((input) => {
    input.addEventListener('change', () => {
      if (checkDeliveryInputs()) {
        elements.formHeadPara.classList.remove(
          'form__header-paragraph--reveal'
        );
      }
    });
  });
};
