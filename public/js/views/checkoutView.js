import { elements } from './base.js';

const addClass = (elementClass, ...checkoutElements) => {
  checkoutElements.forEach((el) => {
    el.classList.add(elementClass);
  });
};

// export const compactOrderSummary = () => {
//   elements.btnAddress.addEventListener('click', () => {
//     // loop checkout-item class list
//     elements.checkoutItem.forEach((el) => {
//       // reduce item-details grid to two columns
//       el.classList.toggle('checkout-item--compact');
//       // loop checkout item children
//       el.childNodes.forEach((child) => {
//         // if child contains price, qty, or remove toggle checkout-item__details--compact
//         if (
//           child.className.split(' ').includes('checkout-item__price') ||
//           child.className.split(' ').includes('checkout-item__remove') ||
//           child.className.split(' ').includes('checkout-item__qty')
//         )
//           child.classList.toggle('checkout-item__details--compact');
//       });
//     });

//     // minimize section summary
//     elements.sectionSummary.classList.toggle('section-summary--compact');

//     // move checkout-totalPrice
//     elements.checkoutTotalPrice.classList.toggle('checkout-total--compact');

//     // maximize form
//     elements.formBilling.classList.toggle('form__billing--maximize');
//   });
// };

export const compactOrderSummary = () => {
  elements.btnAddress.addEventListener('click', () => {
    // // loop checkout-item class list
    elements.checkoutItem.forEach((el) => {
      // reduce item-details grid to two columns

      setTimeout(() => {
        el.classList.toggle('checkout-item--animate');
      }, 1000);
      // loop checkout item children
      el.childNodes.forEach((child) => {
        // if child contains price, qty, or remove toggle checkout-item__details--compact
        if (
          child.className.split(' ').includes('checkout-item__price') ||
          child.className.split(' ').includes('checkout-item__remove') ||
          child.className.split(' ').includes('checkout-item__qty')
        ) {
          child.classList.toggle('checkout-item__details--animate-fadeOut');

          setTimeout(() => {
            child.classList.toggle('checkout-item__details--animate-minimize');
          }, 1000);
        }
      });
    });

    // minimize section summary
    setTimeout(() => {
      elements.sectionSummary.classList.toggle('section-summary--compact');
    }, 500);

    // // move checkout-totalPrice
    // elements.checkoutTotalPrice.classList.toggle('checkout-total--compact');

    // // maximize form
    // elements.formBilling.classList.toggle('form__billing--maximize');
  });
};

export const fuckeslint = () => {};
