import { elements } from './base.js';

/*
******************************
NAVBAR TRANSFORMATION
******************************
*/

export const sectionLandingOptions = {
  rootMargin: '-100px 0px 0px 0px',
};
export const sectionLandingObserver = new IntersectionObserver(function (
  entries
  // sectionLandingObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      elements.nav.classList.add('navigation__scrolled');
      elements.linkNav.forEach((link) =>
        link.classList.add('navigation__link--scrolled')
      );
      elements.navTitle.classList.add('navigation__title--scrolled');
    } else {
      elements.nav.classList.remove('navigation__scrolled');
      elements.linkNav.forEach((link) =>
        link.classList.remove('navigation__link--scrolled')
      );
      elements.navTitle.classList.remove('navigation__title--scrolled');
    }
  });
}, sectionLandingOptions);

export const hamburgerObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      elements.hamburger.forEach((bar) => {
        bar.classList.add('btn__toggle--bar-scrolled');
      });
    } else {
      elements.hamburger.forEach((bar) => {
        bar.classList.remove('btn__toggle--bar-scrolled');
      });
    }
  });
});

export const cartBtnContainerObserver = new IntersectionObserver(function (
  entries
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      elements.cartBtnContainer.classList.add('cart-btn-container--scrolled');
    } else {
      elements.cartBtnContainer.classList.remove(
        'cart-btn-container--scrolled'
      );
    }
  });
},
sectionLandingObserver);

export const cartContainerObserver = new IntersectionObserver(function (
  entries
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      elements.cartContainer.classList.remove('cart-container--active');
      elements.linkNav.forEach((link) =>
        link.setAttribute('style', 'display:  inline-block')
      );
    }
  });
},
sectionLandingObserver);
